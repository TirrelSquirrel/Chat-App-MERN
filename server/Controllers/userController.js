const express = require("express");
const expressAsyncHandler = require("express-async-handler");
const userModel = require("../Models/userModel");
const generateToken = require("../Config/generateToken");

const loginController = expressAsyncHandler(async (req, res) => {
  const { name, password } = req.body;

  const user = await userModel.findOne({name});

  // TODO:Pendiente porque el matchPassword no esta definido aun

  if(user&&(await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
  })} else {
    throw new Error('Credenciales inválidas')
  }
});

const registerController = expressAsyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  // comprobando que se envien todos los datos
  if (!name || !email || !password) {
    res.sendStatus(400);
    throw Error("No se han rellenado todos los datos");
  }

  //! el usuario ya existe: email
  const userExists = await userModel.findOne({ email });
  if (userExists) {
    throw new Error("El email ya está registrado");
  }

  //! el usuario ya existe: nombre
  const userNameExists = await userModel.findOne({ name });
  if (userNameExists) {
    throw new Error("El usuario ya existe");
  }

  // Crea una entrada en la DB para el usuario
  const user = await userModel.create({ name, email, password });

  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    res.sendStatus(400);
    throw new Error("Registro fallido");
  }
});

module.exports = { loginController, registerController };

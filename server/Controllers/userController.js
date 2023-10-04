const express = require("express");
const expressAsyncHandler = require('express-async-handler');
const userModel = require("../Models/userModel");

const loginController = () => {};

const registerController = expressAsyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  // comprobando que se envien todos los datos
  if (!name || !email || !password) {
    res.send(400);
    throw Error("No se han rellenado todos los datos");
  }

  // el usuario ya existe: email
  const userExists = await userModel.findOne({ email });
  if (userExists) {
    throw new Error("El email ya está registrado");
  }

  // el usuario ya existe: nombre
  const userNameExists = await userModel.findOne({ name });
  if (userNameExists) {
    throw new Error("El usuario ya existe");
  }

  // Crea una entrada en la DB para el usuario
  const user = await userModel.create({ name, email, password });
})

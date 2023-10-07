const jwt = require("jsonwebtoken");
const user = require("../Models/userModel");
const expressAsyncHandler = require("express-async-handler");

const protect = expressAsyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await user.findById(decoded.id).select("-password");
      next();
    } catch (error) {
      res.sendStatus(401);
      throw new Error("No autorizado, fallo de token");
    }
  }

  if(!token) {
    res.sendStatus(401);
    throw new Error("no autorizado, no existe token")
  }
});

module.exports = { protect };

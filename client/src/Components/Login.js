import React from "react";
import logo from "../Images/chaticon-512.png";
import { TextField, Button } from "@mui/material";

function Login() {
  return (
    <div className="login-container">
      <div className="image-container">
        <img src={logo} alt="Live Chat Logo" className="welcome-logo" />
      </div>
      <div className="login-box">
        <p className="login-text">Inicio de sesión</p>
        <TextField id="outlined-basic" label="Usuario" variant="outlined" />
        <TextField
          id="outlined-password-input"
          label="Contraseña"
          type="password"
          autoComplete="current-password"
          variant="outlined"
        />
        <Button variant="outlined">Iniciar sesión</Button>
      </div>
    </div>
  );
}

export default Login;

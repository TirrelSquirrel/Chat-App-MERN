import React from "react";
import logo from "../Images/chaticon-512.png";
import { TextField } from "@mui/material";

function Login() {
  return (
    <div className="login-container">
      <div className="image-container">
        <img src={logo} alt="Live Chat Logo" className="welcome-logo" />
      </div>
      <div className="login-box">
        <p>Inicia sesión</p>
        <TextField id="standard-basic" label="Standard" variant="standard" />
      </div>
    </div>
  );
}

export default Login;

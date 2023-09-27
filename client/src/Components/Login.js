import React from "react";
import logo from "../Images/chaticon-512.png";
import { TextField, Button } from "@mui/material";
import { useSelector } from "react-redux";

function Login() {
  const lighttheme = useSelector((state) => state.themeKey);
  const changeTheme = lighttheme ? "" : " dark";
  const changeThemeDarker = lighttheme ? "" : " darker";
  return (
    <div className={"login-container" + changeThemeDarker}>
      <div className="image-container">
        <img src={logo} alt="Live Chat Logo" className="welcome-logo" />
      </div>
      <div className={"login-box" + changeTheme}>
        <p className={"login-text" + changeTheme}>Inicio de sesión</p>
        <TextField id="outlined-basic" label="Usuario" variant="outlined"  className={changeTheme}/>
        <TextField
          id="outlined-password-input"
          label="Contraseña"
          type="password"
          autoComplete="current-password"
          variant="outlined"
          className={changeTheme}
        />
        <Button variant="outlined" className={changeTheme}>Iniciar sesión</Button>
      </div>
    </div>
  );
}

export default Login;

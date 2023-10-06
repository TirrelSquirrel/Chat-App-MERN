import React, { useState } from "react";
import logo from "../Images/chaticon-512.png";
import { TextField, Button, Backdrop, CircularProgress } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Toaster from "./Toaster";

function Login() {
  const [showLogin, setShowLogin] = useState(true);
  const [data, setData] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const [loginStatus, setLogInStatus] = useState("");
  const [signInStatus, setSignInStatus] = useState("");

  const navigate = useNavigate();

  const changeHandler = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const loginHandler = async (e) => {
    setLoading(true);
    console.log(data);
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const response = await axios.post(
        "http://localhost:5000/user/login",
        data,
        config
      );
      console.log("login : ", response);
      setLogInStatus({ msg: "Succes", key: Math.random() });
      setLoading(false);
      localStorage.setItem("userData", JSON.stringify(response));
      navigate("/app/welcome");
    } catch (error) {
      setLogInStatus({
        msg: "Credenciales inválidas",
        key: Math.random(),
      });
      setLoading(false);
    }
  };

  const signUpHandler = async () => {
    setLoading(true);
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const response = await axios.post(
        "http://localhost:5000/user/register",
        data,
        config
      );
      console.log(response);
      setLogInStatus({ msg: "Succes", key: Math.random() });
      setLoading(false);
      localStorage.setItem("userData", JSON.stringify(response));
      navigate("/app/welcome");
    } catch (error) {
      console.log(error);
      if (error.response.status === 405) {
        setSignInStatus({
          msg: "Ya existe un usuario con este correo",
        });
      }
      if (error.response.status === 406) {
        setLogInStatus({
          msg: "Ya existe un usuario con ese nombre",
          key: Math.random(),
        });
      }
      setLoading(false);
    }
  };

  return (
    <>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="secondary" />
      </Backdrop>
      <div className="login-container">
        <div className="image-container">
          <img src={logo} alt="Live Chat Logo" className="welcome-logo" />
        </div>
        {showLogin && (
          <div className="login-box">
            <p className="login-text">Inicio de sesión</p>
            <TextField
              onChange={changeHandler}
              id="outlined-basic"
              label="Usuario"
              variant="outlined"
              color="secondary"
              name="name"
              onKeyDown={(event) => {
                if (event.code === "Enter") {
                  // console.log(event);
                  loginHandler();
                }
              }}
            />
            <TextField
              onChange={changeHandler}
              id="outlined-password-input"
              label="Contraseña"
              type="password"
              autoComplete="current-password"
              variant="outlined"
              color="secondary"
              name="password"
              onKeyDown={(event) => {
                if (event.code === "Enter") {
                  // console.log(event);
                  loginHandler();
                }
              }}
            />
            <Button variant="outlined" onClick={loginHandler}>
              Iniciar sesión
            </Button>
            <p>¿No tienes una cuenta?</p>
            <Button variant="outlined" onClick={() => setShowLogin(false)}>
              Registrate
            </Button>
            {loginStatus ? (
              <Toaster key={loginStatus.key} message={loginStatus.msg} />
            ) : null}
          </div>
        )}
        {!showLogin && (
          <div className="login-box">
            <p className="login-text">Crea tu cuenta</p>
            <TextField
              onChange={changeHandler}
              id="outlined-basic"
              label="Usuario"
              variant="outlined"
              color="secondary"
              name="name"
              onKeyDown={(event) => {
                if (event.code === "Enter") {
                  signUpHandler();
                }
              }}
            />
            <TextField
              onChange={changeHandler}
              id="outlined-basic"
              label="Email"
              variant="outlined"
              color="secondary"
              name="email"
              onKeyDown={(event) => {
                if (event.code === "Enter") {
                  signUpHandler();
                }
              }}
            />
            <TextField
              onChange={changeHandler}
              id="outlined-password-input"
              label="Contraseña"
              type="password"
              autoComplete="current-password"
              variant="outlined"
              color="secondary"
              name="password"
              onKeyDown={(event) => {
                if (event.code === "Enter") {
                  signUpHandler();
                }
              }}
            />
            <Button variant="outlined" onClick={signUpHandler}>
              Registro
            </Button>
            <p>¿Ya tienes una cuenta?</p>
            <Button variant="outlined" onClick={() => setShowLogin(true)}>
              Inicia sesión
            </Button>
            {signInStatus ? (
              <Toaster key={signInStatus.key} message={signInStatus.message} />
            ) : null}
          </div>
        )}
      </div>
    </>
  );
}

export default Login;

import React from "react";
import logo from "../Images/chaticon-512.png";

function Welcome() {
  return (
    <div className="welcome-container">
      <img src={logo} alt="Live Chat Logo" className="welcome-logo" />
      <p>Envía y recibe mensajes de manera instantánea</p>
    </div>
  );
}

export default Welcome;

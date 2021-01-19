import React from 'react'

// import logo
import logo from "../../dtLogo.png";

function LoginLoader() {
  return (
    <div style={{
      position:"absolute",
      top:"50%",
      left:"50%",
      transform: "translate(-50%, -50%)"
    }}>
      <div style={{ textAlign: "center" }}>
        <img src={logo} />
        <h1>Redirecting to the application. Please wait...</h1>
      </div>
    </div>
  )
}

export default LoginLoader

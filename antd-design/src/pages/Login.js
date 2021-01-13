import React from "react";
import { auth, provider } from "../firebase";

// import components
import { Button } from "antd";

function Login() {

  const login = () => {
    auth
      .signInWithPopup(provider)
      .catch(error => alert(error));
  }

  return (
    <main className="login-wrapper">
      <img
        className="login-wrapper-background"
        src="https://images.pexels.com/photos/1109543/pexels-photo-1109543.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
        alt="login screen background"
      />
      <section className="login-panel">
        <img
          className="login-panel-logo"
          src="https://direct-telecom.es/wp-content/uploads/2014/08/dt.png"
          alt="direct-telecom logo"
        />
        <div className="login-panel-overlay"></div>
        <Button
          style={{ width: 268 }}
          type="primary" 
          onClick={login}
        >
          LOGIN
        </Button>
      </section>
    </main>
  )
}

export default Login;
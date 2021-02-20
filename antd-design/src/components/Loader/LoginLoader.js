import React from 'react'

function LoginLoader() {
  return (
    <div style={{
      position:"absolute",
      top:"50%",
      left:"50%",
      transform: "translate(-50%, -50%)"
    }}>
      <div style={{ textAlign: "center" }}>
        {/* If you have a logo add it below */}
        {/* <img src={logo} /> */}
        <h1>Redirecting to the application. Please wait...</h1>
      </div>
    </div>
  )
}

export default LoginLoader

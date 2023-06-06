import "./index.css";

import { useState } from "react";



function Login() {

  function eventLogin (e) {
    e.preventDefault();

  
  
  
  }
  
  // Aquì hago el formulario
  return (
    <>
    
    
    <div className="squareLogin">
   
      <input type="text" className="emailInput" placeholder="Type your email" />
      <input type="text" placeholder="Password" />
      <button className="btnLogin" onClick={evento}> Login </button>

    
    
    </div>
    </>

      
  );

}


export default Login

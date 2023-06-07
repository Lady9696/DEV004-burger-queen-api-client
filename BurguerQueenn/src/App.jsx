import "./index.css";
import { useState, useEffect } from "react";
// useState me permite saber el estado del usuario, si esta logueado
//o no




function Login() {
  
 const [milogin, setlogin] = useState(false);
 //para capturar le nombre del usuario y la clave
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const getValues = (e) =>{
    
  e.preventDefault();
  const email = e.target.email.value;
  const password= e.target.password.value; 
  console.log(email);
  console.log(password);
  

  }
  
  
  // Aquì hago el formulario
  return (
    <>
 
    <div className="squareLogin">
     
     
  <div className="conatinerTitleImage">
    <h1>Burguer Queen </h1>
    <img className="logo"src="https://i.ibb.co/7SRPXzW/burguer.png" alt="burguer" ></img>
    </div>    
    
     
    <form className="loginForm"onSubmit = { getValues }>
      <label className= "emailLabel">
        <input type ="text" name="email" className="inputEmail" placeholder="Type your email"   required>
        </input>
      </label>
      <label className="passworrLabel">
        <input className="inputPassword" name="password" placeholder="Password"  required></input>
      </label>
      <button type = "submit" className="btnLogin"> Login</button>





    </form>
      
    <div className="footerLogin"></div> 
    
    </div>
    </>     
  );

}


export default Login

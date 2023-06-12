import "../login/login.css";
//import { useState } from "react";
import { eyeOffOutline } from 'ionicons/icons';

import { useNavigate } from "react-router-dom"


import axios from 'axios';




function Login() {

  //const [login, setlogin] = useState("false");
  //para capturar le nombre del usuario y la clave con el evento onchage

  //const [email, setEmail] = useState("");
  //const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const getValues = (e) => {
    e.preventDefault();


    const objeto = {
      email: e.target.email.value,
      password: e.target.password.value

    }

    //axios
    //se utiliza  axios, con el mètodo post
    axios.post("http://localhost:8080/login", objeto)
      .then((response) => {
        console.log(response, 'hola')
        window.localStorage.setItem("accessToken", response.data.accessToken);
        window.localStorage.setItem("user", JSON.stringify(response.data.user));

        navigate("/menu");
        //aqui colocar  el menu cuando el usuario 
        //se loguee

      })
      .catch((error) => {
        console.log(error.response.data)


      })

  } // Aquì hago el formulario
  return (
    <>

      <div className="squarecontainer">
        <div className="conatinerTitleImage">
          <h1>Burguer Queen </h1>
          <img className="logo" src="https://i.ibb.co/7SRPXzW/burguer.png" alt="burguer" ></img>
        </div>
        <form className="loginForm" onSubmit={getValues}>
        <div className="emailGroup">
          <label htmlFor="emailLabel"> </label>
            <input type="text" name="email" className="inputEmail" placeholder="Type your email" required>
            </input>
           </div> 
           <div className="passwordGroup">
          <label htmlFor="passworrLabel"></label>
          <input type="password" id="passwordInput" name="password" className="inputPassword" placeholder="Password" required /> 
                   <span className="input-group-addon">
                   <ion-icon className="eye" name="eye-off-sharp"></ion-icon>

                   </span>
            </div> 
         
          <button type="submit" className="btnLogin"> Login</button>
        </form>

        <div className="footerLogin"></div>

      </div>
    </>
  );

}

export default Login

/*axios.post("http://localhost:8080/")
  //esto me devuelve una promesa
  .then((response)=>{
    console.log(response);

  })*/
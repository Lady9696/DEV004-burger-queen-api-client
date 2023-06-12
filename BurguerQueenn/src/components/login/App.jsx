import "../login/login.css";
//import { useState } from "react";
import { useNavigate } from "react-router-dom"
import axios from 'axios';

function Login() {

  const navigate = useNavigate();

  const getValues = (e) => {
    e.preventDefault();
    const objeto = {
      email: e.target.email.value,
      password: e.target.password.value
    }


    //se utiliza  axios, con el mètodo post
    axios.post("http://localhost:8080/login", objeto)
      .then((response) => {
        console.log(response, 'hola')
        window.localStorage.setItem("accessToken", response.data.accessToken);
        window.localStorage.setItem("user", JSON.stringify(response.data.user));
        navigate("/menu");
      })
      .catch((error => {
        if(error.response.data === "Incorrect Password"){
          alert("incorrect Pasword");
        }
      }))

  }
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
            <input type="password" security id="passwordInput" name="password" className="inputPassword" placeholder="Password" required />
            <span className="input-group-addon">
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
<ion-icon  name="eye-off-sharp"></ion-icon>
  })*/
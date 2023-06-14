import "../login/login.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom"
import axios from 'axios';
/* se crea el componente Login */
function Login() {
  /*Se declara navigate para poder utilizar el hook useNavigate
*/  const navigate = useNavigate();
/*se crea una funcion y dentro de ella un evento que me permite capturar los valores del input email y contraseña*/
  const getValues = (e) => {
    e.preventDefault();
    /*se crea un objeto con el value de los inputs*/

    
    const objeto = {
      email: e.target.email.value,
      password: e.target.password.value
    }
   /*se realiza la peticion con post y se le pasa el objeto con los values de los inputs*/
    axios.post("http://localhost:8080/login", objeto)
    /*si el usuario ingresa el correo y contraseña correctos, se va dirigir al menu*/
      .then((response) => {
        console.log(response, 'hola')
        window.localStorage.setItem("accessToken", response.data.accessToken);
        window.localStorage.setItem("user", JSON.stringify(response.data.user));
        navigate("/menu");
      })/*de lo contario, la promesa es rechazada y permanecene login*/
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
            <input type="password"  id="passwordInput" name="password" className="inputPassword" placeholder="Password" required />
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
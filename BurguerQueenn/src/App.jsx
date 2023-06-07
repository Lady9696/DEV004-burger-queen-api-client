import "./index.css";






function Login() {

  function eventLogin (e) {
    e.preventDefault();
    const email = e.target.email.value;
    const password= e.target.password.value; 
    console.log(email, password);
    
  
  
  
  }
  
  // Aquì hago el formulario
  return (
    <>
 
    <div className="squareLogin">
     
     
  <div className="conatinerTitleImage">
    <h1>Burguer Queen </h1>
    <img className="logo"src="https://i.ibb.co/7SRPXzW/burguer.png" alt="burguer" ></img>
    </div>    
    
     
    <form className="loginForm"onSubmit = { eventLogin }>
      <label className= "emailLabel">
        <input type ="text" name="email" className="inputEmail" placeholder="Type your email">
        </input>
      </label>
      <label className="passworrLabel">
        <input className="inputPassword" name="password" placeholder="Password"></input>
      </label>
      <button type = "submit" className="btnLogin"> Login</button>





    </form>
      
    <div className="footerLogin"></div> 
    
    </div>
    </>     
  );

}


export default Login

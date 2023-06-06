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
      
    
    
    </div>
    </>     
  );

}


export default Login

//import axiosBD from "../axios";
import axios from "axios";
import "../index.css";
export const Menu = () => {
//hago el evento con el boton
//meto los datos dentro del formulario form para que los envie al cocina
//creo el evento asociado al formulario

const sendToCook = (e) => {
    e.preventDefault();
    const name = e.target.nameCustomer.value;
    console.log(name, 'esi da');
    //hacer el objeto con los productos seleccionados
   const  objeto2 = {
        client:name,
        prodcutx:[] 
    }
    console.log(objeto2)
//Aqui debo hacer la peticiòn, aqui debo psar el objeto
axios.post("http://localhost:8080/login")
.then((response ) => {
  console.log(response, 'hola')
  
  //aqui colocar  el menu cuando el usuario 
  //se loguee

})
.catch ((error) => {
  console.log(error.response.data)


})


}
return(
    <>
    
   <div className="squarecontainer">
<form id = "order" onSubmit={sendToCook}>
      <div className="squareMenuBreakfast">
        <div className="containerAmericanCofee">
        
        </div>
        <div className="containersandwich"></div>
       
        <div className="containerJuice"></div>
       
        <div className="containerCapuccino"></div>
       
      </div>
      <div className="squareMenuLunch">
      <div className="containerburguer">
     
      </div>
        <div className="containerFranceFries">
       
        </div>
        <div className="containerOnionrings">
        </div>
        <div className="ContainerDoubleburguer"></div>
        
        <div className="containerWaterBig"></div>
        <div className="containerWater500ml"></div>
        <div className="containerCoke"></div>
        <div className="containerBeer"></div>
        </div>
        <button type="submit" id= "sendOrder" ></button>
        <label className="labelcustomer">
            <input id="nameCustomer"></input>
        </label>
        
        </form>
        </div> 
      
      
      
      </>  
    );
    }
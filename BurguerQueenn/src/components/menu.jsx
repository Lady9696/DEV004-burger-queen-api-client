//import axiosBD from "../axios";
import "../index.css";
import { useContext } from "react";
import { dataContex } from "./contex/eso";

import { Navigate } from "react-router-dom";





export const Menu = () => {
  const { data } = useContext(dataContex);
  
const access =window.localStorage.getItem("accessToken");
const user = JSON.parse(window.localStorage.getItem("user"));
if(access=== null && user === null ){
return <Navigate to="/" replace={true} />
}
  // const[productos,setProductos] = useState();
  console.log(data,'*****');
  /*
  return data.map((product) => {
    return (
      <>

        <div className="squarecontainer">
          <form id="order">
            <div className="squareMenuBreakfast">
              <div className="containerAmericanCofee">

              </div>
              <div className="containersandwich"></div>
              <div className="container"></div>
              <img className="juice" src="https://i.ibb.co/4tGvFLT/juice.png" alt="juice"></img>
              <div className="container"></div>
              <img className="capuccino" src="https://i.ibb.co/2j30wj4/capuccino.png" alt="capuccino"></img>
            </div>
            <div className="squareMenuLunch">
              <div className="container">
                <img className="burguer" src="https://i.ibb.co/s3Cmk7p/burger1.png" alt="burguer"></img>
              </div>
              <div className="container">
                <img className="franceFries" src="https://i.ibb.co/YBSThnw/frenchfries.png" alt="franceFries"></img>
              </div>
              <div className="container">
                <img className="onionRings" src="https://i.ibb.co/J2gPkmG/onion.png" alt="onionRings"></img>
              </div>
              <div className="Container"></div>
              <img className="doubleBurguer" src="https://i.ibb.co/2ZyjHvB/double-Burguer.png" alt="doubleBurguer"></img>

              <div className="container"></div>
              <img className="bigWater" src="https://i.ibb.co/qBv0WV4/5213596.png" alt="water700ml"></img>
              <div className="containerWater500ml"></div>
              <img className="smallWater" src="https://i.ibb.co/9HZdHNb/water.png" alt="water500ml"></img>
              <div className="containerCoke"></div>
              <img className="coke" src="https://i.ibb.co/kcP8kLB/07-01.png" alt="coke500ml"></img>
              <div className="containerBeer"></div>
              <img className="coke" src="https://i.ibb.co/NjhWL3h/beer.png" alt="beer"></img>
            </div>
            <button type="submit" id="sendOrder" ></button>
            <label className="labelcustomer">
              <input id="nameCustomer"></input>
            </label>

          </form>
        </div>



      </>
    );

  })*/







}


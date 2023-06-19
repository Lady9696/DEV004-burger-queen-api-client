import axios from "axios"
import { Navigate } from "react-router-dom";
import {  useContext } from "react";
import { dataContex } from "../contex/eso";
export const Kitchen = () => {

  const { access, user} = useContext(dataContex);
  if (access === null && user === null) {
    return <Navigate to="/" replace={true} />
  }
  //necesito traerme la orden que enviè con una peticion http(
  axios.get("http://localhost:8080/orders")
    .then((response) => {
      console.log(response, 'HOLA');
    })
    .catch((error) => {
      console.log(error);
    });
  return (
    <div className="squareKitchen">
      <div className="orders"><p>Pedidos</p></div>
      <div className="order-show"></div>




    </div>

  )

}
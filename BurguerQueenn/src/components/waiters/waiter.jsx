
import "../waiters/waiter.css"
import axios from "axios" 
import { Navigate, Link } from "react-router-dom";
import {  useContext, useState } from "react";
import { dataContex } from "../contex/eso";

export const Waiter = () => {
  const [orders, setOrders] = useState([]);

  const { access, user} = useContext(dataContex);
  if (access === null && user === null) {
    return <Navigate to="/" replace={true} />
  }


  //para ver los pedidos debo hacer una peticiòn get de las ordenes 
  axios.get("http://localhost:8080/orders")
    .then((response) => {
        //las ordenes sin filtro
        console.log(response.data)
        const orders = response.data; 
      //hago un fitlro para traerme solo las que tiene status_done
      const filteredOrders = orders.filter(order => order.status === 'done');
      //console.log(filteredOrders);
      

    })
    .catch((error) =>{
      console.log(error);

    });
    
  return (
    <div className="squareWaiter">
      
    </div>
        
  );

}
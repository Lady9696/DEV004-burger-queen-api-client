import axios from "axios"
import "../kitchen/kitchen.css"
import { Navigate, Link } from "react-router-dom";
import {  useContext,useEffect, useState } from "react";
import { dataContex } from "../contex/eso";

export const Kitchen = () => {
  const [orders, setOrders] = useState([]);
  const [orderSelected, SetOrderSelected] = useState(null);
  const [filterType, setFilterType] = useState('pending');


  useEffect(() => {
    axios.get("http://localhost:8080/orders")
      .then((response) => {
        const sortedOrders = response.data.sort((a, b) => {
          // Ordenar por fecha y hora en orden descendente
          const dateA = new Date(a.date + ' ' + a.time);
          const dateB = new Date(b.date + ' ' + b.time);
          return dateB - dateA;
        });
        setOrders(sortedOrders);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const { access, user} = useContext(dataContex);
  if (access === null && user === null) {
    return <Navigate to="/" replace={true} />
  }
  const changeOrderStatus = (orderId) =>{
    SetOrderSelected(orderId)
    const updatedOrders = orders.map((order) => {
      if (order.id === orderId) {
        return { ...order, status: "delivered" };
      }
      return order;
    });
  
    axios
      .patch(`http://localhost:8080/orders/${orderId}`, { status: "delivered" })
      .then(() => {
        setOrders(updatedOrders);
      })
      .catch((error) => {
        console.log(error);
      });

  }
  
  const showOrdersByStatus = (status) => {
    setFilterType(status);
  };

  const filteredOrders = orders.filter((order) => {
    if (filterType === "pending") {
      return order.status === "pending";
    } else if (filterType === "delivered") {
      return order.status === "delivered";
    }
    return true; // Si no hay filtro seleccionado, muestra todas las órdenes
  });

  


  return (
    <div className="squareKitchen">
      <div className="orders">
        <p>Pedidos</p>
        <button className="buttonMenu" onClick={() => showOrdersByStatus("pending")}>
          Pendientes
        </button>      
        <button className="buttonMenu" onClick={() => showOrdersByStatus("delivered")}>
          Entregados
        </button>
        <button className="buttonMenu" id="buttonBreakfast" > <Link to="/menu">Menu</Link>
        </button>
      </div>
      <div className="order-show">
        {filteredOrders.map((order) => (
          <div  className={`order-container ${order.status === "delivered" ? "delivered" : ""}`}
            key={order.id}
            onClick={() => changeOrderStatus(order.id)} >
            <p className="item">Cliente: {order.clientName}</p>
            <p className="item">Fecha: {order.date}</p>
           
            <p className="item"></p>
            <ul>
              {order.products.map((product, index) => (
                <li key={index}>{product.name}</li>
              ))}
            </ul>
            
          </div>
        ))}
      </div>
    </div>
  );
}



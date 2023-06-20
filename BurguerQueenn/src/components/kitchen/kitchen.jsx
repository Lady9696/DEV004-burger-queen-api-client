import axios from "axios"
import dayjs from "dayjs";
import duration from 'dayjs/plugin/duration';
dayjs.extend(duration);

import "../kitchen/kitchen.css"
import { Navigate, Link } from "react-router-dom";
import {  useContext,useEffect, useState } from "react";
import { dataContex } from "../contex/eso";

export const Kitchen = () => {
  const [orders, setOrders] = useState([]);
  const [orderSelected, setOrderSelected] = useState(null);
  const [filterType, setFilterType] = useState('pending');
  const [dateProcessed, setdateProcessed] = useState(null);
  


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
  //este es el el onclick
  const changeOrderStatus = (orderId) => {
    setOrderSelected(orderId)
    const updatedOrders = orders.map((order) => {
      if (order.id === orderId) {
        
        return { ...order, status: "done"};
        
      }
      return order;
    });

    const currentDate = dayjs();
    const formattedDate =currentDate.format('YYYY-MM-DD HH:mm:ss');
    //peticion para cambiar el estado y para introducir el dateProcessed en el servidor
    // ...
    axios
      .patch(`http://localhost:8080/orders/${orderId}`, {
        status: "done",
        dateProcessed: formattedDate,
      })
      .then(() => {
        const updatedOrders = orders.map((order) => {
          if (order.id === orderId) {
            // Actualiza la propiedad `status` y `dateProcessed` del pedido correspondiente
            return { ...order, status: "done", dateProcessed: formattedDate };
          }
          return order;
        });

        // Actualiza el estado con los pedidos actualizados
        setOrders(updatedOrders);
        setdateProcessed(formattedDate);
      })
      .catch((error) => {
        console.log(error);
      });
    // ...


  }
  
  const showOrdersByStatus = (status) => {
    setFilterType(status);
  };

  const filteredOrders = orders.filter((order) => {
    if (filterType === "pending") {
      return order.status === "pending";
    } else if (filterType === "done") {
      return order.status === "done";
    }
    return true; // Si no hay filtro seleccionado, muestra todas las órdenes
  });
  // aqui hago mi funciòn para acceder el tiempo demorado
  console.log(filteredOrders, 'ordenes filtradas')
  
  const calculateDuration = (dateEntry, dateProcessed) => {
    const start = dayjs(dateEntry);
    const end = dayjs(dateProcessed);
    const duration = dayjs.duration(end.diff(start));
    const hours = duration.hours();
    const minutes = duration.minutes();
    const seconds = duration.seconds();
  
    return `${hours} hours, ${minutes} minutes, ${seconds} seconds`;
  };
  


  
  
  /*<p className="item">Fecha: {order.dataEntry}</p>
            <p className="item">tiempo: {order.dateProcessed}</p>
            con sto hice el calculo
                        <p className="item">Demorado: {order.dataEntry ? calculateElapsedTime(order.dataEntry, order.dateProcessed) : ""} <p>Duración: {calculateDuration(order.dateEntry, order.dateProcessed)}</p></p>
*/
  


  return (
    <div className="squareKitchen">
      <div className="orders">
        <p>Pedidos</p>
        <button className="buttonMenu" onClick={() => showOrdersByStatus("pending")}>
          Pendientes
        </button>      
        <button className="buttonMenu" onClick={() => showOrdersByStatus("done")}>
          Entregados
        </button>
        <button className="buttonMenu" id="buttonBreakfast" > <Link to="/menu">Menu</Link>
        </button>
      </div>
      <div className="order-show">
        {filteredOrders.map((order) => (
            
          <div  className={`order-container ${order.status === "done" ? "done" : ""}`}
            key={order.id}
            onClick={() => changeOrderStatus(order.id)} >
            <p className="item">Cliente: {order.clientName}</p>
            
            <p  className="item">tiempo incial {order.dateEntry}</p>
            <p className="item">tiempo final {order.dateProcessed}</p>
            <p className="item">tiempo demorado {calculateDuration(order.dateEntry, order.dateProcessed)}</p>
            
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



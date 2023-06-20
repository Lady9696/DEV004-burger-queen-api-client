import axios from "axios"
import dayjs from "dayjs";
import duration from 'dayjs/plugin/duration';
dayjs.extend(duration);
import { OrderContainer } from "./orderContainer";

import "../kitchen/kitchen.css"
import { Navigate, Link } from "react-router-dom";
import {  useContext,useEffect, useState } from "react";
import { dataContex } from "../contex/eso";

export const Kitchen = () => {
  const [orders, setOrders] = useState([]);
  const [orderSelected, setOrderSelected] = useState(null);
  const [filterType, setFilterType] = useState('pending');
 
  


  useEffect(() => {
    axios.get("http://localhost:8080/orders")
      .then((response) => {
        console.log(response.data, 'aquiiiii')
        const sortedOrders = response.data.sort((a, b) => {
          // Ordenar por fecha y hora en orden descendente
          const dateA = new Date(a.dateEntry);
          const dateB = new Date(b.dateEntry);
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
    /*
    const updatedOrders = orders.map((order) => {

      if (order.id === orderId) {
        
        return { ...order, status: "done"};
        
      }
      return order;
    });
    */
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
        
      })
      .catch((error) => {
        console.log(error);
      });
    // ...


  }
  //para filtrar por estado 
  
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
        <button className="buttonMenu"  > <Link to="/menu">Menu</Link>
        </button>
        <button className="buttonMenu"  > <Link to="/waiter">waiter</Link>
        </button>
      </div>
      <div className="order-show">
        {filteredOrders.map((order) => (
          
          < OrderContainer key={order.id} changeStatus={changeOrderStatus} order={order} />
          /*
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
          */
        ))}
      </div>
    </div>
  );
}



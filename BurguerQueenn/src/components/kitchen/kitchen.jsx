import axios from "axios"
import moment from "moment";
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
        
        return { ...order, status: "done"};
        
      }
      return order;
    });
    const currentDate = new Date();
    const formattedDate = moment(currentDate).format('YYYY-MM-DD HH:mm:ss');
    axios
      .patch(`http://localhost:8080/orders/${orderId}`, {
        status: "done", dateProcessed:formattedDate,
      })
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
    } else if (filterType === "done") {
      return order.status === "done";
    }
    return true; // Si no hay filtro seleccionado, muestra todas las órdenes
  });
  const calculateElapsedTime = (dataEntry, dateProcessed) => {
    const start = moment(dataEntry, "HH:mm");
    const end = moment(dateProcessed, "HH:mm");
    const duration = moment.duration(end.diff(start));
    const hours = Math.floor(duration.asHours());

    const minutes = duration.asMinutes();
    let elapsedTime = "";
    if (hours > 0) {
      elapsedTime += hours === 1 ? `${hours} hora ` : `${hours} horas `;
    }
    if (minutes > 0) {
      elapsedTime += minutes === 1 ? `${minutes} minuto` : `${minutes} minutos`;
    }
  
    return elapsedTime;

    
  };
  console.log('*****', orders)
/*<p className="item">Fecha: {order.dataEntry}</p>
            <p className="item">tiempo: {order.dateProcessed}</p>
            con sto hice el calculo*/
  


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
            
            <p className="item">Demorado: {order.dataEntry ? calculateElapsedTime(order.dataEntry, order.dateProcessed) : ""}</p>

           
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



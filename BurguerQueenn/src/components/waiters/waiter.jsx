
import "../waiters/waiter.css"
import axios from "axios" 
import { Navigate, Link } from "react-router-dom";
import {  useContext, useState,useEffect} from "react";
import { dataContex } from "../contex/eso";


export const Waiter = () => {
  const [orders, setOrders] = useState([]);
  const [orderSelected, setOrderSelected] = useState(null);
  const [filterType, setFilterType] = useState('done');
  


  //para ver los pedidos debo hacer una peticiòn get de las ordenes 
  //tengo que usar useefecct o sino se siguen ejecutando la promesa todo el timepo y le navegador
  //se me llena de mensajes
  useEffect(() => {
    axios.get("http://localhost:8080/orders")
      .then((response) => {
      //las ordenes sin filtro
      //console.log(response.data)
        const orders = response.data; 
        //hago un fitlro para traerme solo las que tiene status_done
        const filteredOrders = orders.filter(order => order.status === 'done');
        console.log(filteredOrders);
    
        setOrders(filteredOrders)
      })
      .catch((error) =>{
        console.log(error);

      });
  }, []);
    
  const { access, user} = useContext(dataContex);
  if (access === null && user === null) {
    return <Navigate to="/" replace={true} />
  }
  // aqui hago el manejador para cambiar el estado
  const handlechangeOrderStatus = (orderId) =>{
    setOrderSelected(orderId)
    // aqui debo hacer la peticiòn para cambiar el estado de
    //status:"done", a status: delivered en el servidor
    axios
      .patch(`http://localhost:8080/orders/${orderId}`,{ status: "delivered"})

      .then(() =>{
        //recuerdo que me entrega un arrya con las ordenes
        //utilizo map para iterarlas, entonces si tiene el mismo id,
        //se actualiza el estado local
        const updatedOrders = orders.map((order) => {
          if (order.id === orderId) {
            // Actualiza la propiedad `status` 
            return { ...order, status: "done" };
          }
          return order;
        });
        //actualizo las orders con el estado delivered
        setOrders(updatedOrders);

      }).catch((error) => {
        console.log(error);
      });
  }

  const showOrdersByStatusDelivered = (status) => {
    setFilterType(status);

  };
  
  const filteredOrders = orders.filter((order) => {
    if (filterType === "done") {
      return order.status === "done";
    } else if (filterType === "delivered") {
      return order.status === "delivered";
    }
    return true; // Si no hay filtro seleccionado, muestra todas las órdenes
  });
    // aqui hago mi funciòn para acceder el tiempo demorado
  console.log(filteredOrders, 'ordenes filtradas')





  return (
    <div className="squareWaiter">
      <div className="headers">
        <button className="buttonMenu"  > <Link to="/menu">Menu</Link>
        </button>
        <button className="buttonMenu"  > <Link to="/waiter">waiter</Link>
        </button>
      </div>
      <div className="button-orders"> 
        <button className="buttonMenu" onClick={() =>showOrdersByStatusDelivered("done")}>
          Pendientes
        </button>      
        <button className="buttonMenu" onClick={() => showOrdersByStatusDelivered("delivered")}>
          Entregados
        </button>
      </div>
      {orders.map((order) => (
        
        <div className="orderContainer" key= {order.id}>
          <p className="item">Cliente: {order.clientName}</p>
          <p className="item">estado: {order.status}</p>
          
        </div>
    
      ))}
      
    </div>
        
  );

}
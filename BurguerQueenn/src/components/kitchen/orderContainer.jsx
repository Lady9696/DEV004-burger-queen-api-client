/* eslint-disable react/prop-types */
import dayjs from "dayjs";
import duration from 'dayjs/plugin/duration';
dayjs.extend(duration);
const calculateDuration = (dateEntry, dateProcessed) => {
  const start = dayjs(dateEntry);
  const end = dayjs(dateProcessed);
  const duration = dayjs.duration(end.diff(start));
  const hours = duration.hours();
  const minutes = duration.minutes();
  const seconds = duration.seconds();
  
  return `${hours} hours, ${minutes} minutes, ${seconds} seconds`;
};
// eslint-disable-next-line react/prop-types
export const OrderContainer = ({order,changeStatus}) =>{


  return (<><div  className={`order-container ${order.status === "done" ? "done" : ""}`}
    key={order.id}
    onClick={() => changeStatus(order.id)} >
    <p className="item">Cliente: {order.clientName}</p>
  
    
  
    <ul className="products">
      <p className="name-products">Productos</p>
      {order.products.map((product, index) => (
        
        <li className="product" key={index}>{product.name}</li>
      
      ))}
    </ul>
   
    {order.status === "done" && <><p className="item">Tiempo demorado</p><p className="time">{calculateDuration(order.dateEntry, order.dateProcessed)}</p></>}
  
  </div>
  </>
  )
}
/*     <p  className="item">tiempo incial {order.dateEntry}</p>
 <p className="item">tiempo final {order.dateProcessed}</p>
*/
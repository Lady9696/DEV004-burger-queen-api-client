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
  
    <p  className="item">tiempo incial {order.dateEntry}</p>
    <p className="item">tiempo final {order.dateProcessed}</p>
    {order.status === "done" && <p className="item">tiempo demorado {calculateDuration(order.dateEntry, order.dateProcessed)}</p>}
  
    <ul>
      {order.products.map((product, index) => (
        <li key={index}>{product.name}</li>
      
      ))}
    </ul>
  
  </div>
  </>
  )
}
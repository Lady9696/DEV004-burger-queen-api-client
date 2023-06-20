import "../waiters/waiter.css"
import axios from "axios" 

export const Waiter = () => {
  //para ver los pedidos debo hacer una peticiòn get de las ordenes y filtrar por status:'done'
  axios.get("http://localhost:8080/orders")
    .then((response) => {
      console.log(response, 'me traigo las ordenes');
 
    })
    .catch((error) =>{
      console.log(error);

    });
    

}
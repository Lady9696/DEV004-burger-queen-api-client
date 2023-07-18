
import dayjs from "dayjs";
import { Navigate, Link} from "react-router-dom";
import "../menu/menu.css"
import {  useContext, useState } from "react";
import { dataContex } from "../contex/eso";
import { useProducts } from "../services/useProducts";
import axios from "axios";

//componente
export const Menu = () => {
  const { access, user,cart, setCart} = useContext(dataContex);
  const [count, setCount] = useState(0);
  
  
  const {productsPromiseStatus, products} = useProducts()
  /*inicializo la constante como null*/
  //incializo el filtro con el tipo desayuno
  const [filterType, setFilterType] = useState("Desayuno");
  const [clientName, setClientName] = useState('');
  
  
  
  if (access === null && user === null) {
    return <Navigate to="/" replace={true} />
  }
  /*creo una funciòn que recibe un paràmetro que permite cambiar el valor a desayuno o almuerzo, esta funciòn
  se encuentra dentro de los botones, y el cambio se produce al darle click*/
  const handleFiltro = (type) => {
    
    setFilterType(type);
  };
  /*si el filtro es truthy, entonces se ejecutarà el filtrado el cual serà desayuno o almuerzo segùn el estado
  de lo contario, es decir si es null, entonces se mostraran todos los productos*/
  const filteredProducts = filterType ? products.filter((product) => product.type === filterType): products;
  //Aqui voy a agregarle el onclick a los productoe

  const resetFields = () => {
    setClientName('');
  //realizo el carrito
  }
  const AddToCart = (product, count) => {
    
    setCart((prevCart) => {
      const existingProduct = prevCart.find((item) => item.id === product.id);
      
      if (existingProduct) {
        return prevCart.map((item) => {
          if (item.id === product.id) {
            return { ...item, quantity: item.quantity + 1 };
          }
          return item;
        });
      }
  
      return [...prevCart, { ...product, quantity: 1 }];
    });
    setCount((prevCount) => {
      const updatedCount = { ...prevCount };
      updatedCount[product.id] = (updatedCount[product.id] || 0) + 1;
      return updatedCount;
    });
  
    console.log(product, count);
  }
  
  
  const removeFromCart = (product) => {
    setCart((prevCart) => {
      const updatedCart = prevCart.map((item) => {
        if (item.id === product.id && item.quantity > 0) {
          return { ...item, quantity: item.quantity - 1 };
        }
        return item;
      });
  
      return updatedCart.filter((item) => item.quantity > 0);
    });
  
    setCount((prevCount) => {
      const updatedCount = { ...prevCount };
      updatedCount[product.id] = (updatedCount[product.id] || 0) - 1;
      return updatedCount;
    });
  }
  
  const calculateTotal = () => {
    const total = cart.reduce((accumulator, product) => {
      return accumulator + product.price * product.quantity;
    }, 0);
  
    return total;
  };
  const handleInputChange = (event) => {
    setClientName(event.target.value);
  };
  const clearCart = () => {
    setCart([]);
    setCount({});
  };
  
  /*
  if (count > 0) {
    setCart(updatedCart);
    console.log('producto eliminado'+ product)
    const updatedCart = cart.filter((item) => item.id !== product.id);
  */
  /*aquì debo hacer el manejador de la peticion */
 
  const handleSendToCook = () => {
    //console.log(cart, 'este es mi carrito con productos elegidos');
    const currentDate = dayjs();
    const formattedDate = currentDate.format('YYYY-MM-DD HH:mm:ss');
    const order = {
      status: 'pending',
      dateEntry: formattedDate,
      clientName: clientName,
      products: cart.map((product) => ({
        name: product.name,
        quantity: product.quantity,
        price: product.price,
        
      })),
    };
     
  
    axios.post("http://localhost:8080/orders", order)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
    // Restablece los campos después de enviar el pedido
    clearCart();
    resetFields();
    
  };
  
  
  
  
  return (
    <div className="squareMenu">
      <div className="headers">
        <nav className="nav">
          <ul className = "list">
            <li className="list-page">
              <a  className="buttonm" id="buttonBreakfast" > <Link to="/kitchen" className="linkButton">Cocina</Link></a>
            </li>
            <li className="list-page">
              <a className="buttonm" id="buttonBreakfast" > <Link to="/waiter" className="linkButton"> Mesero</Link></a>
            </li>
          </ul>

        </nav>


      
      
      </div>
      <div className="containerOptions">
        <button className="buttonMenu" id="buttonBreakfast" onClick={() => handleFiltro("Desayuno")}>Desayuno</button>
        <button className="buttonMenu" id="buttonLunch" onClick={() => handleFiltro("Almuerzo")}>Almuerzo</button>
      </div> 
      <div className="ContainerOrderCliente">
        <div className="containerProducts">
        
          {filteredProducts.map((product) => (
            <div key={product.id} className="containerCard">
              <p>{product.name}</p>
              <img className="productImage" src={product.image} alt="burger" />
              <p>{product.price}</p>
              
              <div className="buttonGroup">
                <div className="Container-increase">
                  
                  <ion-icon name="add-outline" onClick={()=>AddToCart(product, count)}></ion-icon>
                </div>
                
                <div className="Container-decrease">
                  
                  <ion-icon name="remove-outline" onClick={() => removeFromCart(product)}></ion-icon>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="containerTable ">
          <div className="clientContainer">
            <p>Información del pedido</p>
            <label htmlFor="client" className="labelClient">Cliente </label>
            <input className="nameClientInput" type="text"value={clientName}
              onChange={handleInputChange} placeholder="Ingrese el nombre del cliente" ></input> 
          </div>
          <table>
            <thead>
              <tr>
                <th className="headerCell">Producto</th>
                <th className="headerCell">Cantidad</th>
                <th className="headerCell">Precio</th>
                <th className="headerCell">Total</th>

              </tr>
            </thead> 
            <tbody>  
              
              {cart.map((product) => (
                <tr key={product.id}> 
                  <td className="dataCell">{product.name}</td>
                  <td className="dataCell">{count[product.id] || 0}</td>
                  <td className="dataCell">{product.price}</td>
                  <td className="dataCell">{product.price * product.quantity}</td>
                </tr> 
              ))}
             
            </tbody>
          </table>
          <div className="total-container">
            <p>Total a pagar</p>
            <p className="total">{calculateTotal()}</p>
            <button className="buttonMenu" id="send-to-cook" onClick={handleSendToCook} >Enviar pedido</button>
          </div>
          
        </div>

        







      </div>
    </div>
  );
}
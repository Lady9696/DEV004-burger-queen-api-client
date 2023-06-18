
import { Navigate } from "react-router-dom";
import "../menu/menu.css"
import {  useContext, useState } from "react";
import { dataContex } from "../contex/eso";
import { useProducts } from "../services/useProducts";

export const Menu = () => {
  const { access, user,cart, setCart} = useContext(dataContex);
  const [count, setCount] = useState(0);
  
  const {productsPromiseStatus, products} = useProducts()
  /*inicializo la constante como null*/
  const [filterType, setFilterType] = useState("Desayuno");
  
  
  if (access === null && user === null) {
    return <Navigate to="/" replace={true} />
  }
  /*creo una funciòn que recibe un paràmetro que permite cambiar el valor a desayuno o almuerzo, esta funciòn
  se encuentra dentro delos botones, y el cambio se produce al darle click*/
  const handleFiltro = (type) => {
    
    setFilterType(type);
  };
  /*si el filtro es truthy, entonces se ejecutarà el filtrado el cual serà desayuno o almuerzo segùn el estado
  de lo contario, es decir si es null, entonces se mostraran todos los productos*/
  const filteredProducts = filterType ? products.filter((product) => product.type === filterType): products;
  //Aqui voy a agregarle el onclick a las imagenes

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
  /*
  if (count > 0) {
    setCart(updatedCart);
    console.log('producto eliminado'+ product)
    const updatedCart = cart.filter((item) => item.id !== product.id);
  */
  
  return (
    <div className="squareMenu">
      <button className="buttonMenu" id="buttonBreakfast" onClick={() => handleFiltro("Desayuno")}>Desayuno</button>
      <button className="buttonMenu" id="buttonLunch" onClick={() => handleFiltro("Almuerzo")}>Almuerzo</button>
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
        <div className="order">
          <div className="tile">
            <h2>Información del pedido</h2>
            <div className="clientContainer">
              <label htmlFor="client" className="labelClient">Cliente </label>
              <input className="nameClientInput" type="text" />
            </div>
            <div className="itemProducts">
              <p className="item-title">Producto</p>
              <p className="item-title">Cantidad</p>
              <p className="item-title">Precio</p>
              <p className="item-title">Total</p>
            </div>
            {cart.map((product) => (
              <div className="productRow" key={product.id}>
                <p className="item">{product.name}</p>
                <p className="item"> {count[product.id] || 0}</p>
                <p className="item">{product.price}</p>
                <p className="item">{product.price * product.quantity}</p>
               
              </div>
              
            ))}
            <div className="total-container" > <p className="total">Total</p>
              <p className="itemTotal">{calculateTotal()}</p>
              <button className="button-cook" id="buttonSendToCook" >Enviar pedido</button>

            </div>
          </div>
        </div>

        







      </div>
    </div>
  );
}
import axios from "axios";
import { Navigate } from "react-router-dom";
import "../menu/menu.css"
import {  useContext, useState } from "react";
import { dataContex } from "../contex/eso";
import { useProducts } from "../services/useProducts";

export const Menu = () => {
  const { access, user, cart, setCart } = useContext(dataContex);
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
  /*
  const productSelected = (product) => {
    console.log(product);
    setCart([...cart, product])

  }
  */
  const productSelected = (product) => {
    setCart([...cart, product])
    

    
  }
  
  


  
  
  
  
  return (   <div className="squareMenu">
    <button className="buttonMenu"  id="buttonBreakfast" onClick={() => handleFiltro("Desayuno")}>Desayuno</button>
    <button className="buttonMenu" id="buttonLunch" onClick={() => handleFiltro("Almuerzo")}>Almuerzo</button>
    {filteredProducts.map((product) => (
      <div key={product.id} className="containerCard">
        <form className="formmenu">
          <div className="containerimageName">
            <h2 className="productName">{product.name}</h2>
            <img className="productImage" onClick={()=> productSelected(product)} src={product.image} alt="burger" />
            <h2>{product.price}</h2>
          </div>
        </form>
      </div>
    ))}
    <div className="containerOrder"> 
      <div  className="order">  
        {cart.map((product) => (
          <div key={product.id} className="productList">
            <div className="itemsOrder">Cantidad</div> 
            <div className="itemsOrder">Producto: {product.name}</div> 
            <div className="itemsOrder">Precio: {product.price}</div>
          </div>  
        ))}
        <div className="line"></div>
        <div className="clientContainer">
          <label htmlFor="client" className="labelClient">Cliente </label>
          <input className="nameClientInput" type="text" ></input> 
          <button type= "submit" className="sentToCook" >Cocina</button>
        </div> 
      </div> 
    </div>
   
  </div>
  )
}
  

              
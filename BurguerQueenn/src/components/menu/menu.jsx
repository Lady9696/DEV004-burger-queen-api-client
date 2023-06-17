
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

  const AddToCart = () => {
    setCart([...cart, product])
    setCount(count+1)
    console.log('producto agg'+ product)
  }
  
  const removeFromCart = () => {
    if (count > 0) {
      const updatedCart = cart.slice(0, -1);
      setCart(updatedCart);
      setCount(count - 1);
      
    }
  }
  
  return (
    <div className="squareMenu">
      <button className="buttonMenu" id="buttonBreakfast" onClick={() => handleFiltro("Desayuno")}>Desayuno</button>
      <button className="buttonMenu" id="buttonLunch" onClick={() => handleFiltro("Almuerzo")}>Almuerzo</button>
      <div className="ContainerOrderCliente">
        <div className="containerProducts">
          <p>Producto</p>
          {filteredProducts.map((product) => (
            <div key={product.id} className="containerCard">
              <div className="productName">{product.name}</div>
              <img className="productImage" src={product.image} alt="burger" />
              <div className="productPrice">{product.price}</div>
              
              <div className="buttonGroup">
                <div className="Container-increase">
                  
                  <ion-icon name="add-outline"></ion-icon>
                </div>
                <div className="Container-decrease">
                  
                  <ion-icon name="remove-outline"></ion-icon>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
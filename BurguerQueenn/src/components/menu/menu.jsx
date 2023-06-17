
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
    
    setCart([...cart, product])
    setCount((prevCount) => {
      const updatedCount = { ...prevCount };
      updatedCount[product.id] = (updatedCount[product.id] || 0) + 1;
      return updatedCount;
    });
  
    console.log(product, count);
  }
  
  
  const removeFromCart = (product) => {
    
    
  }
  
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
          <p>Producto</p>
          {filteredProducts.map((product) => (
            <div key={product.id} className="containerCard">
              <p>{product.name}</p>
              <img className="productImage" src={product.image} alt="burger" />
              <p>{product.price}</p>
              
              <div className="buttonGroup">
                <div className="Container-increase">
                  
                  <ion-icon name="add-outline" onClick={()=>AddToCart(product, count)}></ion-icon>
                </div>
                <p> <p>{count[product.id] || 0}</p></p>
                <div className="Container-decrease">
                  
                  <ion-icon name="remove-outline" onClick={() => removeFromCart(product)}></ion-icon>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
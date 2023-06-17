
import { Navigate } from "react-router-dom";
import "../menu/menu.css"
import {  useContext, useState } from "react";
import { dataContex } from "../contex/eso";
import { useProducts } from "../services/useProducts";
import {ItemCount} from "../menu/counter.jsx"
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
  const productSelected = (product) => {
    setCart([...cart, product])
  }
  //Aquì hagolos manejadores para aumentar y disminuir const handleDecrease = () => {
  // Llamar a la función decrease de ItemCount
  const handleDecrease = () => {
    // Llamar a la función decrease de ItemCount
  };
  
  const handleIncrease = () => {
    // Llamar a la función increase de ItemCount
  };
  

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
              <img className="productImage" onClick={() => productSelected(product)} src={product.image} alt="burger" />
              <div className="productPrice">{product.price}</div>
              
              <div className="buttonGroup">
                <div className="Container-decrease">
                  <ion-icon name="remove-outline" onClick={handleDecrease}></ion-icon>
                </div>
                <div className="Container-increase">
                  <ion-icon name="add-outline" onClick={handleIncrease}></ion-icon>
                </div>
                  
                
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};


  

              
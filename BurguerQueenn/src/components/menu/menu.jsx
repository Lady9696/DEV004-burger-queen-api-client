//import axiosBD from "../axios";
//import axiosBD from "../axios";

import "../menu/menu.css"
//import { Navigate } from "react-router-dom";

import { useContext, useState } from "react";
import { dataContex } from "../contex/eso";

export const Menu = () => {
  const { products } = useContext(dataContex);
  const [filterType, setFilterType] = useState(null);
  //const [breakfastFilter, setBreakfastFilter] = useState(null)
  /*
  access, user
  if (access === null && user === null) {
    return <Navigate to="/" replace={true} />
  }
*/
  const handleFiltro = (type) => {
    setFilterType(type);
 

  };
  const filteredProducts = filterType
    ? products.filter((product) => product.type === filterType)
    : products;
  
  
  return (   <div className="squareMenu">
    <button className="buttonLunch" onClick={() => handleFiltro("Desayuno")}>Desayuno</button>
    <button className="buttonFilter" onClick={() => handleFiltro("Almuerzo")}>Almuerzo</button>
    {filteredProducts.map((product) => (
      <div key={product.id} className="containerCard">
        <form className="formmenu">
          <div className="containerimageName">
            <h2 className="productName">{product.name}</h2>
            <img className="productImage" src={product.image} alt="burger" />
            <h2>{product.price}</h2>
          </div>
        </form>
      </div>
    ))}
  </div>
    
  
  );
};
  

/*{lunchFilter === null ? (
      products.map((product) => (
        <div key={product.id} className="containerCard">
          <form className="formmenu">
            <div className="containerimageName">
              <h2 className="productName">{product.name}</h2>
              <img className="productImage" src={product.image} alt="burger" />
              <h2>{product.price}</h2>
            </div>
          </form>
        </div>
      ))
    ) : (
      lunchFilter.map((product) => (
        <div key={product.id} className="containerCard">
          <form className="formmenu">
            <div className="containerimageName">
              <h2 className="productName">{product.name}</h2>
              <img className="productImage" src={product.image} alt="burger" />
              <h2>{product.price}</h2>
            </div>
          </form>
        </div>
      ))
    )}*/
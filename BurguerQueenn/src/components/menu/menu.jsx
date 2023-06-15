//import axiosBD from "../axios";
//import axiosBD from "../axios";

import "../menu/menu.css"
import { Navigate } from "react-router-dom";

import { useContext, useState } from "react";
import { dataContex } from "../contex/eso";

export const Menu = () => {
  const { products } = useContext(dataContex);
  const [filtro, setFiltro] = useState("");
  const [productosFiltrados, setProductosFiltrados] = useState([]);
  /*
  access, user
  if (access === null && user === null) {
    return <Navigate to="/" replace={true} />
  }
*/
  const handleFiltro = () => {
    const desayunoFiltrado = products.filter((product) => product.type === "Desayuno");
    setFiltro("Desayuno");
    setProductosFiltrados(desayunoFiltrado);
  };
  //const[productos,setProductos] = useState();
  return (
    <div className="squareMenu">
      <button className="buttonbreakfast"onClick={handleFiltro}></button> 
      {productosFiltrados.map((product) => {
            
        return (
          <div key={product.id} className="containerCard">
            <form className="formmenu">
              <div className="containerimageName">
                <h2 className="productName">{product.name}</h2>
                <img className="productImage" src={product.image} alt="burguer" />
                <h2>{product.price}</h2>
              </div>
            </form>
          </div>
        );
      })}
    </div>
  );
}

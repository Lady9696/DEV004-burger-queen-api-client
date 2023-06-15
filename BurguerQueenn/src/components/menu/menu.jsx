//import axiosBD from "../axios";
//import axiosBD from "../axios";

import "../menu/menu.css"
import { Navigate } from "react-router-dom";

import { useContext } from "react";
import { dataContex } from "../contex/eso";

export const Menu = () => {


  const { products, access, user } = useContext(dataContex);
  if (access === null && user === null) {
    return <Navigate to="/" replace={true} />
  }
  //const[productos,setProductos] = useState();

  return (<div className="squareMenu">
    {products.map((product) => {
      const breakfast = product.filter(product => product.type === "Desayuno")

      return (
        <div key={product.id} className="containerCard">
          <form className="formmenu">
            <div className="containerimageName">
              <h2 className="productName">{product.name}</h2>
              <img className="productImage" src={product.image} alt="burguer" ></img>

              <h2>{product.price}</h2>
            </div>


          </form>
        </div>

      );

    })}
  </div>
  
  )

}


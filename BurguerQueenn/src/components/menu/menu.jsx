//import axiosBD from "../axios";
//import axiosBD from "../axios";

import "../menu/menu.css"
import { Navigate } from "react-router-dom";

import { useContext } from "react";
import { dataContex } from "../contex/eso";





export const Menu = () => {
  
  const { products } = useContext(dataContex);

  const access = window.localStorage.getItem("accessToken");
  const user = JSON.parse(window.localStorage.getItem("user"));
  if (access === null && user === null) {
    return <Navigate to="/" replace={true} />
  }
   //const[productos,setProductos] = useState();
  console.log(products, '*****');
   return(<>
   </>
   )
  /*
  return products.map((product) => {
  return(


    <div key={product.id} className="squareMenu">
     <form className="formmenu"> 
   <div className="containerimageName">
    <h2 className="productName">{product.name}</h2>
    <img className="productImage" src={product.image} alt="burguer" ></img>
    
    <h2>{product.price}</h2>
    </div>

   
    </form> 
  </div>
  
);
    
    
  

  })

*/





}


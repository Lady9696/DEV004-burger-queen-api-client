//import axiosBD from "../axios";
//import axiosBD from "../axios";
import "../menu/menu.css"
import { useContext } from "react";
import { dataContex } from "../contex/eso";
import { Navigate } from "react-router-dom";
import { Fragment } from "react";




export const Menu = () => {
  const { data } = useContext(dataContex);
  
const access =window.localStorage.getItem("accessToken");
const user = JSON.parse(window.localStorage.getItem("user"));
if(access=== null && user === null ){
return <Navigate to="/" replace={true} />
}
  // const[productos,setProductos] = useState();
  console.log(data,'*****');
  
  return data.map((product) => {
  return(
    <>
    <Fragment key={product.id}>
    <h1>{product.name}</h1>
    
  </Fragment>
  </>
);
    
    
  

  })







}


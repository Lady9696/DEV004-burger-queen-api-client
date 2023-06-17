import { useState, useEffect,useContext } from "react"
import { dataContex } from "../contex/eso";

import axios from "axios";


export const useProducts = () =>{

  const [status, setStatus] = useState('idle');
  const { products, setProducts } = useContext(dataContex);
  useEffect(() => {
    setStatus("pending")
    axios
      .get("http://localhost:8080/products")
      .then((response) => {
        console.log( response );
        //cuando se hace la solicitud, se guarda en la variable products
        setProducts(response.data);
        setStatus("sucess")
      })
      .catch((error) => {
        setStatus("error")
      });
  }, []);
  return {productsPromiseStatus: status,products}
}
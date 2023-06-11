import {  useEffect, useState } from "react";
import axios from "axios";
import PropTypes from "prop-types";


import { dataContex } from "./eso"

const DataProvider = ({children}) => {
const [data, setData] = useState([]);

useEffect(()=> {
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFuaXRhLmJvcmdAc3lzdGVycy54eXoiLCJpYXQiOjE2ODY1MTI0OTUsImV4cCI6MTY4NjUxNjA5NSwic3ViIjoiMSJ9.lEKRZ-Q-B4ch9X8pHX7f6yXVPDSACw3LZhEy53_oK4E";

    // Obtén los datos
    const userData = {
      email: "anita.borg@systers.xyz",
      id: 1,
      role: "admin"
    };
    // Agrega el token con los datos de usuario como encabezado de autorización
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    axios.defaults.headers.common["User-Data"] = JSON.stringify(userData);
    axios.get("http://localhost:8080/products")
    .then((response) => {
        // Procesar la respuesta exitosa
        setData(response.data);
      })
      .catch((error) => {
        // Manejar el error
        console.error("Error en la solicitud:", error);
      }); 
},[]);


return <dataContex.Provider value={{data}} >{children}</dataContex.Provider>;
 

};

DataProvider.propTypes = {
    children: PropTypes.node.isRequired
  };
  
















export default DataProvider;
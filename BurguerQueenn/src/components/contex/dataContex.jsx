import {  useEffect, useState } from "react";
import axios from "axios";
import PropTypes from "prop-types";


import { dataContex } from "./eso"

const access = window.localStorage.getItem("accessToken");
const user = JSON.parse(window.localStorage.getItem("user"));

// Verifica si el token y los datos del usuario existen en el localStorage
if (access && user) {
  // Agrega el token y los datos del usuario como encabezados personalizados
  axios.defaults.headers.common["Authorization"] = `Bearer ${access}`;
  axios.defaults.headers.common["User-Data"] = JSON.stringify(user);
}

const DataProvider = ({children}) => {
const [data, setData] = useState([]);
useEffect(() => {


    axios.get("http://localhost:8080/products")
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error("Error en la solicitud:", error);
      });
  }, []);

  return (
    <dataContex.Provider value={{ data }}>{children}</dataContex.Provider>
  );
};

DataProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default DataProvider;
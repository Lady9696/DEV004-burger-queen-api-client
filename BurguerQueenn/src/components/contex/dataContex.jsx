import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import PropTypes from "prop-types";


import { dataContex } from "./eso"


// Verifica si el token y los datos del usuario existen en el localStorage


const DataProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [access, setAccess] = useState(window.localStorage.getItem("accessToken"));
  const [user, setUser] = useState(JSON.parse(window.localStorage.getItem("user")));

  const value = useMemo(()=>{
    products, setAccess, setUser, access, user, setProducts
  },[access, products, user])
  useEffect(() => {


    axios.get("http://localhost:8080/products")
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.error("Error en la solicitud:", error);
      });
  }, []);
  useEffect(()=>{
    if(user && access ){
      axios.defaults.headers.common["Authorization"] = `Bearer ${access}`;
      axios.defaults.headers.common["User-Data"] = JSON.stringify(user);
    }

  },[user, access]);
  


  return (
    <dataContex.Provider value={ value }>{children}</dataContex.Provider>
  );
};

DataProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default DataProvider;
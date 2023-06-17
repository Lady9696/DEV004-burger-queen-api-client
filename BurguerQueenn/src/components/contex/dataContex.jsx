/* eslint-disable no-console */
import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import PropTypes from "prop-types";

import { dataContex } from "./eso";
//PROVEEDOR
/*Cuando hay algùn cambio, se encarga de notificar a los componentes que
 dependende èl y actualizar los cambios automaticamente.
*/
const DataProvider = ({ children }) => {
  /*Aquì encuentro las variables las cuales depende de mi provider*/
  /*utilizo useState para utilizar el estado de los objetos, es decir la informaciòn*/
  /*el estadoproducts se inicializa con array vacio*/
  //VALORES DEL CONTEXTO
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  /*Access se inicializa con el token lamacenado localstorage*/
  const [access, setAccess] = useState(
    window.localStorage.getItem("accessToken")
  );
  /*user se inicializa con el user lamacenado localstorage, es decir el correo*/
  const [user, setUser] = useState(
    JSON.parse(window.localStorage.getItem("user"))
  );
  /* Se utiliza UseMemo que me permite guardar en memoria el valor de value que
  hace referencia */
  
  const value = useMemo(() => {
    //aqui devuelve las variables que utilizo, pero no hace càlculo
    return {products, setAccess, setUser, access, user, setProducts, cart, setCart}
    //el segundo paràmetro se pasan las variables.
    //si alguna de estas variables cambia se actualiza el valor del value, sino se cambia se utiliza el valor por defecto
    // memorizado
  }, [access, products, user, cart]);

  useEffect(() => {
    //si user y access existen, se actualiza los common headers, en Authorization se incluye el token
    // mientras que en User-Data se establece los datos de usuario y se utiliza el mètodo para devolver un string con esa
    //informaciòn
    console.log("estoy cambiando los headers**,", access);
    if (user && access) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${access}`;
      axios.defaults.headers.common["User-Data"] = JSON.stringify(user);
    }
    //recibe dos dependencias, user y access
    //si alguno de los dos cambia, el efecto se ejecuta y se actualiza los datos de la cabecera
  }, [user, access]);
  //Permite ejecutar operaciones asicrònicas, en este caso obtener productos
  //hacer la petiicon en el menu
  
  /*permite configurar de manera global en encabezado en axios, encabezado que incluye el token y los datos del user en todas las
  las solicitudes de la app, es decir que antes de hacer cualquier solciitud debo estar verificada.
  
  
  
  /*Se realiza el retorno del dataContex.provider, que envuelve 
  se le pasa el value con los valores que se van acompartirn en toda la app */
  return <dataContex.Provider value={value}>{children}</dataContex.Provider>;
};

DataProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default DataProvider;

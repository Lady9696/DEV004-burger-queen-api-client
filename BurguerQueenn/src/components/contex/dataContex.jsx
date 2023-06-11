import { createContext, useEffect, useState } from "react";
import axios from "axios";
export const dataContex = createContext();

const DataProvider = ({children}) => {
const [data, setData] = useState([]);

useEffect(()=> {
    axios.get("http://localhost:8080/products")
    .then((respons) => setData(respons.data));

    
   
},[])

return <dataContex.Provider>{children}</dataContex.Provider>;


};
















export default DataProvider;
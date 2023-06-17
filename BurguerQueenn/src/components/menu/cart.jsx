
import { useContext,useState} from "react";
import { dataContex } from "../contex/eso";
import { useProducts } from "../services/useProducts";

export const ProductSelected = (product) => {
 
  
  const [count, setCount] = useState(0);
  const AddToCart = () => {
    setCart([...cart, product])
    setCount(count+1)
    console.log('producto agg'+ product)
  }
  
  const removeFromCart = () => {
    if (count > 0) {
      const updatedCart = cart.slice(0, -1);
      setCart(updatedCart);
      setCount(count - 1);
      
    }

  
  }}



//Aquì hagolos manejadores para aumentar y disminuir const handleDecrease = () => {
// Llamar a la función decrease de ItemCount





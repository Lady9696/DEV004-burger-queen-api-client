import { useState } from "react";
const productSelected = (product) => {
  setCart([...cart, product])
}
export const productSelected = () => {
  const [count, setCount] = useState(0);
  
  const decrease =() => {
    setCount(count-1)
  }

  const increase = () =>{
    setCount(count+1)
  }

}
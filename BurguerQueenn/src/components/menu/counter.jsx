import { useState } from "react";

export const ItemCount = () => {
  const [count, setCount] = useState(0);
  
  const decrease =() => {
    setCount(count-1)
  }

  const increase = () =>{
    setCount(count+1)
  }

}
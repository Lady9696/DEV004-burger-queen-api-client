import { Routes, Route } from 'react-router-dom';
import Login from "./App.jsx";
import { Menu } from './components/menu.jsx';
import { Waiter } from './waiter/waiter.jsx';


export const Router = () => {
  return (
    <div className ="router">
      <Routes>
        <Route path="/" element ={<Login></Login>}/>
        <Route path="/menu" element ={<Menu></Menu>}/>
        <Route path="/waiters" element ={<Waiter></Waiter>}/>

      </Routes>
    </div>
  );

}
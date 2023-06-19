import { Routes, Route } from 'react-router-dom';
import Login from "./components/login/App.jsx";
import { Menu } from './components/menu/menu.jsx';
import {Kitchen} from './components/kitchen/kitchen.jsx'


export const Router = () => {
  return (
    <div className ="router">
      <Routes>
        <Route path="/" element ={<Login></Login>}/>
        <Route path="/menu" element ={<Menu></Menu>}/>
        <Route path="/kitchen" element ={<Kitchen></Kitchen>}/>

      </Routes>
    </div>
  );

}
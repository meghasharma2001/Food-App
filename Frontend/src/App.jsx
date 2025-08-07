
import Navbar from "./component/Navbar";
import { BrowserRouter, Route , Routes, Link, Navigate } from "react-router-dom";

import  "../node_modules/bootstrap/dist/css/bootstrap.min.css"
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

import "bootstrap"
import './index.css'

import { useSelector } from "react-redux";

import Homescreens from "./screens/homescreens";
import Cartscreen from "./screens/cartScreen"
import Login from "./screens/Login";
import Register from "./screens/Register";

import Orderscreen from "./screens/orderScreen"

import AdminScreen from "./screens/adminscreens/adminScreen";

import UsersList from "./screens/adminscreens/usersList"
import PizzasList from "./screens/adminscreens/pizzasList";
import AddNewPizza from "./screens/adminscreens/addNewPizza";
import OrdersList from "./screens/adminscreens/ordersList";
import Updatepizzaslist from "./screens/adminscreens/updatepizzasList"


import { useEffect } from "react";


const App = () =>{

  const user = useSelector(state=>state.loginReducerstore.locallogin)





  return(
    <>
     

  <BrowserRouter>
     <Navbar/>
<nav/>
    <Routes>
      <Route exact path="/" element={<Homescreens/>}/>
      <Route exact path="/cart" element={<Cartscreen/>} />
      <Route exact path = "/login" element={<Login/>}/>
      <Route exact path ="/register" element={<Register/>}/>
      <Route exact path ="/test" element={<div>hello megha</div>}/>

      <Route exact path = "/orders" element={<Orderscreen/>} />

    




  {user && user.isadmin ?  
      (<Route exact path = "/admin" element = {<AdminScreen/>} >

          <Route path = "/admin" element={<UsersList/>}/>
          <Route path="userslist" element={<UsersList/>}/>
          <Route path="orderslist" element={<OrdersList/>}/>
          <Route path="addnewpizza" element={<AddNewPizza/>}/> 
          <Route path="pizzalist" element={<PizzasList/>} />

      </Route>):(<Route path="/admin/*" element={<Navigate to="/"/>}/>)}


      <Route path="/admin/pizzalist/editpizza/:id" element={<Updatepizzaslist/>}/>
   


      
    </Routes>
    </BrowserRouter>
    
    </>
  )
}
export default App ;








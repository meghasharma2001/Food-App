import { useEffect } from "react";
import {useDispatch , useSelector} from "react-redux"
import Error from "../../component/error"

import { Outlet,Link } from "react-router-dom";

import UsersList from "./usersList";


const AdminScreen = () =>{

    

    const dispatch = useDispatch();
    const currentuser = useSelector(state => state.loginReducerstore.locallogin)

    console.log(currentuser)

    useEffect(()=>{

        if(currentuser && !currentuser.isadmin)
        {
            

            window.location.href = "/"
        }
        
    },[])
    
    return(

        <>

        <h1 className="forflex">Admin panel</h1>
        
        {
            !currentuser &&   <Error error = "not registered"/>
        }

        <ul className="forflex adminp" style={{listStyle:"none ",  gap:"14vw"  ,margin:"4vw 8vw" , backgroundColor:"lightblue"  ,height:"6vh"}}>
         
            <li><Link to="userslist">Users List</Link></li>


            <li><Link to="/admin/pizzalist">Pizzas List</Link></li>

            <li><Link to="addnewpizza">Add New Pizza</Link></li>

             <li><Link to="orderslist">Orders List</Link></li> 

        </ul>

        <Outlet/>
 
 









        </>
    )
}

export default AdminScreen
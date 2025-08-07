import { useEffect } from "react";
import {useDispatch , useSelector} from "react-redux"
import {getAllUsersAdminAction , deleteUserAdminAction , logoutUserAllDevicesAdmin} from "../../../actions/regActions"

import Error from "../../component/error"
import Loading from "../../component/loading"
import "../../App.css"

import { RiDeleteBinFill } from "react-icons/ri";


const usersList = () =>{

    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(getAllUsersAdminAction())
    },[])

    const allusers = useSelector(state => state.getAllUsersByAdminReducer)

    const {loading , error , allusersAdmin} = allusers
    return(
        <>
        {loading && <Loading/>}
        {error && <Error error={error}/>}

        <h1 style={{textAlign:"center"}}>usersList</h1>

        <table style={{margin:"3vh 5vw" }}>

            <thead>
                <tr>
                    <th>User Id</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Registered Date</th>
                    <th>Delete User</th>
                    <th>LogoutUserFromAllDevices</th>
                </tr>
            </thead>

            <tbody>

                {
                    allusersAdmin && allusersAdmin.map((i) => {
                        return <tr>
                            <td>{i._id}</td> 
                            <td>{i.name}</td>
                            <td>{i.email}</td>
                             <td>{new Date(i.createdAt).toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }).split(", ")[0]}</td> 
                            <td> <RiDeleteBinFill onClick={()=>dispatch(deleteUserAdminAction(i._id))}   style={{color:"red"}}/></td>
                            <td><button style={{backgroundColor:"red" ,borderRadius:"9vh" , color:"white"}} onClick={()=>dispatch(logoutUserAllDevicesAdmin(i._id))}>Logout All</button></td>
                        </tr>
                    })
                }
                
            </tbody>
        </table>



        </>
    )
}

export default usersList
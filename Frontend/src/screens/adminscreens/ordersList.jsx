import { useDispatch, useSelector } from "react-redux"

import { getAllordersAdmin ,updateOrdersStatusAction } from "../../../actions/orderAction"

import Error from "../../component/error"
import Loading from "../../component/loading"




import { useEffect } from "react"

const ordersList = () =>{

    const dispatch = useDispatch()

    useEffect(()=>{
        dispatch(getAllordersAdmin())
    },[])

    const allordersState = useSelector(state => state.getAllAdminOrdersReducer)
    const {error , loading , adminorders} = allordersState


    return(
        <>
        
{loading && <Loading/>}
{error && <Error error={error} />}

        <h1 style={{textAlign:"center"}}>orders List</h1>

<div className="forflex">
        <table  style={{width:"90vw" }}>

        <thead>
             <tr>
                <th>Order Id</th>
                <th>Email</th>
                <th>User Id</th>
                <th>Amount</th>
                <th>Date & Time</th>
                <th>Status</th>
             </tr>
        </thead>

        <tbody>
            
{
    Array.isArray(adminorders) &&  adminorders.map((i)=>{

        return <tr>
            <td>{i.transactionId}</td>
            <td>{i.useremail}</td>
            <td>{i.userid}</td>
            <td>{i.orderAmount}</td>
            <td><span style={{marginRight:"2vw"}}>{new Date(i.createdAt).toLocaleDateString("en-IN")}</span>     <span>{new Date(i.createdAt).toLocaleTimeString("en-IN")}</span></td>

            <td>{i.isDelivered ? <span style={{color:"green"}}>Delivered </span>:
            
            <button className="regbtn" style={{marginLeft:"3px" , width:"5vw" , color:"red"}} onClick={()=>{dispatch(updateOrdersStatusAction(i._id))}}>Deliver</button>}</td>


        </tr>

    })
}
            

        </tbody>

        </table>
</div>
        </>
    )
}

export default ordersList
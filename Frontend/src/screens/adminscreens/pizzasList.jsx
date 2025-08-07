import { useEffect } from "react"
import Error from "../../component/error"
import Loading from "../../component/loading"
import Success from "../../component/success"
import { getAllpizzas } from "../../../actions/pizzaAPIaction"
import { TiDeleteOutline } from "react-icons/ti";
import { TiPencil } from "react-icons/ti";

import {deletePizzaById} from "../../../actions/pizzaAPIaction"


import {useDispatch , useSelector } from "react-redux"
import {Outlet, Link } from "react-router-dom"


const pizzasList = () =>{

    const dispatch = useDispatch()
    const Allpizza = useSelector(state => state.getAllPizzastore)

    const {loading , error , pizzareducer} = Allpizza


    useEffect(()=>{

        dispatch(getAllpizzas())

    },[])


    return(

        
        <>
        <h1 style={{textAlign:"center" , margin:"2vw"}}>pizzasList</h1>

        {loading && <Loading/>}
        { error && <Error error="something went wrong"/>}

<div className="forflex">

        <table>
            <thead >
                <tr  className="forflex">
                    <th>Name</th>
                    <th>Prices</th>
                    <th>Category</th>
                    <th>Actions</th>
                </tr>
            </thead>

            <tbody>
 
               {  pizzareducer && pizzareducer.length>0 && pizzareducer.map((i)=>{

             
            return <tr style={{display:"flex", justifyContent:"center" }}>

                    <td>{i.name}</td>

                    <td>
                        <p>Small : {i.prices[0]["small"]}</p>
                        <p>Medium : {i.prices[0].medium}</p>
                        <p>Large : {i.prices[0].large}</p>
                    </td>


                    <td>{i.category}</td>

                    <td style={{display:"flex" , flexDirection:"row" }}>
                        <p style={{ margin:"0vw 1vw" , }}><TiDeleteOutline style={{color:"red" ,width:"20px" , height:"50px"}} onClick={()=> dispatch(deletePizzaById(i._id))} /></p>


                        <p style={{ margin:"0vw 1vw"  }}> 


                            <Link to ={`/admin/pizzalist/editpizza/${i._id}`}> 

                            <TiPencil style={{width:"20px" , height:"50px"}}/>
                            
                            </Link>
                            
                            
                            </p>
                    </td>

            </tr>      

               })
            }
                       
            </tbody>
        </table>
<Outlet/>
        
</div>

       
        </>
    )
}

export default pizzasList



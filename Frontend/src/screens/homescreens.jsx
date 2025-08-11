
import Pizzacard from "../component/pizzacard"
import {useDispatch , useSelector} from "react-redux"
import { useEffect } from "react";

import {getAllpizzas} from "../../actions/pizzaAPIaction"
import Loading from "../component/loading"
import Error from "../component/error"



const homescreens= () =>{

    const dispatch = useDispatch() 

    useEffect(() =>{
        dispatch(getAllpizzas())
    }, [])

    const pizzastates = useSelector(state => state.getAllPizzastore)

    const {pizzareducer , error , loading} = pizzastates
    

   

    const userTypename = useSelector(state=>state.searchStatesReducer.usertyped)

 
    const searchitems = ((userTypename?.trim() === "") || (userTypename === undefined))? (pizzareducer) :(pizzareducer.filter((i)=>{
       return  i?.name?.toLowerCase().includes(userTypename?.toLowerCase())
    }))


    return(
        <>
      
    


 <div className="row mediaa " style={{marginTop:"30px"}}> 
{

    loading ? <h1><Loading/></h1> : error ? <Error error={error} />  : (

   searchitems.length>0 ? searchitems.map(val =>{
 
         return <div className="col-md-3 p-8  m-3" style={{ width:"31vw",display:"flex", justifyContent:"center"  }}  key={val._id}> 
         
            <div >
                <Pizzacard pizzaobj = {val} />
            </div>

        </div>
}) : <h1 style={{textAlign:"center" , color:"rgb(7, 216, 244)"}}>Could not find </h1>
)
}



</div>
        </>
    )
}                                     

export default homescreens



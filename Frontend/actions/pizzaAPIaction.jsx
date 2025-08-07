

export const getAllpizzas = () => async dispatch =>{

   
        dispatch({type:"GET_PIZZA_REQ"})

   

        try{
            const resp = await fetch("http://localhost:8000/api/getpizza")
            const jsonres = await resp.json()
         
            dispatch({type:"GET_PIZZA_SUCCESS" , payload: jsonres})
        }
        catch(e)
        {
                dispatch({type:"GET_PIZZA_FAILED" , payload : e.message})
        }
    }

export const getPizzaById = (id) => async dispatch =>{ 

     dispatch({type:"GET_PIZZA_BY_ID_REQ"})

    try{


        const jsonres = await fetch(`http://localhost:8000/api/getpizza/${id}`,{
            credentials:"include"
        })

        const objres = await jsonres.json()

     

         dispatch({type:"GET_PIZZA_BY_ID_SUCCESS" , payload:objres})
    }

    catch(e)
    {
      
         dispatch({type:"GET_PIZZA_BY_ID_FAILED" , payload:e})
        
    }
}


export const updatePizzaById = (updateditem)=> async dispatch => {

    dispatch({type:"UPDATE_PIZZA_BY_ID_REQ"})

    try{

        const jsonres = await fetch("http://localhost:8000/api/updatepizza",{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body: JSON.stringify({updateditem}),
            credentials:"include"
        })

        const objres = await jsonres.json()
        dispatch({type:"UPDATE_PIZZA_BY_ID_SUCCESS" , payload:objres})
        window.location.href = "/admin/pizzalist"

    }
    catch(e)
    {
     
        dispatch({type:"UPDATE_PIZZA_BY_ID_FAILED" , payload:e})
    }
}












export const addNewPizzaAction = (addnewPizzaobj) => async dispatch => { 

    dispatch({type:"STORE_NEW_PIZZA_REQ"})

    try{
        const resp = await fetch("http://localhost:8000/api/admin/addnewpizza" , {
            method:"POST",
            headers:{
                "Content-Type" : "application/json"
            },
            body: JSON.stringify({pizzaname: addnewPizzaobj.pizzaname   ,
                
                smallVPrice: addnewPizzaobj.smallVarientPrice , mediumVPrice : addnewPizzaobj.mediumVarientPrice , largeVPrice : addnewPizzaobj.largeVarientPrice , imgurl: addnewPizzaobj.imgurl , productdesc:addnewPizzaobj.productDesc , category : addnewPizzaobj.category}),
                credentials:"include"
        })


        const objres = await resp.json()
      

        if(objres.error){
            dispatch({type:"STORE_NEW_PIZZA_FAILED" , payload:objres.error})
        }
        else{
            dispatch({type:"STORE_NEW_PIZZA_SUCCESS" , payload:objres})
        }
 
        
    }
    catch(e)
    {

 dispatch({type:"STORE_NEW_PIZZA_FAILED" , error:"error"})
    }
    

}




export const deletePizzaById = (id)=> async dispatch => {

    dispatch({type:"DELETE_PIZZA_BY_ID_REQ"})

    try{

        const jsonres = await fetch(`http://localhost:8000/api/deletepizza/${id}`,{
            method:"DELETE",
            headers:{
                "Content-Type":"application/json"
            },
           

            credentials:"include"
        })

        const objres = await jsonres.json()
     

        if(objres.error){

           dispatch({type:"DELETE_PIZZA_BY_ID_FAILED" , payload:objres.error}) 
        }
        else{
        dispatch({type:"DELETE_PIZZA_BY_ID_SUCCESS" , payload:objres})
      
        }

        window.location.reload() 
    }
    catch(e)
    {
        
        dispatch({type:"DELETE_PIZZA_BY_ID_FAILED" , payload:e})
    }
}




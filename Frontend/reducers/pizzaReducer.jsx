
export const getAllPizzaReducer = (state={pizzareducer: []} , action) =>{

    switch(action.type){

        case "GET_PIZZA_REQ" :
            return {
                loading:true,
                ...state}

        case "GET_PIZZA_SUCCESS" :

            return { 
                 loading:false,
                pizzareducer : action.payload}

        case "GET_PIZZA_FAILED" : 
            return {
                 loading:false,
                 error : action.payload
                }

         default : return state
    }
}

export const getPizzaByIdReducer = (state={onepizza: []} , action) =>{

    switch(action.type){

        case "GET_PIZZA_BY_ID_REQ" : 
            return {
                loading:true,
                ...state} 

        case "GET_PIZZA_BY_ID_SUCCESS" :

            return { 
                 loading:false,
                onepizza : action.payload} 

        case "GET_PIZZA_BY_ID_FAILED" : 
            return {
                 loading:false,
                 error : action.payload
                }

         default : return state
    }
}




export const deletePizzaByIdReducer = (state={deletedpizza: []} , action) =>{

    switch(action.type){

        case "DELETE_PIZZA_BY_ID_REQ" : 
            return {
                loading:true,
                ...state}

        case "DELETE_PIZZA_BY_ID_SUCCESS" : 

            return { 
                 loading:false,
                deletedpizza : action.payload,
                success:true
            } 

        case "DELETE_PIZZA_BY_ID_FAILED" : 
            return {
                 loading:false,
                 error : action.payload
                }

         default : return state
    }
}




export const storeNewPizzaReducer = (state={storenewpizzaState: []} , action) =>{

    switch(action.type){

        case "STORE_NEW_PIZZA_REQ" : 
            return {
                loading:true,
                ...state} 

        case "STORE_NEW_PIZZA_SUCCESS" : 

            return { 
                 loading:false,
                storenewpizzaState : action.payload,
            success:true} 

        case "STORE_NEW_PIZZA_FAILED" : 
            return {
                 loading:false,
                 error : action.payload
                }

         default : return state
    }
}



export const updatePizzaByIdReducer = (state={updatedpizza: []} , action) =>{

    switch(action.type){

        case "UPDATE_PIZZA_BY_ID_REQ" : 
            return {
                loadingU:true,
                ...state} 

        case "UPDATE_PIZZA_BY_ID_SUCCESS" :

            return { 
                 loadingU:false,
                updatedpizza : action.payload,
                successU:true
            }

        case "UPDATE_PIZZA_BY_ID_FAILED" : 
            return {
                 loadingU:false,
                 errorU : action.payload
                }

         default : return state
    }
}



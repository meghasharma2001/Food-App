export const orderReducer = (state={} , action) =>{

    switch(action.type){
        case "ORDER_REQ":
            return {loading:true}
        case "ORDER_REQ_SUCCESS":
            return {laoding:false , success:true , order: action.payload}
            
        case "ORDER_REQ_FAIL":
            return {loading:false , error : action.payload}
        
        case "SCREEN_PAY_ID":
            return {loading:false , screenPayId:action.payload }

        default:
            return state
    }
}


export const paymentDetailReducer = (state = {} , action) =>{

    switch(action.type){

        case "PAYDETAIL_REQ":
            return {ploading:true}

        case "PAYDETAIL_REQ_SUCCESS":
            return {ploading:false , paymentinfo: action.payload , psuccess:true}

        case "PAYDETAIL_REQ_FAIL":
            return {ploading:false, perror: action.payload , psuccess:false}

        default:
            return state
    }
}

export const getAllUserOrdersReducer = (state={userorders:[]} , action) =>{ 
    switch(action.type)
    {
        case "get_all_user_orders_req":
            return {loading:true }

        case "get_all_user_orders_req_success":
            return {loading:false , userorders: action.payload , error:false}

        case "get_all_user_orders_req_fail":
            return {loading:false , error: action.payload }

        default:
            return state
    }
}

export const getAllAdminOrdersReducer = (state={} , action) =>{

    switch(action.type)
    {
        case "get_all_admin_orders_req":
            return {loading:true }

        case "get_all_admin_orders_success":
            return {loading:false , adminorders: action.payload}

        case "get_all_admin_orders_failed":
            return {loading:false , error:action.payload}

        default:
            return state
    }
}
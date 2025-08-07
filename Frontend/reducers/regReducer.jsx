const initialstate = {
    Loading:"",
    error:"",
    userdetail:""
}



export const registerReducer = (state= {} , action) =>{

        switch(action.type)
        {

            case "USER_REGISTER_REQ" : 
                return { loading: true}

            case "USER_REGISTER_SUCCESS":
                return { loading : false , success:true , userdetail : action.payload}

            case "USER_REGISTER_FAIL":
                return {loading : false , error : action.payload}

            default:
                return state
        }
}



export const loginReducer = (state={} , action)=>{

    switch(action.type)
    {
        case "USER_LOGIN_REQ":
            return {loading: true}

        case "USER_LOGIN_SUCCESS":
            return {loading:false , logindetail : action.payload} 

        case "USER_LOGIN_FAIL":
            return {loading:false , error: action.payload}

        default:
        return state
    }
}


export const getAllUsersByAdminReducer = (state={} , action)=>{

    switch(action.type)
    {
        case "GET_ALL_USERS_ADMIN_REQ":
            return {loading: true}

        case "GET_ALL_USERS_ADMIN_SUCCESS":
            return {loading:false , allusersAdmin: action.payload} 
            
        case "GET_ALL_USERS_ADMIN_FAILED":
            return {loading:false , error: action.payload}

        default:
        return state
    }
}


export const registerAction = (user) => async dispatch => {

    dispatch({type:"USER_REGISTER_REQ"})

    try{

        const resp = await fetch("https://food-app-zteg.onrender.com/api/auth/reg" ,{
            method : "POST",
            headers:{
                "Content-Type" : "application/json"
            },
            body : JSON.stringify({name:user.name , email:user.email , password: user.password}),
            credentials:"include"
        });

        const objres = await resp.json()

  

        if(objres.error){
            dispatch({type : "USER_REGISTER_FAIL" , payload:objres.error})
        }

        else{
             dispatch({type : "USER_REGISTER_SUCCESS" , payload:objres})
             window.location.href = "/login"
        }
       
    }
    catch(e)
    {
          dispatch({type : "USER_REGISTER_FAIL" , payload:e.message})
    }
}



export const loginAction = (user) => async dispatch =>{


    dispatch({type : "USER_LOGIN_REQ"})

    try{

        const resp = await fetch("https://food-app-zteg.onrender.com/api/auth/login" , {
            method : "POST",
            headers : {
                "Content-Type" : "application/json"
            },
            body: JSON.stringify({email : user.email , password: user.password}),
            credentials:"include"
        })

        const objres = await resp.json()

        if(objres.error){
            dispatch({type:"USER_LOGIN_FAIL" , payload: objres.error})
        
        }
        else{
           
        dispatch({type:"USER_LOGIN_SUCCESS" , payload: objres})

        localStorage.setItem("curruser" , JSON.stringify(objres.logincreds))

        window.location.href = "/"
        }
    }
    catch(e){
  

         dispatch({type:"USER_LOGIN_FAIL" , payload:"Something went wrong"})
    }
}




export const logoutuser = (id) => async dispatch =>{

    try{
        const deleteusers = await fetch(`https://food-app-zteg.onrender.com/api/auth/deleteUser/${id}`, {
            method:"DELETE",
            credentials:"include"
        })

        const objusers = await deleteusers.json()


     
    localStorage.removeItem("curruser");
    window.location.href = "/login"


    }

    catch(e)
    {
        console.log(e)
    }
}




export const getAllUsersAdminAction = () => async dispatch =>{

    dispatch({type:"GET_ALL_USERS_ADMIN_REQ"})

    try{
        const allusersadmin = await fetch("https://food-app-zteg.onrender.com/api/admin/getAllUsersAdmin", {credentials:"include"})

        const objusers = await allusersadmin.json()


   

        dispatch({type:"GET_ALL_USERS_ADMIN_SUCCESS" , payload:objusers})
    }

    catch(e){
      
        dispatch({type:"GET_ALL_USERS_ADMIN_FAILED" , payload:e})
    }

}



export const deleteUserAdminAction = (id) => async dispatch =>{

 

    try{
        const deleteusersadmin = await fetch(`https://food-app-zteg.onrender.com/api/admin/deleteuseradmin/${id}`, {
            method:"DELETE",
            credentials:"include"
        })

        const objusers = await deleteusersadmin.json()


  

        window.location.reload()

    }

    catch(e){
        console.log(e ,"delete user admin action")
   
    }

}


export const logoutUserAllDevicesAdmin = (id) =>async dispatch =>{

    try{
const resp = await fetch(`https://food-app-zteg.onrender.com/api/admin/logoutUserFromAllDevicesAdmin/${id}`,{
    method:"PUT",
    credentials:"include",
      headers: {
    "Content-Type": "application/json"
  }
})
const objres = await resp.json()

if(objres.error){
  
    alert(objres.error)
}

alert("user logged out")

    }
    catch(e)
    {
        console.log(e.message)
    }
}
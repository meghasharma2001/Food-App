import { useEffect, useState } from "react"
import "../App.css"
import { useDispatch , useSelector } from "react-redux"
import { loginAction } from "../../actions/regActions"

import Loading from "../component/loading"

import Error from "../component/error"


const Login = () =>{

    const [logintext , setLogin] = useState("")
    const [passwordtext , setpassword] = useState("")

    const dispatch = useDispatch()

    const loginst = useSelector(state => state.loginReducerstore)

    const {error , loading} = loginst





    const handlelogin = () =>{
        const user = {
            email : logintext,
            password : passwordtext
        }
        dispatch(loginAction(user))

       
    }
    return(
        <>

        {loading && <Loading/>}
        {error && <Error error={error}/>}


        <div style={{display:"flex" , flexDirection:"column" , justifyContent:"center", alignItems:"center" , margin:"2vh" , justifyItems:"center" , marginLeft:"30vw" , marginRight:"30vw"}}   className="shadow-lg p-3 mb-5 bg-white rounded">

        <h1 style={{textAlign:"center"}}>Login</h1>
            <input onChange={(e)=> setLogin(e.target.value)} type="text" placeholder="Enter your email" value={ logintext}  style={{margin:"1vh" , width:"28vw" }}/> 

            <input  onChange={(e) => setpassword(e.target.value)} type="text" placeholder="Password" value={passwordtext}  style={{margin:"1vh" , width:"28vw" }}/>

            <button onClick={handlelogin} style={{margin:"1vh" , backgroundColor:"orange"}}>Login</button>
            <br/>
            <a href="/register" style={{margin:"1vh" , color:"orange"}}>Click here to Register</a>
        </div>

        </>
    )
}

export default Login
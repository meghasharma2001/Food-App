import { useState } from "react"
import { registerAction } from "../../actions/regActions"
import {useDispatch , useSelector} from "react-redux"

import Success from "../component/success"

import Error from "../component/error"

import Loading from "../component/loading"


const Register = () =>{

const [name , setname] = useState("")
const [email , setemail] = useState("")
const [password , setpassword] = useState("")
const [cpassword , setcpassword] = useState("")

const dispatch = useDispatch()

const handlereg =(e)=>{

    e.preventDefault()
    const user = { 
        name , email , password
    }

    console.log(user)

    dispatch(registerAction(user))


    setname("")
    setemail("")
    setpassword("")
    setcpassword("")
}



const {error , loading , success} = useSelector(state=> state.registerReducerstore)



    return(
        <>

{ success && <Success success="registerd successfully"/> } 
{error && <Error error={error}/>}

{loading && <Loading />}



<div className="shadow-lg p-3 mb-5 bg-white rounded" style={{marginLeft:"20vw" , marginRight:"20vw"}}>

      <h1 style={{display:"flex" , justifyContent:"center" , fontWeight:"bolder" }}> Register </h1>




        <div className="row justify-content-center">
              
            <div className="col-md-6">

                <div style={{display:"flex" , justifyContent:"center" , flexDirection:"column",gap:"1vh" , margin:"2vh" }}>


                    <input type="text" placeholder="Name" value={name} onChange={(e) => setname(e.target.value)} required />

                    <input type="text" placeholder="email" value={email} onChange={(e) => setemail(e.target.value)} required/>

                    <input type="text" placeholder="password" value={password} onChange={(e) => setpassword(e.target.value)} required/>

                    <input type="text" placeholder="confirm password" value={cpassword} onChange={(e) => (setcpassword(e.target.value)) }
                    
                    style={{borderColor: password && ((password === cpassword)? "green" : "red" )}}required/>


                    <button onClick={(e)=>handlereg(e)} className="regbtn" disabled= {(password !== cpassword)? true : false}  style={{width:"80px" , }}>Register</button>

                    <div style={{display:"flex" , justifyContent:"flex-start" , alignItems:"center" , }}><a href="/login" style={{ color:"orange" , }}>Click here to Login</a></div>


                </div>
            </div>
        </div>
      </div>  
        </>
    )
}

export default Register
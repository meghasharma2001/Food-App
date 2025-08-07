import { useEffect } from "react";
import {useState} from  "react"

const Error = ({error}) => {

    const [iserror , seterror] = useState(false)


useEffect(()=>{

  if(error)
  {
  seterror(true)
    const timer = setTimeout(()=>{
          seterror(false)
    },2000)

    return () => clearTimeout(timer)


  }

},[error])
           
console.log(iserror)
    return (
        <>{
        iserror && <div class="alert alert-danger" role="alert"  style={{margin:"2vw"}}>
                {error}
            </div>}
        </>
    )
}

export default Error;


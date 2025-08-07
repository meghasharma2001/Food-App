


import { useSelector, useDispatch } from "react-redux"
import { placeOrder } from "../../actions/orderAction"
import { paymentfetch } from "../../actions/orderAction"
import { useState } from "react"
import Error from "../component/error"
import Success from "../component/success"
import Loading from "../component/loading"


const Razorpays = (props) =>{

    const {subtotal} = props
    const dispatch = useDispatch()

    const [payinfobtn , setpayinfobtn] = useState(false)

    const [payclick , setpayclick] = useState(false)


    const orderstate = useSelector(state => state.orderReducer);
    const {loading ,error , order , screenPayId , success} = orderstate


    const paymentstate = useSelector(state => state.paymentDetailReducer)
    const {ploading , perror , paymentinfo, psuccess} = paymentstate



    
    const [shippingDetails , setshippingDetails] = useState({username:"", email:"" , street:""  , pincode:"" , city:"" , country:""})
    
    

    const handlepay = (e ) =>{
        e.preventDefault()
        const shippingCopy = {...shippingDetails}
       

        dispatch(placeOrder(subtotal , shippingCopy))

        setshippingDetails({name:"" , email:"" , street:""  , pincode:"" , city:"" , username:""})
    }

    return(
        <>
      
{screenPayId && <Success success="your order placed successfully"/>}



{
screenPayId && (<>
        <div style={{display:"flex" , flexDirection:"row" , gap:"10px" , margin:" 4vh 0vh", }}><h4>Your payment ID :</h4> <span>{screenPayId}</span></div>


            <button type="submit" style={{backgroundColor:"orange" , borderRadius:"10px", width:"13vw" , marginBottom:"3vh"}} onClick={(e)=>{dispatch(paymentfetch(e , screenPayId));setpayinfobtn(!payinfobtn)} }  className="medbtn">get your payment details</button>


   

        {
    paymentinfo && payinfobtn && (<>
        
            <p>Amount: {paymentinfo.amount}</p>
            <p>Currency: {paymentinfo.currency}</p>
            <p>Payment Method: {paymentinfo.method}</p>
         <p>Status: {paymentinfo.status}</p> 
         </>
    )
    
}
        </>)


}


  
          <button onClick={()=>setpayclick(!payclick)} style={{margin:"2vw"}} className="regbtn medbtn">Pay {subtotal}</button>

      { payclick  &&<div>
        
        <input type="text"  placeholder="enter name"  onChange={(e) => setshippingDetails({...shippingDetails , username:e.target.value})}/>

        <input type="text" placeholder="enter Email" name="email" onChange={(e)=> setshippingDetails({...shippingDetails , email:e.target.value})}  /> 

        <input  type="text" placeholder="enter Street" name="street" onChange={(e)=> setshippingDetails({...shippingDetails ,street: e.target.value})} />

        <input  type="text" placeholder="enter City" name="city" onChange={(e)=> setshippingDetails({...shippingDetails , city: e.target.value})} />

           <input  type="text" placeholder="enter Country" name="country" onChange={(e)=> setshippingDetails({...shippingDetails , country: e.target.value})} />

        <input  type="text" placeholder="enter Pincode" name="pincode" onChange={(e)=> setshippingDetails({...shippingDetails ,pincode: e.target.value})} />
        
      <button onClick={(e)=>{handlepay(e) ; setpayclick(!payclick)}} style={{margin:"2vw"}} className="regbtn">Submit</button>
        
       </div>}
        </>
    )
}

export default Razorpays




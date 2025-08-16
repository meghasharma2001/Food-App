

const loadScript = (src) => {

    return new Promise((resolve) => {
        const script = document.createElement("script"); 

        script.src = src  

        script.onload = () => { resolve(true) }

        script.onerror = () => { resolve(false) }

        document.body.appendChild(script)

    })
}











export const placeOrder = (subtotal, shippingDetails) => async (dispatch, getState) => {

    

    const currentUser = getState().loginReducerstore.locallogin

    const cartItems = getState().addTocartStore.mycartItems



    dispatch({ type: "ORDER_REQ" })


    try {
      




        const jsonres = await fetch("https://food-app-zteg.onrender.com/api/razorpay/orders", {
            method: "POST",
            maxBodyLength: "Infinity",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ amount: subtotal * 100, currency: "INR", currentUser, cartItems, shippingDetails }),
            
          
            credentials:"include"
        
        })


        const objres = await jsonres.json(); 

        const newamount = objres.amount



        if (!objres.error && !(objres.error === "already paid for this item")) {

            const handleRazorpayScreen = async (newamount) => {

                const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js")
                if (!res) {
                    alert("error at razorpay screen loading " , res)
                    return
                }

                const options = {

                    key: "rzp_test_2DAZ2fJA3AqDxV",
                    amount: newamount * 100,
                    currency: "INR",
                    name: "PizzaApp",
                    description: "get All types of pizza here",
                    order_id: objres.orderid, 

                    notes: {
                        shipping_name: shippingDetails.username,
                        shipping_country: shippingDetails.country,
                        shipping_street: shippingDetails.street,
                        shipping_pincode: shippingDetails.pincode,
                        shipping_email: shippingDetails.email,
                        shipping_city: shippingDetails.city,
                    },


                    handler: async function (newres) {
                     
                        const { razorpay_payment_id, razorpay_order_id, razorpay_signature } = newres

                        
                    

                        const verifyres = await fetch("https://food-app-zteg.onrender.com/api/razorpay/verify-payment", {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json"
                            },
                            body: JSON.stringify({
                                razorpay_order_id, razorpay_payment_id, razorpay_signature, subtotal, currentUser, cartItems,

                                shippingAdd: objres.orderdetails.notes, objres
                            }) ,
                        

                             
                          credentials:"include"
        
                        })



                        const varifyobj = await verifyres.json()
               
                        if (varifyobj.status === "success") {
                            alert("payment successfully stored and varified")
                        }
                        else {
                            alert("payment failed and verification failed")
                        }


                      
                      dispatch({ type: "SCREEN_PAY_ID", payload: newres.razorpay_payment_id }); 



                    },


                    modal: {

                        ondismiss: function () {
                            console.log("User closed payment popup without paying");
                            alert("payment close")
                        
                        },

                    },

                    prefill: {
                        name: shippingDetails.name,
                    
                    },

                    theme: {
                        color: "olive"
                    }
                }

                const paymentobj = new window.Razorpay(options)

                paymentobj.open()

            }


            handleRazorpayScreen(newamount) 


            dispatch({ type: "ORDER_REQ_SUCCESS", payload: objres })
        }

        else {
            dispatch({ type: "ORDER_REQ_FAIL", payload: objres.error })
        }
    }


    catch (e) {
        console.log("error in order ")
        dispatch({ type: "ORDER_REQ_FAIL", payload: e })
    }
}






export const paymentfetch = (e, screenPayId) => async (dispatch) => {

    e.preventDefault()

   

    const paymentid = screenPayId
    dispatch({ type: "PAYDETAIL_REQ" })

    try {

        const paydetail = await fetch(`https://food-app-zteg.onrender.com/api/razorpay/payment/${paymentid}`,{credentials:"include"});

        const objres = await paydetail.json()


        dispatch({ type: "PAYDETAIL_REQ_SUCCESS", payload: objres })
    }

    catch (e) {
 
        dispatch({ type: "PAYDETAIL_REQ_FAIL", payload: e })
    }

}




 
export const getAllUserOrders = () => async (dispatch, getState) => {

    dispatch({ type: "get_all_user_orders_req" })


    try {
        const curruser = getState().loginReducerstore.locallogin
      
       

        const userid = curruser._id


        const jsonres = await fetch(`https://food-app-zteg.onrender.com/api/razorpay/getAllOrders/${userid}`, {
            method:"GET",
            credentials:"include"
        })

        const objres = await jsonres.json()
    

        if(!jsonres.ok || objres.error){
     
              dispatch({ type: "get_all_user_orders_req_fail" , payload:objres.error})
        }
        else{
             dispatch({ type: "get_all_user_orders_req_success", payload: objres })
         
    }
    }

    catch(e) {
        dispatch({ type: "get_all_user_orders_req_fail" , error:e.name})
  
    }
}








export const getAllordersAdmin = () => async dispatch => {
    dispatch({ type: "get_all_admin_orders_req" })

    try {
        const resp = await fetch("https://food-app-zteg.onrender.com/api/admin/getAllOrdersAdmin",{
            credentials:"include"
        });

        const objres = await resp.json()

        

        dispatch({ type: "get_all_admin_orders_success", payload: objres })
    }
    catch (e) {
       
        dispatch({ type: "get_all_admin_orders_failed", payload: e })
    }
}






export const updateOrdersStatusAction = (id) => async dispatch => {



    try{

        const resp = await fetch(`https://food-app-zteg.onrender.com/api/admin/updateorderStatus/${id}`,{
            method:"PATCH",
            credentials:"include"
        }
        )

        const objres = await resp.json()

     

       
        const neworders = await fetch("https://food-app-zteg.onrender.com/api/admin/getAllOrdersAdmin",{credentials:"include"})

        const neword = await neworders.json()
  

        dispatch({ type: "get_all_admin_orders_success", payload: neword })

    }
    catch(e)
    {
    
         dispatch({ type: "get_all_admin_orders_failed", payload: e })
     
    }
}


















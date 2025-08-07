import { v4 as uuidv4 } from 'uuid';



const curruser = localStorage.getItem("curruser")
const curruser1 = curruser ? JSON.parse(curruser):null
export const addTocartaction = (pizzaobj , userquantity , uservarient) => (dispatch, getState) =>{

   
if(curruser1){
    var cartItem = {

        name : pizzaobj.name, 
        _id : pizzaobj._id,
        image : pizzaobj.image,
        varient : uservarient,
        quantity:userquantity, 

        prices : pizzaobj.prices, 

        cartItemPrice : pizzaobj.prices[0][uservarient] * userquantity ,

        uniqueCartKey : uuidv4()
    }

   

        dispatch({type:"ADD_TO_CART" , payload:cartItem}) 




const cartItems = getState().addTocartStore.mycartItems 


localStorage.setItem(`cartItems_${curruser1._id}` , JSON.stringify(cartItems))



}
else{
    alert("Login for AddToCart Items")
}

}



export const deleteFromCart = (pizzaobj) => (dispatch,getState) => {

if(curruser1){

dispatch({type:"DELETE_FROM_CART" , payload:pizzaobj});



const newcartitems = getState().addTocartStore.mycartItems

localStorage.setItem(`cartItems_${curruser1._id}` , JSON.stringify(newcartitems))

}
else{
    alert("Login for delete from cart")
}





}

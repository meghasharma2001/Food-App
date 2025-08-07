



import { createStore , applyMiddleware}  from "redux"

import { combineReducers } from "redux"
import {thunk} from "redux-thunk"
import {composeWithDevTools} from "@redux-devtools/extension"


import { addToCartReducer } from "../reducers/cartReducer"

import { loginReducer, registerReducer , getAllUsersByAdminReducer } from "../reducers/regReducer"

import { orderReducer , getAllUserOrdersReducer , paymentDetailReducer , getAllAdminOrdersReducer} from "../reducers/orderReducer"

import {getPizzaByIdReducer , storeNewPizzaReducer , updatePizzaByIdReducer , deletePizzaByIdReducer , getAllPizzaReducer} from "../reducers/pizzaReducer"

import {searchStatesReducer} from "../reducers/searchReducer"

const finalReducer = combineReducers({
    getAllPizzastore : getAllPizzaReducer,
    addTocartStore : addToCartReducer,
    registerReducerstore : registerReducer,
    loginReducerstore : loginReducer,

    orderReducer:orderReducer,
    paymentDetailReducer : paymentDetailReducer,

    getAllUserOrdersReducerstore : getAllUserOrdersReducer,

    storeNewPizzaReducer : storeNewPizzaReducer, 


    getPizzaByIdReducer,

    updatePizzaByIdReducer,
    deletePizzaByIdReducer,

    getAllAdminOrdersReducer,

    getAllUsersByAdminReducer,

    searchStatesReducer

})

console.log(finalReducer)


const curruser = localStorage.getItem("curruser")? JSON.parse(localStorage.getItem("curruser")) : null


const localCartItems = curruser && localStorage.getItem(`cartItems_${curruser._id}`)? JSON.parse(localStorage.getItem(`cartItems_${curruser._id}`)):[]




const initialState = {
 

    addTocartStore:{ 
       mycartItems: localCartItems 
    },

    loginReducerstore : {


      locallogin : curruser
    }


   
}

const composeEnhancers = composeWithDevTools({})


const store = createStore(finalReducer , initialState , composeEnhancers(applyMiddleware(thunk)))


export default store ;




export const addToCartReducer = (state={mycartItems:[]} , action) =>{



    switch(action.type){

        case "ADD_TO_CART" :

        const itemAlredyExist = state.mycartItems.find( (val )=> val._id === action.payload._id) 


        if(itemAlredyExist){ 


            return{
                mycartItems: state.mycartItems.map((val) => val._id === action.payload._id ? action.payload : val ) 
            }
        }

        else{
            return { ...state , mycartItems:[...state.mycartItems , action.payload]}
        }


        case "DELETE_FROM_CART" :
            return {mycartItems: state.mycartItems.filter((val) => val._id !== action.payload._id) }

        default:
            return state
    }

}

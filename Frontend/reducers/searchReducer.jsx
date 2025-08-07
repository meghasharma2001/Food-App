export const searchStatesReducer = (state={usertyped:""} , action) =>{

    switch(action.type){
    case "SEARCH_ITEM":
        return {usertyped :action.payload }

    default:
        return state

    }
}

export const searchAction = (text) => dispatch =>{
    dispatch({type:"SEARCH_ITEM" , payload:text})
}
import { useState } from "react"
import { addNewPizzaAction } from "../../../actions/pizzaAPIaction"
import {useDispatch , useSelector} from "react-redux"
import Error from "../../component/error"
import Loading from "../../component/loading"
import Success from "../../component/success"


const addNewPizza = () =>{

    const [name , setName] = useState("")
    const [varientPrices , setVarientPrice] = useState({small:"" , medium:"" , large:""})

    const [imageurl , setimageurl] = useState("")
    const [productDescription , setProductDescription] = useState("")
    const [category , setcategory] = useState("")

    console.log(name , varientPrices , imageurl , productDescription)


    const dispatch = useDispatch()

    const handleSubmit =(e)=>{
     e.preventDefault() 
        console.log("hello s")

        const addnewPizzaobj = {
            pizzaname : name ,
            smallVarientPrice: varientPrices.small,
            mediumVarientPrice: varientPrices.medium,
            largeVarientPrice: varientPrices.large,
            imgurl : imageurl,
            productDesc:productDescription,
            category:category
        }

        console.log(addnewPizzaobj , "addnewpizzaob")
        dispatch(addNewPizzaAction(addnewPizzaobj))
    }

    const addpizzastate = useSelector(state => state.storeNewPizzaReducer)

    const {storenewpizzaState , error , loading , success} = addpizzastate



    return(
        <>
        
        {loading && <Loading/>}

        {error && <Error error={error}/>}

        {success && <Success success="New item added successfully " style={{width:"50vw"}}/>}



        <h1 style={{textAlign:"center"}}>add new pizzas list</h1>



        <form onSubmit={(e)=>handleSubmit(e)} >

            <input type="text" placeholder="enter pizza's name" value={name} onChange={(e)=>setName(e.target.value)}/>

            <input type="text" placeholder="small varient price" value={varientPrices.small} onChange={(e)=>setVarientPrice({...varientPrices,small: +e.target.value})}/>

            <input type="text" placeholder="medium varient price" value={varientPrices.medium} onChange={(e)=> setVarientPrice({...varientPrices , medium: +e.target.value})}/>

            <input type="text" placeholder="large varient price" value={varientPrices.large} onChange={(e)=> setVarientPrice({...varientPrices , large: +e.target.value})}/>

            <input type="text" placeholder="Enter image URL" value={imageurl} onChange={(e)=> setimageurl(e.target.value)} />

            <input type="text" placeholder="Enter product description" value={productDescription} onChange={(e)=> setProductDescription(e.target.value)} />

            <input type="text" value={category} placeholder="Category" onChange={(e)=> setcategory(e.target.value)}/>

<button className="addPbtn medbtn">Submit</button>

        </form>

        </>
    )
}

export default addNewPizza
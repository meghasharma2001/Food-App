import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { getPizzaById } from "../../../actions/pizzaAPIaction"
import { useEffect, useState } from "react"
import {updatePizzaById} from "../../../actions/pizzaAPIaction"

import Error from "../../component/error"
import Loading from "../../component/loading"
import Success from "../../component/success"

const editItem = () => { 
    const { id } = useParams() 
    const dispatch = useDispatch()



   




    const [name, setName] = useState("")

    const [varientPrices, setVarientPrice] = useState({ small:0, medium:0, large:0})

    const [imageurl, setimageurl] = useState("")

    const [productDescription, setProductDescription] = useState("")

    const [category, setcategory] = useState("")




    useEffect(() => {
        dispatch(getPizzaById(id))
    }, [])

    
     const getPizzaByIdstate = useSelector(state => state.getPizzaByIdReducer)

    const {error , loading , onepizza , success} = getPizzaByIdstate


    

    const updatedItemState = useSelector(state => state.updatePizzaByIdReducer)

      const {errorU , loadingU, updatedpizza , successU} = updatedItemState




useEffect(()=>{


    if(!(onepizza.length<=0)){

        setName(onepizza.name)
        setVarientPrice({small: onepizza.prices[0].small, medium:onepizza.prices[0].medium, large: onepizza.prices[0].large})
        setimageurl(onepizza.image)
        setcategory(onepizza.category)
        setProductDescription(onepizza.description)

    }

    
},[onepizza])

const handlesubmit = (e)=>{
    e.preventDefault();

    const updateditem = {
        _id : onepizza._id,
        name , 
        small : varientPrices.small,
        medium : varientPrices.medium,
        large : varientPrices.large,
        imgurl : imageurl,
        category,
        description: productDescription
    }


    dispatch(updatePizzaById(updateditem))




}

    return (
        <>
           
{loading || loadingU && <Loading/>}
{error && <Error error={error}/>}
{errorU && <Error error={errorU}/>}
{successU && <Success success="Item updated successfully"/>}


            <p style={{textAlign:"center" , fontSize:"30px"}}>Edit <strong>{onepizza.name}</strong></p>


            <form onSubmit={(e)=>handlesubmit(e)}>

                <input type="text" placeholder="enter pizza's name" value={name} onChange={(e) => setName(e.target.value)} />

                <input type="text" placeholder="small varient price" value={varientPrices.small} onChange={(e) => setVarientPrice({ ...varientPrices, small:Number(e.target.value) })} />

                <input type="text" placeholder="medium varient price" value={varientPrices.medium} onChange={(e) => setVarientPrice({ ...varientPrices, medium:Number(e.target.value )})} />

                <input type="text" placeholder="large varient price" value={varientPrices.large} onChange={(e) => setVarientPrice({ ...varientPrices, large:Number(e.target.value) })} />

                <input type="text" placeholder="Enter image URL" value={imageurl} onChange={(e) => setimageurl(e.target.value)} />

                <input type="text" placeholder="Enter product description" value={productDescription} onChange={(e) => setProductDescription(e.target.value)} />

                <input type="text" value={category} placeholder="Category" onChange={(e) => setcategory(e.target.value)} />

                <button className="addPbtn">Submit</button>

            </form>

        </>
    )
}

export default editItem



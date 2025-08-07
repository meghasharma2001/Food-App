import { useState } from "react"
import Modal from "react-bootstrap/Modal"
import {useDispatch} from "react-redux"
import { addTocartaction } from "../../actions/cartActions"
const pizzacard = ({pizzaobj} ) =>{


    const [userquantity , setuserQuan] = useState(1)
    const [uservarient , setuserVarient] = useState("small")

    const [show , setshow] = useState(false)

    const dispatch = useDispatch()

    const handleshow = () =>{
        setshow(true)
    }

    const handleClose =() =>{
        setshow(false)
    }


    const addToCart = () =>{

        
        dispatch(addTocartaction(pizzaobj , userquantity , uservarient))
    }

    return(

        <>
        <div style={{display:"flex", justifyContent:"center" , flexDirection:"row" , flexWrap:"wrap"   }} className=" shadow-lg p-3 mb-5 bg-body-tertiary rounded "  >

            <div >


<div onClick={handleshow}>
             <h4>{pizzaobj.name}</h4>

             <img src={pizzaobj.image} alt="Loading..." height="200vh" width="300vw" style={{margin:"30px 0px"}}/>

</div>


            <div style={{display:"flex", justifyContent:"space-between" , flexDirection:"row"}}>

                <div>
                <h5 >Varients:</h5>

                <select style={{width:"8vw" , borderRadius:"10px"}} value={uservarient} onChange={(e)=> setuserVarient(e.target.value)}>
                    
                    {
                        pizzaobj.varients.map((val) => {

                            return <option value={val} >{val} </option>

                        })
                    }
                </select>
                </div>


                <div>
                    <h5>Quantity:</h5>

                    <select style={{width:"8vw" , borderRadius:"10px"}} value={userquantity} onChange={(e)=>setuserQuan(e.target.value)}>
                        

                        {

                            [...Array(10).keys()].map((obj , index) =>{

                                return <option value={index+1}>{index+1}</option>
                            })
                        }
                    </select>
                </div>
            </div>


<div style={{display:"flex", flexDirection:"row" , justifyContent:"space-around" , margin:"10px"}}>

    <div className="w-100">
       


        <h5> Price: {
        (pizzaobj.prices[0][uservarient]) * (userquantity )
        
        }Rs/-</h5>
    </div>
    
    <div className="w-100">

        <button style={{borderRadius:"20px" , background:"Lightyellow", marginLeft:"20px" , color:"skyBlue" , fontWeight:"bolder"}} onClick={()=>addToCart()}> 
            Add to cart</button>
    </div>
    
</div>


<Modal show={show} onClick={handleClose} style={{ display:"flex" , justifyContent:"center"   }}>


        <Modal.Header closeButton >
          <Modal.Title>{pizzaobj.name}</Modal.Title>
      
        </Modal.Header>

        <Modal.Body>
            <img src={pizzaobj.image} alt="Loading.." height="250vh" width="400vw" style={{ margin:"2vw ", borderRadius:"20px"
            }} />
            <h5>{pizzaobj.description}</h5>
        </Modal.Body>

        <Modal.Footer>
          <button onClick={handleClose}>Close</button>
        </Modal.Footer>

      </Modal>
</div>

</div>


   
       
        
        </>
    )
}

export default pizzacard

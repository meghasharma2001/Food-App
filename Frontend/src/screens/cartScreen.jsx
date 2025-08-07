
import { useSelector, useDispatch } from "react-redux"
import { addTocartaction, deleteFromCart } from "../../actions/cartActions";

import Loading from "../component/loading"
import Error from "../component/error"
import Success from "../component/success"

import Razorpays from "../component/razorpayPayment";

const Cartscreen = () => {

    const cartstate = useSelector(state => state.addTocartStore.mycartItems)

    const dispatch = useDispatch();
    console.log(cartstate)

    const orderreducer = useSelector(state => state.orderReducer)

    const { loading, error, success } = orderreducer

    const total = cartstate?.reduce((acc, currval) => {
        return acc + currval.cartItemPrice;
    }, 0)







    return (
        <>


            <h1 style={{ display: "flex", justifyContent: "center" }}>My Cart</h1>

            {loading && <Loading />}
            {error && <Error error={error} />}


            <div  className="cartmed carts">

                <div>

                    <hr style={{ width: "50vw", marginLeft: "5vw" }} />


                    {

                        cartstate?.map((val) => (
                            <>
                                <div style={{ display: "flex", justifyContent: "flex-start", alignItems: "center", flexDirection: "row", margin: "0vh 5vw" }}>

                                    <div style={{ width: "25vw" }} >

                                        <h5 style={{ display: "flex", flexWrap: "wrap", margin: "15px 10px" }}>{val.name} [{val.varient}]</h5>

                                        <h5 style={{ margin: "15px 10px" }} >Price: {val.quantity} * {val.prices[0][val.varient]} = {val.cartItemPrice}</h5>


                                        <h5 style={{ margin: "15px 10px" }}> Quantity:

                                            <i class="fa-solid fa-minus " onClick={() => (val.quantity <= 1 ? alert("can't decrease quantity less than 1") : dispatch(addTocartaction(val, +val.quantity - 1, val.varient)))}

                                                style={{ color: "red", margin: "10px" }} ></i>

                                            {val.quantity}

                                            <i class="fa-solid fa-plus" style={{ color: "lightgreen", margin: "10px" }} onClick={() => val.quantity >= 10 ? alert("can't increase quantity more than 10"):(dispatch(addTocartaction(val, +val.quantity + 1, val.varient)))}></i>  </h5>

                                    </div>



                                    <div style={{ width: "25vw", marginLeft: "16vh", display: "flex", flexDirection: "row", alignItems: "center" }}>

                                        <img src={val.image} alt="Loading..." height="100vh" width="150vw" />

                                        <i class="fa-solid fa-trash " style={{ color: "red", marginLeft: "15px" }} onClick={() => dispatch(deleteFromCart(val))}></i>

                                    </div>




                                </div>
                                <hr className="carthr hrmed" />


                            </>
                        ))

                    }
                </div>

                <div >
                    <h1 style={{ margin: "4vh 0px" }}>  SubTotal = {total} Rs /-</h1>

                    <Razorpays subtotal={total} />

                </div>

            </div>





        </>
    )
}

export default Cartscreen


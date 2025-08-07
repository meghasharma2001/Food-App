import { useDispatch, useSelector } from "react-redux"
import { getAllUserOrders } from "../../actions/orderAction"
import { useEffect } from "react"
import Loading from "../component/loading"
import Error from "../component/error"

import "../App.css"
const orderspage = () => {
  const dispatch = useDispatch()

  useEffect(() => {

    dispatch(getAllUserOrders())

  }, [])

  const allorders = useSelector(state => state.getAllUserOrdersReducerstore)

  const { loading, error, userorders } = allorders


  const utcDateStr = "2025-07-25T22:18:25.240+00:00";






  return (
    <>
      <h1 style={{ textAlign: "center" }}> MY ORDERS </h1>
      {loading && <Loading />}
      {error && <Error error={error} />}


      <div>
        {Array.isArray(userorders) && userorders.length > 0 && userorders.map((i) => {
          return <div className="ordermed">

            <div style={{ display: "grid", gridTemplateRows: "13vw", gridTemplateColumns: "25vw 25vw 25vw", margin: "3vw", justifyContent: "center", backgroundColor: "lightblue", height: "32vh" }}  >


              <div style={{ textAlign: "left" }} > <h3 style={{ margin: "2vh 0px" }}>orders</h3>
                <div>{
                  i.orderItems.map((item) =>
                    (<div> {item.name} [{item.varient}] * {item.quantity} = {item.cartItemPrice}</div>)
                  )
                }</div>
              </div>


              <div style={{ textAlign: "left" }}>

                <h3 style={{ margin: "2vh 0px" }}>Address</h3>

                <p >Street:{i.shippingAddress.shipping_street}</p>
                <p>City:{i.shippingAddress.shipping_city}</p>
                <p>Country:{i.shippingAddress.shipping_country}</p>
                <p>Pincode:{i.shippingAddress.shipping_pincode}</p>



              </div>


              <div style={{ textAlign: "left" }}>


                <h3 style={{ margin: "2vh 0px" }}>Order Info</h3>

                <p>Price : {i.orderAmount}</p>

                <p ><span style={{ paddingRight: "2vw" }}>

                  Date : {new Date(i.createdAt).toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }).split(", ")[0]}</span>


                  <span>Time : {new Date(i.createdAt).toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }).split(", ")[1]}</span></p>

                <p>Payment Id : {i.transactionId}</p>

                <p>Order Status : {i.isDelivered ? <span style={{ color: "darkgreen" }}>Delivered</span> : <span style={{ color: "red" }}>Not Delivered</span>}</p>


              </div>



            </div>
            <hr className="orderhr"/>
          </div>
        })}
      </div>




    </>
  )

}
export default orderspage
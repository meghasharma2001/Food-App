const express = require("express")
const {orderfun , paymentfetch , paymentVarify , getAllUserOrders} = require("../controllers/razorpaycontroller")

const varifytoken = require("../middleware/varifytoken")

const router = express.Router()

router.post("/orders", varifytoken , orderfun)

router.get("/payment/:paymentid" , varifytoken,paymentfetch)

router.post("/verify-payment" ,varifytoken, paymentVarify)

router.get("/getAllOrders/:userid" ,varifytoken, getAllUserOrders)

module.exports = router
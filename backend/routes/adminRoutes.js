const express = require("express");
const {addPizza} = require("../controllers/pizzafuns")

const {getAllOrdersadmin , updateDelivaryStatus} = require("../controllers/razorpaycontroller")

const {getAllUsersAdmin , deleteUserAdmin , logoutUserFromAllDevicesAdmin} = require("../controllers/regController")

const varifytoken = require("../middleware/varifytoken")


const router = express.Router()

router.post("/addnewpizza" , varifytoken,addPizza);

router.get("/getAllOrdersAdmin" ,varifytoken, getAllOrdersadmin)

router.patch("/updateorderStatus/:id" , varifytoken,updateDelivaryStatus)

router.get("/getAllUsersAdmin" , varifytoken,getAllUsersAdmin)

router.delete("/deleteuseradmin/:id" ,varifytoken, deleteUserAdmin)

router.put("/logoutUserFromAllDevicesAdmin/:id" , logoutUserFromAllDevicesAdmin)

module.exports = router
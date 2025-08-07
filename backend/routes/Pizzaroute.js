const express = require("express") 

const {getPizza , getpizzaById , updatePizzaByIdAdmin , deletepizza} = require("../controllers/pizzafuns")
const varifytoken = require("../middleware/varifytoken")

const router = express.Router()

router.get("/getpizza" , getPizza)

router.get("/getpizza/:id" ,varifytoken, getpizzaById) 

router.post("/updatepizza" ,varifytoken, updatePizzaByIdAdmin)

router.delete("/deletepizza/:id" ,varifytoken, deletepizza)
module.exports = router
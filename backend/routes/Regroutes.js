const express = require("express");
const {regiController , logincontroller , deleteUser} = require("../controllers/regController")

const varifytoken = require("../middleware/varifytoken")
 

const router = express.Router()


router.post("/reg" , regiController )
router.post("/login" , logincontroller)
router.delete("/deleteUser/:id" ,varifytoken, deleteUser) 

module.exports = router
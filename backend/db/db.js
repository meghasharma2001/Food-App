

const mongoose = require("mongoose")



var mongoURL = "mongodb://localhost:27017/PizzaDB"

mongoose.connect(mongoURL )
var db = mongoose.connection ;  
db.on("connected" , () =>{ 
    console.log("db connected")
})

db.on("error" , ()=>{
    console.log("db not connected")
})

module.exports = mongoose 
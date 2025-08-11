
require("dotenv").config()
const mongoose = require("mongoose")

const user = process.env.MONGO_USER
const password = process.env.MONGO_PASSWORD

var mongoURL = `mongodb+srv://${user}:${password}@foodcluster.nsixzdd.mongodb.net/`

mongoose.connect(mongoURL )
var db = mongoose.connection ;  
db.on("connected" , () =>{ 
    console.log("db connected")
})

db.on("error" , ()=>{
    console.log("db not connected")
})

module.exports = mongoose 
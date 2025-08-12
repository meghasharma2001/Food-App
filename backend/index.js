const express = require("express")
const db = require("./db/db")
const dbmodel = require("./db/pizzamodel")

const pizzaroutes = require("./routes/Pizzaroute")
const regRoutes = require("./routes/Regroutes")
const razorpayroute = require("./routes/razorpayroute")

const adminRoutes = require("./routes/adminRoutes")
const Razorpay = require("razorpay")


const cors = require("cors")
const app = express();
const cookieParser = require("cookie-parser")

const { v4: uuidv4 } = require('uuid'); 
const jwt = require("jsonwebtoken")

require("dotenv").config()


app.use(cookieParser())

app.use(express.json()) 

app.use(cors({

 origin: "https://food-app-mu-nine.vercel.app",
  methods: ['GET','POST','PUT','DELETE','PATCH'],
  //  methods: 'GET,POST,PUT,DELETE',
  credentials: true 
}))



app.use("/api", pizzaroutes)

app.use("/api/auth", regRoutes)

app.use("/api/razorpay" , razorpayroute) 

app.use("/api/admin" , adminRoutes)






app.listen(8000, (req, res) => {
  console.log("server run on port 8000")
})






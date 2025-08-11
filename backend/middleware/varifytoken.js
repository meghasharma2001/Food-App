const jwt = require("jsonwebtoken")
const regmodel = require("../db/regmodel")
require("dotenv").config()

const varifytoken = async(req,res,next) => {

    try{
    const token = req.cookies?.Cookiename

    if(!token)
    {
          res.status(401).json({error:"jwt expired"})
          return 
    }

    const varifytoken = jwt.verify(token , process.env.JWT_SECRET)

    if(!varifytoken)
    {
          return res.json({error:"jwt expired"})
    }

    const userid = varifytoken.userid;

    const user = await regmodel.findById({_id:userid})

    if(!user || !user.tokenv.includes(token)) 
    {
        return res.json({error:"jwt expired"})
    }


    req.user = user;
    req.token = varifytoken

 

    next()
    }
    catch(e)
    {
        console.log("error in varify token")
        res.json({error:"jwt expired"})
    }


}

module.exports = varifytoken
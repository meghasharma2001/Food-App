const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const regmodel = require("../db/regmodel")
require("dotenv").config()



const validator = require("validator");
module.exports.regiController = async (req, res) => {

    try {
        const { name, email, password } = req.body



        if (!name || !email || !password) {
            return res.status(401).json({ error: "give all fields" })
        }

           console.log(validator.isEmail(email), "my validator ");
        
                  if (!validator.isEmail(email)) {
    return res.status(400).json({ error: "Invalid Email" });
  }

        if (password.length < 6) {
            return res.status(401).json({ error: "password must be 6 char long" })
        }
        const alreadyreg = await regmodel.findOne({ email })

        if (alreadyreg) {
            return res.json({ error: 'user already registered' })
        }
        const hashpass = await bcrypt.hash(password, 10)

        const newuser = await regmodel.create({ name, email, password: hashpass })





        const tokenvar = jwt.sign({ userid: newuser._id.toString() }, process.env.JWT_SECRET, { expiresIn: "1h" })

        const cookieval = res.cookie("Cookiename", tokenvar, {
            maxAge: 5 * 60 * 60 * 1000,
            httpOnly: true,
            sameSite: "None",
            secure: true




        })




        if (!cookieval || !tokenvar) {
            return res.send("not get cookie")
        }


        newuser.tokenv.push(tokenvar)
        await newuser.save()




        return res.json({
            "success": true,
            "newuser": newuser,
            "cookie": req.cookies.Cookiename

        })

    }
    catch (e) {
        return res.json({ error: "can't register" })
    }

}




module.exports.logincontroller = async (req, res) => {

    try {


        const { email, password } = req.body

        if (!email || !password) {
            return res.json({ error: "enter both fields" })
        }

        const issemail =   validator.validate(email)

        
           console.log(validator.isEmail(email), "my validator ");
        
                  if (!validator.isEmail(email)) {
    return res.status(400).json({ error: "Invalid Email" });
  }



        if (password.length < 6) {
            return res.status(401).json({ error: "password must be 6 char long" })
        }

        const loginuser = await regmodel.findOne({ email })

        if (!loginuser) {

            return res.json({"error":"first register" })
        }




        const resu = await bcrypt.compare(password, loginuser.password)


        if (!resu) {
            return res.json({ error: "invalid credentials" })
        }



        const token = jwt.sign({ userid: loginuser._id.toString() }, process.env.JWT_SECRET, { expiresIn: "1h" })

        res.cookie("Cookiename", token, {

            maxAge: 5 * 60 * 60 * 1000,
            sameSite: "None",
            httpOnly: true,
            secure: true
        })

        loginuser.tokenv.push(token)
        await loginuser.save()




        const curruser = {
            name: loginuser.name,
            email: loginuser.email,
            isadmin: loginuser.isadmin,
            _id: loginuser._id
        }




        res.json({
            success: true,
            logincreds: curruser,
            tokenc: req.cookies.Cookiename,
           
        })

        const tokendata = jwt.verify(token, "mysecretkey")


    }

    catch (e) {

        return res.json({ error: "can't login" })
    }
}










module.exports.getAllUsersAdmin = async (req, res) => {

    try {
        const data = await regmodel.find({});



        if (!data) {
            return res.json({ error: "no users found" })
        }
        res.send(data)


    }
    catch (e) {

        res.json({ error: "can't get user details" })
    }

}




module.exports.deleteUserAdmin = async (req, res) => {

    try {

        const { id } = req.params;

        const deleteduser = await regmodel.findByIdAndDelete({ _id: id })

        if (!deleteduser) {
            return res.json({ error: "can't delete user " })
        }


        res.send(deleteduser)


    }
    catch (e) {

        res.json({ error: "can't delete user details" })

    }

}




module.exports.logoutUserFromAllDevicesAdmin = async (req, res) => {
    try {
        const { id } = req.params;

        const user = await regmodel.findById({ _id: id })

        if (!user) {
            return res.json({ error: "user not found" })
        }

        user.tokenv = []

        await user.save()

        return res.json({ success: "user logout from all devices" })
    }
    catch (e) {
        return res.json({ error: "can't logout user" })
    }
}




module.exports.deleteUser = async (req, res) => {
    try {

        const { id } = req.params

        const user = await regmodel.findById({ _id: id })

        if (!user) {
            return res.json({ error: "user not found" })
        }

        res.clearCookie("Cookiename")

        req.user.tokenv = req.user.tokenv.filter((i) => { i !== req.token })

        await req.user.save()

        res.json({ logout: "success", user })
    }
    catch (e) {
        return res.json({ error: "can't delete user details" })
    }
}










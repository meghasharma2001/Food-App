const mongoose = require("mongoose")
const validator = require("email-validator")
const regSchema = new mongoose.Schema({
    name : {
        type:String,
        require:true
    },
    email : {
        type:String,
        require:true,
         validate: {
      validator: (v) => validator.validate(v),
      error: "Invalid mail ",
    },
    },
    password : {
        type:String,
        require:true,
        minlength:[6, "password must be 6 char long"]
    },

    isadmin:{
        type:Boolean,
        require:true,
        default:false
    },
    tokenv:[]
},

{
    timestamps : true
}

)

const regm = mongoose.model("Regmodel" , regSchema)

module.exports = regm ;
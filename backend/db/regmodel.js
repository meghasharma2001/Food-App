const mongoose = require("mongoose")

const regSchema = new mongoose.Schema({
    name : {
        type:String,
        require:true
    },
    email : {
        type:String,
        require:true
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
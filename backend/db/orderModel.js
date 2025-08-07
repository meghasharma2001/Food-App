const mongoose = require("mongoose")


const orderSchema = new mongoose.Schema({

    username:{
        type:String,
        required: true
    },
     useremail:{
        type:String,
        required: true
    },
     userid:{ 
        type:String, 
        required: true
    },
    orderItems:[],

    shippingAddress: {
        type: Object
    },

    orderAmount:{
        type: Number,
        required :true
    },

    paymentstatus:{
        type:String
    },

   isDelivered : { 
        type: Boolean,
        required:true,
        default:false
    },

    transactionId : {
        type:String,

    }

},
{
    timestamps:true 
}
)

const ordermodel = mongoose.model("OrderModel" , orderSchema)

module.exports = ordermodel


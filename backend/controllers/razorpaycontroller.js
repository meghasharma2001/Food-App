const Razorpay = require("razorpay")
const crypto = require("crypto")
const ordermodel = require("../db/orderModel")
require("dotenv").config()

const KeyID_KeySecret = new Razorpay({
    key_id: process.env.KEY_ID,
    key_secret: process.env.KEY_SECRET
})




module.exports.orderfun = async (req, res) => {

    const { amount, currency, currentUser, cartItems, shippingDetails } = req.body




    if (!currentUser) {
        return res.json({ error: "first register to order something" })
    }

    else if (!amount || !currency || !currentUser || !cartItems || !shippingDetails) {
        return res.json({ error: "enter all the fields for order" })
    }


    const paiditemids = await ordermodel.find({ userid: currentUser._id, paymentstatus: "paid" })
    const cartItemsUniqueKey = paiditemids.flatMap(o =>
        o.orderItems.map(item => item.uniqueCartKey.toString())
    );




    const alreadypaid = cartItems.every((i) => cartItemsUniqueKey.includes(i.uniqueCartKey.toString()))



    if (!alreadypaid) {

        const options = {
            amount: req.body.amount,
            currency: req.body.currency,
            receipt: "receipt_" + Date.now(),
            payment_capture: 1,

            notes: {

                shipping_name: shippingDetails.username,
                shipping_street: shippingDetails.street,
                shipping_pincode: shippingDetails.pincode,
                shipping_email: shippingDetails.email,
                shipping_city: shippingDetails.city,
                shipping_country: shippingDetails.country,

            },
        }



        try {

            const createorder = await KeyID_KeySecret.orders.create(options)



            res.json({
                orderdetails: createorder,
                orderid: createorder.id,
                currency: createorder.currency,
                amount: createorder.amount / 100
            })
        }


        catch (e) {

            res.json({ error: e.error })
        }


    }

    else {

        res.send({ error: "already paid for this item" })
    }

}











module.exports.paymentfetch = async (req, res) => {

    const { paymentid } = req.params

    try {
        const paydetails = await KeyID_KeySecret.payments.fetch(paymentid)


        if (!paydetails) {
            return res.status(500).json({ error: "can't fetch payment detail" })
        }



        res.json({
            status: paydetails.status,
            method: paydetails.method,
            amount: paydetails.amount / 100,
            currency: paydetails.currency
        })
    }
    catch (e) {
        res.json(500).json("failed to fetch payment")

    }
}






module.exports.paymentVarify = (req, res) => {
    try {

        const { razorpay_order_id, razorpay_payment_id, razorpay_signature, subtotal, currentUser, cartItems, shippingAdd, objres } = req.body;



        const hmac = crypto.createHmac("sha256", process.env.KEY_SECRET)

        hmac.update(razorpay_order_id + "|" + razorpay_payment_id);

        const generatesign = hmac.digest("hex")

        if (generatesign === razorpay_signature) {





            const neworder = ordermodel.create({
                username: currentUser.name,
                useremail: currentUser.email,
                userid: currentUser._id,
                orderItems: cartItems,
                shippingAddress: shippingAdd,
                orderAmount: subtotal,
                paymentstatus: "paid",

                transactionId: razorpay_payment_id
            }
            )

            res.json({ status: "success", neworder })




        }
        else {
            res.json({ status: "fail" })
        }

    }
    catch (e) {
        console.log("payment not-verify")
    }
}








module.exports.getAllUserOrders = async (req, res) => {

    try {
        const { userid } = req.params;
        const resp = await ordermodel.find({ userid }).sort({ _id: -1 });
        if (!resp.length > 0) {

            return res.status(404).json({ error: "Can't find order" })
        }

        res.send(resp)
    }
    catch (e) {

        res.send(e)

    }
}





module.exports.getAllOrdersadmin = async (req, res) => {

    try {

        const data = await ordermodel.find({}).sort({ _id: -1 });


        res.send(data)
    }
    catch (e) {


        res.json({ error: e })
    }
}









module.exports.updateDelivaryStatus = async (req, res) => {
    try {

        const { id } = req.params;

        const data = await ordermodel.findByIdAndUpdate({ _id: id }, { isDelivered: true }, { new: true })

        if (!data) {
            throw new Error({ error: "can't update delivery status" })
        }

        res.send(data)


    }

    catch (e) {

        res.send({ error: e })
    }
}











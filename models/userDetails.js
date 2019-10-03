const mongoose = require("mongoose");

const userDetails = new mongoose.Schema({

    name: String,
    email: {
        type : String,
        unique : true,
        required : true
    },
    password: String,
    registration_date : {
        type : Date,
        default : Date.now,
    },

    order_list : [{

        order_status : {
            type : String,
            default: "Pending"
        },
        order_date : String,
        order_no : String,
        billing_address: String,
        contact_no : String,
        alternative_no: String,

        order_items : [{
            plantName : String,
            plantPrice : String,
            totalBill : String,
            type : String,
        }]
    }]
})

module.exports = mongoose.model("userDetails", userDetails);
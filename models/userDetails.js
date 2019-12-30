const mongoose = require("mongoose");

const userDetails = new mongoose.Schema({

    fname: String,
    lname: String, 
    email: {
        type : String,
        unique : true,
        required : true
    },
    mobile: String,
    registration_date : {
        type : Date,
        default : Date.now,
    },

    order_list : [{

        order_status : {
            type : String,
            default: "Pending"
        },
        order_date : {
            type : Date,
            default: Date.now
        },
        order_no : String,
        address: String,
        city: String,
        state: String,
        zip: String,
        notes: String,
        subtotal: String,
        shipping: String,
        totalAmt: String,
        order_items : [{
            plantName : String,
            plantPrice : String,
        }]
    }]
})

module.exports = mongoose.model("userDetails", userDetails);
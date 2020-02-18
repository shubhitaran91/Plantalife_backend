const mongoose = require("mongoose");

const registers = new mongoose.Schema({

    fname: String,
    password:String,
    email: {
        type : String,
        unique : true,
        required : true
    },
   
    registration_date : {
        type : Date,
        default : Date.now,
    },

})

module.exports = mongoose.model("registers", registers);
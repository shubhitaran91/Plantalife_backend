const mongoose = require("mongoose");

const plantsDetails = new mongoose.Schema({

        plant_no : {
            type : Number,
            unique : true,
        },
        plant_type : String,
        plant_name : String,
        plant_price : String,
        plant_photo : String,
        plant_status : String,
        plant_desc : String,

});

module.exports = mongoose.model("plantsDetails", plantsDetails);
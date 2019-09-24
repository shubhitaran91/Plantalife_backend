var plantsDB = require("../models/plantsDetails");
const isEmpty = require('is-empty');
const fs = require('fs');
var log4js = require('log4js');
var log = log4js.getLogger("app");

module.exports = {
    updatePlantData: updatePlantData,
}

async function updatePlantData(req, callback) {
    var plant_no = req.body.plant_no;
    var plant_type = req.body.plant_type;
    var plant_name = req.body.plant_name;
    var plant_price = req.body.plant_price;
    var plant_status = req.body.plant_status;
    var plant_photo = "aasd";
    // plant_photo = req.file.path;

    if (!plant_no ||
        !plant_price ||
        !plant_photo ||
        !plant_status ||
        !plant_type ||
        !plant_name
    ) {
        callback({
            "message": "Please Provide all Information"
        })
    }
    else {

    await plantsDB.findOneAndUpdate({"plants.plant_no": plant_no},{
        $set : {
            "plants":{
                plant_price : plant_price,
                plant_status : plant_status,
                plant_photo : plant_photo,
                plant_type : plant_type,
                plant_name : plant_name
            }
        }
    },{ new: true })
            .then((plantData)=> {
                console.log(plantData);
                if(isEmpty(plantData)){
                    callback({
                        "message": "No Data Found"
                    })
                }else{
                    callback({
                        "message": "Plant Data Updated Succesfully"
                    })
                }
               
            })
            .catch((error) => {
                console.log(error);
                log.info(`Api name :- updatePlantData -- ${error}`);
                callback({
                    "message": "Oops something went wrong."
                })
            })
        }
}
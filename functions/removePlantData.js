var plantsDB = require("../models/plantsDetails");
const isEmpty = require('is-empty');
const fs = require('fs');
var log4js = require('log4js');
var log = log4js.getLogger("app");

module.exports = {
    removePlantData: removePlantData,
}

async function removePlantData(req, callback) {
    var plant_no = req.body.plant_no;

    if(!plant_no){
        callback({
            "message": "Please Provide Plant Number"
        })
    }else{

    await plantsDB.findOneAndDelete({"plant_no": plant_no})
            .then((plantData)=> {
                // console.log(plantData);
                    callback({
                        "message": "success"
                    })
            })
            .catch((error) => {
                console.log(error);
                log.info(`Api name :- removePlantData -- ${error}`);
                callback({
                    "message": "error"
                })
            })
        }
}
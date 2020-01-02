var plantsDB = require("../models/plantsDetails");
const isEmpty = require('is-empty');

module.exports = {
    getPlantData,
    getPlantDataByID,
    getAllPlantData

}

async function getPlantData(req,callback) {

    var plant_type = req.body.plant_type;


    await plantsDB.find({'plant_type':plant_type})
        .then((plantData) => {
            if (isEmpty(plantData)) {
                callback({
                    "message": "No Data Found"
                })
            } else {
                callback({
                    "message": plantData
                })
            }
        })
}




async function getPlantDataByID(req,callback) {

    var plant_no = req.body.plant_no

    await plantsDB.findOne({'plant_no':plant_no})
        .then((plantData) => {
            if (isEmpty(plantData)) {
                callback({
                    "message": "No Data Found"
                })
            } else {
                callback({
                    "message": plantData
                })
            }
        })
}

async function getAllPlantData(callback) {

    await plantsDB.find()
        .then((plantData) => {
            if (isEmpty(plantData)) {
                callback({
                    "message": "No Data Found"
                })
            } else {
                callback({
                    "message": plantData
                })
            }
        })
}
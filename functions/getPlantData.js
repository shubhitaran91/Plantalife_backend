var plantsDB = require("../models/plantsDetails");
const isEmpty = require('is-empty');

module.exports = {
    getAllPlantData,
    getPlantDataByID

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
                    "message": plantData[0].plants
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
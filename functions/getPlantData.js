var plantsDB = require("../models/plantsDetails");
const isEmpty = require('is-empty');

module.exports = {
    getPlantData: getPlantData,
}

async function getPlantData(callback) {

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

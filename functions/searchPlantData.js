var plantsDB = require("../models/plantsDetails");
const isEmpty = require('is-empty');

module.exports = {
    searchPlantData: searchPlantData,
}

async function searchPlantData(req,callback) {
    var plant_no = req.body.plant_no;

    if(!plant_no){
        callback({
            "message": "Please Provide Plant Number"
        })
    }else{

    await plantsDB.find()
        .then((plantData) => {
            if (isEmpty(plantData)) {
                callback({
                    "message": "No Data Found"
                })
            } else {
                var flag=0;
                var result = {};
                plantData = plantData[0].plants;
                for(var i = 0; i < plantData.length; i++){
                    if(plant_no == plantData[i].plant_no){
                        flag=1;
                        result = plantData[i];
                    }
                }
                if(flag!= 0){
                    callback({
                        "message": result
                    })
                }else{
                    callback({
                        "message": "Provided Plant Number not Found"
                    })
                }
                
            }
        })
    }
}

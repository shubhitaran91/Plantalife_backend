var plantsDB = require("../models/plantsDetails");
const isEmpty = require('is-empty');
const fs = require('fs');
var log4js = require('log4js');
var log = log4js.getLogger("app");

module.exports = {
    savePlantData: savePlantData,
}


async function savePlantData(req, callback) {
    var plant_type = req.body.plant_type;
    var plant_name = req.body.plant_name;
    var plant_price = req.body.plant_price;
    var plant_status = req.body.plant_status;
    var plant_photo = req.file.path;

    if (!plant_type ||
        !plant_name ||
        !plant_price ||
        !plant_photo ||
        !plant_status
    ) {
        callback({
            "message": "Please send all Information"
        })
    }
    else {

        let rawdata = fs.readFileSync('./plant_no.json');
        var plant_no = JSON.parse(rawdata).plant_no;

        var plantReq = {
            plant_no: plant_no,
            plant_type: plant_type,
            plant_name: plant_name,
            plant_price: plant_price,
            plant_photo: plant_photo,
            plant_status : plant_status
        }

        let plantData = await plantsDB.find();

        if (isEmpty(plantData)) {
            var plantObj = new plantsDB();
            await plantObj.save(function (error, result) {
                if (error) {
                    callback({
                        "message": "Some Error Occured"
                    })
                } else {
                    plantsDB.findOneAndUpdate({ "_id": result.id }, {
                        $push: {
                            plants: [plantReq]
                        }

                    }, { new: true })
                        .then((result) => {
                            console.log(result)
                            plant_no = plant_no + 1;
                            let series = {
                                "plant_no": plant_no
                            }
                            let data = JSON.stringify(series);
                            fs.writeFileSync('./plant_no.json', data);
                            // log.info(`Api name :- personalInfo -- ${error}`);
                            callback({
                                "message": "Plant Data Saved Successfully"
                            })
                        })
                        .catch((error) => {
                            console.log(error);
                            log.info(`Api name :- uploadPlantData -- ${error}`);
                            callback({
                                "message": "Oops something went wrong."
                            })
                        })
                }
            })
        } else {
            await plantsDB.findOneAndUpdate({ "_id": plantData[0].id }, {
                $push: {
                    plants: [plantReq]
                }

            }, { new: true })
                .then((result) => {
                    console.log(result)
                    plant_no = plant_no + 1;
                    let series = {
                        "plant_no": plant_no
                    }
                    let data = JSON.stringify(series);
                    fs.writeFileSync('./plant_no.json', data);
                    callback({
                        "message": "Plant Data Saved Successfully"
                    })
                })
                .catch((error) => {
                    console.log(error)
                    log.info(`Api name :- uploadPlantData -- ${error}`);
                    callback({
                        "message": "Oops something went wrong."
                    })
                })
        }
    }
}
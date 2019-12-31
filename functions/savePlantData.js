var plantsDB = require("../models/plantsDetails");
const isEmpty = require("is-empty");
const fs = require("fs");
var log4js = require("log4js");
var log = log4js.getLogger("app");
const image2base64 = require("image-to-base64");

module.exports = {
  savePlantData: savePlantData
};

async function savePlantData(req, callback) {
  var plant_type = req.body.plant_type;
  var plant_name = req.body.plant_name;
  var plant_price = req.body.plant_price;
  var plant_status = req.body.plant_status;
  var plant_desc =  req.body.plant_desc;
  var plant_photo = "xyz";
  plant_photo = req.file.path;

  if (
    !plant_type ||
    !plant_name ||
    !plant_price ||
    !plant_photo ||
    !plant_status ||
    !plant_desc
  ) {
    callback({
      message: "Please Provide all Information"
    });
  } else {
    plant_photo = await image2base64(plant_photo);
    // let rawdata = fs.readFileSync("./plant_no.json");
    // var plant_no = JSON.parse(rawdata).plant_no;
    let plant_no = Math.floor(100 + Math.random() * 900);

    var plantReq = {
      plant_no,
      plant_type,
      plant_name,
      plant_price,
      plant_photo,
      plant_status,
      plant_desc
    };

    var plantObj = new plantsDB(plantReq);

    await plantObj.save(function (error, result) {
      if (error) {
        console.log("error",error);
        callback({
          message: "error"
        });
      } else {
        // console.log(result);
        // plant_no = Math.floor(100 + Math.random() * 900);
        // let series = {
        //   plant_no: plant_no
        // };
        // let data = JSON.stringify(series);
        // fs.writeFileSync("./plant_no.json", data);
        // log.info(`Api name :- personalInfo -- ${error}`);
        callback({
          message: "success"
        });
      }
    });
  }
}

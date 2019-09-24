var multer = require('multer');
var savePlantData = require("./functions/savePlantData");
var getPlantData = require("./functions/getPlantData");
var removePlantData = require("./functions/removePlantData");
var updatePlantData = require("./functions/updatePlantData");
var searchPlantData = require("./functions/searchPlantData");

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + "-" + Math.random().toString(36).substring(2, 15) + "-" + file.originalname)
    }
})

var upload = multer({ storage: storage });

var log4js = require('log4js');
var log = log4js.getLogger("app");

module.exports = router => {

    // Upload Plant Image

    router.post('/uploadPlantData', upload.single('photo'), async (req, res) => {
        savePlantData.savePlantData(req, function (error, result) {
            if (error) {
                log.info(`Api name :- uploadPlantData -- ${error}`);
                res.send(error)
            }
            else {
                log.info("Api name :- uploadPlantData -- success");
                res.send(result)
            }
        })
    })

    // Get Plant Data

    router.get('/getPlantData', function (req,res){
        getPlantData.getPlantData(function( error, result){
            if (error) {
                log.info(`Api name :- getPlantData -- ${error}`);
                res.send(error)
            }
            else {
                log.info("Api name :- getPlantData -- success");
                res.send(result)
            }
        })
    });

    // Remove Plant Data

    router.post('/removePlantData', function(req,res){
        removePlantData.removePlantData(req, function (error, result){
            if (error) {
                log.info(`Api name :- removePlantData -- ${error}`);
                res.send(error)
            }
            else {
                log.info("Api name :- removePlantData -- success");
                res.send(result)
            }
        })
    });

    router.post('/updatePlantData',upload.single('photo'), function(req,res){
        updatePlantData.updatePlantData(req,function(error,result){
            if (error) {
                log.info(`Api name :- updatePlantData -- ${error}`);
                res.send(error)
            }
            else {
                log.info("Api name :- updatePlantData -- success");
                res.send(result)
            }
        })
    });

    router.post('/searchPlantData',function(req,res){
        searchPlantData.searchPlantData(req, function (error, result){
            if (error) {
                log.info(`Api name :- searchPlantData -- ${error}`);
                res.send(error)
            }
            else {
                log.info("Api name :- searchPlantData -- success");
                res.send(result)
            }
        })
    });
}
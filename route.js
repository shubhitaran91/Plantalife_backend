var multer = require('multer');
var savePlantData = require("./functions/savePlantData");
var getPlantData = require("./functions/getPlantData");

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
}
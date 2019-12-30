var multer = require('multer');
var savePlantData = require("./functions/savePlantData");
var getPlantData = require("./functions/getPlantData");
var removePlantData = require("./functions/removePlantData");
var updatePlantData = require("./functions/updatePlantData");
var searchPlantData = require("./functions/searchPlantData");
var register = require("./functions/register");
var login = require("./functions/login");
var checkout = require("./functions/checkout");

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + "-" + file.originalname)
    }
})



var upload = multer({ storage: storage });

var log4js = require('log4js');
var log = log4js.getLogger("app");

module.exports = router => {

    router.get('/',(req,res)=>{
        res.send('Welcome to Planta Life');
    });


    // Upload Plant Image 

    router.post('/uploadPlantData',upload.single('photo'), async (req, res) => {
        savePlantData.savePlantData(req, function (result) {
            
                console.log('result',result)
                log.info(`Api name :- uploadPlantData -- ${result}`);
                res.send(result)
        });
    });

    // Get Plant Data

    router.post('/getPlantData', function (req,res){
        getPlantData.getPlantData(req,function(result){
            
                log.info(`Api name :- getPlantData -- ${result}`);
                // res.send(error)           
                // log.info("Api name :- getPlantData -- success");
                res.send(result)
            
        })
    });

    // Remove Plant Data

    router.post('/removePlantData', function(req,res){
        removePlantData.removePlantData(req, function (error, result){
                log.info(`Api name :- removePlantData -- ${result}`);
                // res.send(error)
                // log.info("Api name :- removePlantData -- success");
                res.send(result)
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

    router.post('/register', function(req,res){
        register.register(req, function(error,result){
            if (error) {
                log.info(`Api name :- register -- ${error}`);
                res.send(error)
            }
            else {
                log.info("Api name :- register -- success");
                res.send(result)
            }
        })
    });

    router.post('/login',function(req,res){
        login.login(req, function(error,result){
            if (error) {
                log.info(`Api name :- login -- ${error}`);
                res.send(error)
            }
            else {
                log.info("Api name :- login -- success");
                res.send(result)
            }
        })
    });

    router.post('/shopDetails',function(req,res){
        getPlantData.getPlantDataByID(req, function(result){
            
                log.info(`Api name :- shopDetails -- ${result}`);
                // res.send(error)
            
            
                // log.info("Api name :- shopDetails -- success");
                res.send(result)
            
        })
    });

    router.post('/checkout',function(req,res){
        checkout.checkout(req.body,function(result){
            
                log.info(`Api name :- checkout -- ${result}`);
                // res.send(error)
                // log.info("Api name :- checkout -- success");
                res.send(result)
        });
    });
}
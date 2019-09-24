var multer = require('multer');
var savePlantData = require("./functions/savePlantData");

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + "-" + Math.random().toString(36).substring(2, 15) + "-" + file.originalname)
    }
})

var upload = multer({ storage: storage });

module.exports = router => {

    // Upload Plant Image

    router.post('/uploadPlantData', upload.single('photo'), async (req, res) => {
        savePlantData.savePlantData(req, function (error, result) {
            if (error) {
                // log.info(`Api name :- newApplication -- ${error}`);
                res.send(error)
            }
            else {
                // log.info("Api name :- newApplication -- success");
                res.send(result)
            }
        })
    })
}
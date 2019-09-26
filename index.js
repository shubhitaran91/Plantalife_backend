
var cors=require("cors")
var express = require('express');
var bodyParser = require("body-parser");
const router = express.Router();
var app = express();
const mongoose = require("mongoose");
var log4js = require('log4js');

log4js.configure({
  appenders: { app: { type: 'file', filename: 'logs/app.log' } },
  categories: { default: { appenders: ['app'], level: 'info' } }
});
var log = log4js.getLogger("app");



mongoose
  .connect(
    "mongodb://jatin:jatin123@ds131139.mlab.com:31139/plantalife",
    { useNewUrlParser: true }
  )
  .then(() => {
    log.info("Connected to MongoDB");
    console.log("Connected to MongoDB")})
  .catch(err => {
    log.info("Oops something went wrong", err);
    console.log("Oops something went wrong", err)});

app.use(cors());
app.use(express.static('public'));
app.use('/public', express.static(__dirname + '/public'))
console.log(__dirname + '/public');

const port = process.env.PORT || 5000
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

require('./route')(router);
app.use('/', router);

app.listen(port, () => {
  log.info("Server listening on port " + port);
 console.log("Server listening on port " + port);
});
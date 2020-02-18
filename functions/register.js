
var nodemailer = require('nodemailer');
var userDB = require("../models/register");


module.exports = {
    register
}

function register(req, callback) {
    var email = req.body.email;
    var password = req.body.password;
    var fname = req.body.fname;

    if(
        !email ||
        !password ||
        !fname 
    ){
        callback({
            "message": "Please provide all Information"
        })    
    }

    var userObj = {
        email,
        password,
        fname
    }

    const userDetails = new userDB(userObj)

    var transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: 'plantalifee@gmail.com',
            pass: 'planta12'
        }
    });
    userDetails.save(function (error) {
        console.log(error);
        if (error) {
            if (error.code == 11000) {
                callback({
                    "message": "Your email id is already registered with us."
                })
            }
        }
        else {
            transporter.sendMail({
                from: "plantalifee@gmail.com",
                to: email,
                subject: "Plantalife Registration",
                text: "Dear " + name + ",\n\n" +
                    "Thanking you for the registration in plantaLife \n\n"
            },
                function (error, info) {
                    if (error) {
                        console.log(error)
                    }
                    else {
                        console.log("Email sent: " + info.response);
                    }
                })
            callback({
                "message": "Success",
            })
        }
    });
}
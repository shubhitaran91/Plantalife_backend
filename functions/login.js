var userDB = require("../models/userDetails");
const isEmpty = require('is-empty');


module.exports = {
    login
}

async function login(req,callback){
    var email = req.body.email;
    var password = req.body.password;

    if(
        !email ||
        !password
    ){
        callback({
            "message": "Please provide all Information"
        })
    }

    await userDB.find({"email" : email})
    .then((userDetails) => {
        if(isEmpty(userDetails)){
            callback({
                "message": "Email is not registered with us, please register your email"
            })
        }else{
            if(userDetails[0].password == password){
                callback({
                    "message" : "success",
                    "userInfo" : userDetails
                })
            }else{
                callback({
                    "message" : "Incorrect Password"
                })
            }
            
        }
    })
}
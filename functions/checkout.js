var userDB = require("../models/userDetails");
const isEmpty = require('is-empty');

async function checkout(req,callback){
    let fname = req.fname;
    let lname = req.lname;
    let email = req.email;
    let mobile = req.mobile
    let address = req.address;
    let city = req.city;
    let state = req.state;
    let zip = req.zip;
    let notes = req.notes
    let products = req.products;
    let subtotal = req.subtotal;
    let shipping = req.shipping;
    let totalAmt = req.totalAmt;

    let reqObject = {
        fname,
        lname,
        email,
        mobile,
        order_list : [{
            order_no,
            address,
            city,
            state,
            zip,
            notes,
            subtotal,
            shipping,
            totalAmt
        }]
    }

await userDB.find({"email" : email})
    .then((userDetails) => {
        if(isEmpty(userDetails)){

        }
    })
}

module.exports = {
    checkout
}
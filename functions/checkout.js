var userDB = require("../models/userDetails");
const isEmpty = require('is-empty');
var nodemailer = require('nodemailer');
async function checkout(req, callback) {
    let fname = req.fname;
    let lname = req.lname;
    let email = req.email;
    let mobile = req.mobile
    let address = req.address;
    let city = req.city;
    let state = req.state;
    let zip = req.zip;
    let notes = req.notes
    let products = [];
    products = req.products
    let subtotal = req.subtotal;
    let shipping = req.shipping;
    let totalAmt = req.totalAmt;
    let order_no = Math.floor(1000 + Math.random() * 900);

    let reqObject = {
        fname,
        lname,
        email,
        mobile,
        order_list: [{
            order_no,
            address,
            city,
            state,
            zip,
            notes,
            subtotal,
            shipping,
            totalAmt,
            order_items: products
        }]
    }

    let userDetails = await userDB.find({ "email": email });
    // console.log('userDetails', userDetails);
    var transporter = nodemailer.createTransport({
        service: 'Gmail',
        host: 'smtp.gmail.com',
        secure: false,
        requireTLS: true,
        auth: {
            user: 'plantalifee@gmail.com',
            pass: 'planta12'
        }
      });
      
      var mailOptions = {
        from: 'plantalifee@gmail.com',
        to: email,
        subject: 'Order Successfully',
        html: `<h4>Hello ${fname},</h4><br>Your Order processed with order no: ${order_no}`
      };
      
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });

    if(isEmpty(userDetails)) {
        const checkoutDetails = new userDB(reqObject)
        checkoutDetails.save(function (error, result) {
            if (error) {
                callback({
                    message: "error"
                })
            } else {
                callback({
                    message: "success"
                })
            }
        })
    } else {
        userDB.findOneAndUpdate({ "email": email },{
            $push : {
                order_list : reqObject.order_list
            }
        },{ new: true })
        .then((response) => {
            callback({
                message: "Thank you for Shopping"
            })
        })
    }
}

module.exports = {
    checkout
}
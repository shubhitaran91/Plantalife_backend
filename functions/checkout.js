var userDB = require("../models/userDetails");
const isEmpty = require('is-empty');
var nodemailer = require('nodemailer');
var dateFormat = require('dateformat');
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
let orderdate=dateFormat(new Date(), "mmmm dS, yyyy");

    var tablerow = "<tr>";
    for(var i=0; i<products.length; i++){
      let td='<td>'
      let plantName = products[i].plantName
      let plantPrice = products[i].plantPrice
      td += plantName + "</td><td></td><td>"
      td += plantPrice + "</td>"
      tablerow = tablerow + td + "</tr>"
    }

    let reqObject = {
        fname,
        lname,
        email,
        mobile,
        orderdate,
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
          order_items:[products]
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
        
        html: `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
        <html>
        
        <head>
          <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
          <title>A Simple Responsive HTML Email</title>
          <style type="text/css">
          body {margin: 0; padding: 0; min-width: 100%!important;}
          img {height: auto;margin-left: 25%;}
          .content {width: 100%; max-width: 600px;}
          .header {padding: 40px 30px 20px 30px;}
          .innerpadding {padding: 30px 30px 30px 30px;}
          .borderbottom {border-bottom: 1px solid #f2eeed;}
          .subhead {font-size: 15px; color: #ffffff; font-family: sans-serif; letter-spacing: 10px;}
          .h1, .h2, .bodycopy {color: #153643; font-family: sans-serif;}
          .h1 {font-size: 33px; line-height: 38px; font-weight: bold;}
          .h2 {padding: 0 0 15px 0; font-size: 24px; line-height: 28px; font-weight: bold;}
          .bodycopy {font-size: 16px; line-height: 22px;text-align: -webkit-center;}
          .button {text-align: center; font-size: 18px; font-family: sans-serif; font-weight: bold; padding: 0 30px 0 30px;}
          .button a {color: #ffffff; text-decoration: none;}
          
          .footercopy {font-family: sans-serif; font-size: 14px; color: #ffffff;}
          .footercopy a {color: #ffffff; text-decoration: underline;}
        
          @media only screen and (max-width: 550px), screen and (max-device-width: 550px) {
          body[yahoo] .hide {display: none!important;}
          body[yahoo] .buttonwrapper {background-color: transparent!important;}
          body[yahoo] .button {padding: 0px!important;}
          body[yahoo] .button a {background-color: #e05443; padding: 15px 15px 13px!important;}
          body[yahoo] .unsubscribe {display: block; margin-top: 20px; padding: 10px 50px; background: #2f3942; border-radius: 5px; text-decoration: none!important; font-weight: bold;}
          }
        
          /*@media only screen and (min-device-width: 601px) {
            .content {width: 600px !important;}
            .col425 {width: 425px!important;}
            .col380 {width: 380px!important;}
            }*/
        
          </style>
        </head>
        
        <body yahoo bgcolor="#f6f8f1">
        <table width="100%" bgcolor="#f6f8f1" border="0" cellpadding="0" cellspacing="0">
        <tr>
          <td>
            
            <table bgcolor="#ffffff" class="content" align="center" cellpadding="0" cellspacing="0" border="0">
              <tr>
                <td bgcolor="#1976d2">
                  <table width="70" align="center" border="0" cellpadding="0" cellspacing="0">  
                    <tr>
                      <td height="70" style="padding: 0 20px 20px 0;">
                         <img class="fix" src="../public/logo.png" height="100" width="100" alt="" />  <h1>PLANTALIFE</h1>
                        
                      </td>
                    </tr>
                  </table>
                  
               
                  
                </td>
              </tr>
              <tr>
                <td class="innerpadding borderbottom">
                  <table width="100%" border="0" cellspacing="0" cellpadding="0">
                    <tr>
                      <td class="h2">
                        Thank you ${fname} for the order !
                      </td>
                    </tr>
                    <tr>
                      <td class="bodycopy">
                        You'll receive an mail when your items are shipped.If you have any questions, call at 7790901214 or simplyreply to this mail.
                      </td>
                    </tr>
                    <tr> 
                    <td class="bodycopy">
                    <table class="table table-striped table-dark">
                    <thead>
                      <tr>
                        <th>PlantName</th>
                       <th></th>
                        
                        <th>PlantPrice</th>
                        
                      </tr>
                    </thead>
                    <tr>
                         ${tablerow}
                      
                      </tr>
                   
                    </tbody>
                  </table>   
                    </td>          
                  </tr>
                  </table>
                </td>
              </tr>
              <tr>
                <td class="innerpadding borderbottom">
                  
                  
                  <table class="col380" align="left" border="0" cellpadding="0" cellspacing="0" style="width: 100%; max-width: 380px;">  
                    <tr>
                      <td>
                        <table width="100%" border="0" cellspacing="0" cellpadding="0">
                          <tr>
                            <td class="bodycopy">
                                <table class="table table-striped table-dark">
                                    <thead>
                                      <tr>
                                        <th>SHIPPING ADDRESS</th>
                                        <th></th>
                                        <th></th>
                                        <th></th>
                                        <th>SUMMARY</th>
                                        
                                      </tr>
                                    </thead>
                                    <tbody>
                                         <tr><td colspan="4">Order : ${order_no}</td> <td>${address},${city},${state},${zip},${mobile}</td> </tr>
                                        <tr><td colspan="3">Order Date : ${orderdate}</td></tr>
                                        <tr><td colspan="3">Order Total :${totalAmt}</td></tr>
                                        
                                      </tr>
                                   
                                    </tbody>
                                  </table>
                            </td>
                          </tr>
                          <tr>
                           
                          </tr>
                        </table>
                      </td>
                    </tr>
                  </table>
                
                </td>
              </tr>
              <tr>
               
              </tr>
              <tr>
                <td class="innerpadding bodycopy">
                    <table class="table table-bordered" style="text-align: right;">
                        <thead>
                          <tr>
                            <th scope="col"></th>
                            <th scope="col"></th>
                            <th scope="col"></th>
                            <th scope="col"></th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <th scope="row"></th>
                            <td></td>
                            <td>Subtotal</td>
                            <td>${subtotal}</td>
                          </tr>
                          <tr>
                            <th scope="row"></th>
                            <td></td>
                            <td>Flat Rate Shipping</td>
                            <td>${shipping}</td>
                          </tr>
                          <tr>
                            <th scope="row"></th>
                            <td colspan="2">Order Total</td>
                            <td>${totalAmt}</td>
                          </tr>
                        </tbody>
                      </table>
                      
                </td>
              </tr>
              <tr>
                 <td class="footer" bgcolor="#1976d2">
       
                   <table width="100%" border="0" cellspacing="0" cellpadding="0">
                    <tr>
                      
                            <tr>
                              <td style="padding-top:15px;padding-left: 230px" >
                                <a href="https://www.facebook.com/plantalifeindia/">
                                  <img src="../public/facebook.png"  height="37" alt="Facebook" border="0" />
                                </a>
                              </td>
                              <td style="padding-top:15px;padding-right: 198px" >
                                <a href="https://instagram.com/plantalife.in?igshid=1dqwkb2wmkabk">
                                  <img src="../public/insta.png"  height="40" width="40" alt="instagram" border="0" />
                                </a>
                              </td>
                          
                    </tr>
                    <tr>
                      
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
          
          
            </td>
          </tr>
        </table>
        </body>
        </html>
        `
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
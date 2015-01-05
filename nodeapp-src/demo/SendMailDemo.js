var nodemailer = require('nodemailer');
// var smtpTransport = require('nodemailer-smtp-transport');

// create reusable transporter object using SMTP transport
// var transporter = nodemailer.createTransport({
//     service: 'Gmail',
//     auth: {
//         user: 'bolik.com@gmail.com',
//         pass: 'Boli&wudan2011'
//     }
// });
var transporter = nodemailer.createTransport({
  service: 'smtp',
  name: '163',
  host: 'smtp.163.com',
  port: 25,
  secure: false,
  auth: {
    user: 'Bolik@163.com',
    pass: 'Pass@word8',
  }
});

// NB! No need to recreate the transporter object. You can use
// the same transporter object for all e-mails

// setup e-mail data with unicode symbols
var mailOptions = {
    from: 'Bolik ✔ <Bolik@163.com>', // sender address
    to: 'WaterBolik@163.com, 63721748@qq.com', // list of receivers
    subject: 'Hello ✔', // Subject line
    text: 'Hello world ✔', // plaintext body
    html: '<b>Hello world ✔</b>' + new Date() // html body
};

// send mail with defined transport object
transporter.sendMail(mailOptions, function(error, info){
    if(error){
        console.log(error);
    }else{
        console.log('Message sent: ' + info.response);
    }
});

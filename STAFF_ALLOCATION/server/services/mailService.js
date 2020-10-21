// Use at least Nodemailer v4.1.0
var fs = require("fs");
var nodemailer = require("nodemailer");
var ejs = require("ejs");

exports.EmailService=function (projectManager,requestName,employeeName,statusResponse,remark,PMemail){
    var smtpConfig = {
        host: 'in-mum-m37.icewarpcloud.in',
        port: 587,
        secure: false, // use SSL
        auth: {
            user: 'dgupta@nseit.com',
            pass: 'password'
        }
    };

    var transporter = nodemailer.createTransport(smtpConfig);

    console.log("Details smtpConfig : ",smtpConfig)

ejs.renderFile("F:/STAFF_ALLOCATION/views/index.ejs", { projectManager: projectManager,requestName:requestName,
    employeeName:employeeName,statusResponse:statusResponse,remark: remark }, function (err, data) {
    if (err) {
        console.log(err);
    } else {
        var mainOptions = {
            from: 'dgupta@nseit.com',
            to: PMemail ,
            subject: '@Staff_Allocation : Request Finalization for '+requestName,
            html: data
        };
       // console.log("html data ======================>", mainOptions.html);
        transporter.sendMail(mainOptions, function (err, info) {
            if (err) {
                console.log(err);
            } else {
                console.log('Message sent: ' + info.response);
            }
        });
    }    
    });

}
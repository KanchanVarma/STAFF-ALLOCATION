var nodemailer = require('nodemailer');
function CheckUserExist(username,password,callback){   
//console.log("--------- Inside Email Auth Service  ---------- ",password)
var smtpConfig = {
    host: 'in-mum-m37.icewarpcloud.in',
    port: 587,
    secure: false, // use SSL
tls: { rejectUnauthorized: false },
    auth: {
        user:username,
        pass:password
         }
};
var transporter = nodemailer.createTransport(smtpConfig);

transporter.sendMail(null, function (error,info) {
    if (error.code == 'EAUTH' && error.responseCode == 535) {
        console.log("WRONG CREDENTIALS :", error.response);
        callback(1,"Incorrect credentials")
    } if (error.code == 'EENVELOPE' && error.command == "API") {
        console.log("User Authenticated  : ", error.code)
        callback(0,"User Authenticated")
    }
});
}

module.exports={
    CheckUserExist
}

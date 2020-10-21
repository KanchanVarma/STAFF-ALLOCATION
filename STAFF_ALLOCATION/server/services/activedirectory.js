var ActiveDirectory = require('activedirectory');
var config = {
    url: process.env.ACTIVE_DIRECTORY_URL,
    baseDN: 'dc=ad,dc=nseit,dc=com'
}
var ad = new ActiveDirectory(config);
// var dn = "ad.nseit.com"
// var username = 'ppillai';
// var password = 'abcd@12345';


var config2 ={
    url: 'ldap://ad.nseit.com:389',
    baseDN: 'dc=finance,dc=com'
}
var ad2 = new ActiveDirectory(config2);
function CheckUserExist(username, password, cb) {
console.log(config)
    console.log('AD------------USERNAME',username)
    
            var user = 'ad\\' + username;
            ad.authenticate(user, password, function (err, auth) {
                if (err) {
                    console.log('ERROR In Authentication: ' + JSON.stringify(err));
                    //   return  {code:1,message:'Error In Authentication'};
                }
                if (auth) {
                    console.log('Authenticated!');
                    cb(0,'User Authenticated');
                }
                else {
                    console.log('Authentication failed!');
		//CheckUserCredentials2(username,password,cb)
                    cb(1,'Incorrect credentials');
                }
            });
        }

function CheckUserCredentials2(username, password, cb) {
    // if (exists) 
    console.log('AD------------USERNAME',username)
    var user = 'finance\\' + username;
    ad2.authenticate(user, password, function (err, auth) {
        if (err) {
            console.log('ERROR In Authentication: ' + JSON.stringify(err));
            //   return  {code:1,message:'Error In Authentication'};
        }
        if (auth) {
            console.log('Authenticated!');
            cb( 0,'User Authenticated' );
        }
        else {
            console.log('Authentication failed!');
            cb( 1, 'Incorrect credentials' );
        }
    });
}
    

module.exports = {
	CheckUserExist
}

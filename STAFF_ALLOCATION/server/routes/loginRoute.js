var express = require('express');
var router = express.Router();
const loginDAO = require("../DAO/loginDAO")
const icewarpauth= require('../services/icewarpauth')



router.post("/", function (req, res, next) {
	loginDAO.LoginData(req.body, function (data, code, errMsg) {
		if (code == 0) {
			if (data[0].user_password === req.body.userPassword) {
				res.status(200).json({ code: 0, message: 'success', data: data[0] })
			} else {
				res.status(401).json({ code: 1, message: 'error', data: 'Incorrect Credentials' })
			}
		}
		if (code == 1) {
			res.json({ code: 1,message: errMsg  })
		}
	})
});


router.post("/icewarpauth", function (req, res, next) {
	var userName= req.body.userName;
	var withEmail=''
	if(userName.endsWith('@nseit.com'))
	{	
		withEmail = userName
		userName = userName.substr(0,userName.lastIndexOf("@")) 
	}else{
		withEmail = userName+"@nseit.com"
	}
	
    console.log('ROUTE------------USERNAME',userName)
    console.log('ROUTE------------withEmail',withEmail)
	icewarpauth.CheckUserExist(userName,req.body.userPassword, function (code, errMsg) {
		console.log("CODE _____________",code)
		if (code == 0) {
			loginDAO.LoginUserData(withEmail, function (data, code, errMsg) {
				if (code == 0) {
					res.status(200).json({ code: 0, message: 'success', data: data[0] })
				}
				if (code == 1) {
					res.json({ message: errMsg, code: 1 })
				}
				
			})
		}
		if (code == 1) {
			res.json({ message: errMsg, code: 1 })
		}
		if (code == 2) {
			res.json({ message: errMsg, code: 2 })
		}
	})
});


// router.get('/', function(req, res, next) {

// var respDB=userInfo.SelectAllUserInfo(function(count,data){

// 	console.log("Inside Route Example COUNT :",count)
//   	res.json(data)
// })
// });

// router.get('/id/:id', function(req, res, next) {

// 	var respDB=userInfo.FindByIdUserInfo(req.params.id,function(count,data){

// 	console.log("Inside Route Example COUNT :",count)
//   	res.json(data)
// })
// });

module.exports = router;

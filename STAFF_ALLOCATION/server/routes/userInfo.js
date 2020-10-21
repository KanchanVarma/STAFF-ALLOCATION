var express = require('express');
var router = express.Router();
const userInfo = require('../models/user_info')

/* GET home page. */
router.get('/', function(req, res, next) {

var respDB=userInfo.SelectAllUserInfo(function(count,data){

	console.log("Inside Route Example COUNT :",count)
  	res.json(data)
})
});

router.get('/id/:id', function(req, res, next) {

	var respDB=userInfo.FindByIdUserInfo(req.params.id,function(count,data){

	console.log("Inside Route Example COUNT :",count)
  	res.json(data)
})
});

module.exports = router;

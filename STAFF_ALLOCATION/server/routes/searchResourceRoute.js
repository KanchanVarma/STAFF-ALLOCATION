var express = require('express');
var router = express.Router();
const DAO = require("../DAO/searchResourceDAO")

router.post('/search', function (req, res, next) {
	var respDB = DAO.SearchResourceData(req, function (data) {
		//console.log("Inside Route Example COUNT :", data)
		res.json(data)
	})
});


module.exports = router;
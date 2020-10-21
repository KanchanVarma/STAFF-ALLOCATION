var express = require('express');
var router = express.Router();
const DAO = require("../DAO/updateAllocationDAO")
router.get('/', function (req, res, next) {

	var respDB = DAO.UpdateAllocationQuery(req, function (result, metadata) {
		//console.log("Inside Route Example COUNT :", data)
		if (metadata > 0) {
			res.json({ message: "Success", code: 0 })
		}
	})
});


module.exports = router;
const query = require("../queryDictionary/editAllocationDetailsQuery")

const db = require('../database/databaseConnect')





function EditAllocationDetails(jsonData, callback) {
	var sequelize = db.CreateDBConnection();
	// sequelize.query(query.EditAllocationDetailsQuery(jsonData)).spread((results, metadata) => {
	// 	//console.log("EditAllocationDetailsQuery Response   results::",results)
	// 	console.log("EditAllocationDetailsQuery Response   metadata::", metadata)
	// 	callback(results, metadata)
	// })
	sequelize.query(query.CheckAllocationQuery(jsonData), { type: sequelize.QueryTypes.SELECT }).then(data => {

		console.log("CheckAllocationQuery For Approval Data  INSIDE DAO :", data)
		var allowablePercentageAllocation = 100 - data[0].total_percentage_allocation
		var requestedPercentageAllocation = jsonData.percentage_allocation
		console.log("**++**allowablePercentageAllocation**++**", allowablePercentageAllocation, '--requestedPercentageAllocation--', requestedPercentageAllocation)

		if (requestedPercentageAllocation <= allowablePercentageAllocation) {
			var errorCode = 0;
			sequelize.query(query.EditAllocationDetailsQuery(jsonData)).spread((results, metadata) => {
				//console.log("DirectEditAllocationDetailsQuery Response   results::",results)
				console.log("EditAllocationDetailsQuery Response   metadata::", metadata)
				callback(results, metadata, errorCode, 'success')
			}).catch(function (err) {
				var errorCode = 1;
				console.log("error *****", err)
				console.log("ERROR .......", err.name, "on field :")
				if (err.name == 'SequelizeUniqueConstraintError') {
					var message = "Resource already allocated"
				} else {
					var message = "Error while creating allocation"
				}
				callback(err, null, errorCode, message)
			});
		} else {
			var errorCode = 2;
			callback(data, null, errorCode, '% Allocation exceeds limit of ' + allowablePercentageAllocation + ' for selected dates')
		}
	})

}


// Important to check what is in jsonData

function DirectEditAllocationDetails(jsonData, callback) {

	var sequelize = db.CreateDBConnection();

	sequelize.query(query.CheckAllocationQuery(jsonData), { type: sequelize.QueryTypes.SELECT }).then(data => {

		console.log("CheckAllocationQuery For Approval Data  INSIDE DAO :", data)
		var allowablePercentageAllocation = 100 - data[0].total_percentage_allocation
		var requestedPercentageAllocation = jsonData.percentage_allocation
		console.log("**++**allowablePercentageAllocation**++**", allowablePercentageAllocation, '--requestedPercentageAllocation--', requestedPercentageAllocation)

		if (requestedPercentageAllocation <= allowablePercentageAllocation) {
			var errorCode = 0;
			sequelize.query(query.DirectEditAllocationDetailsQuery(jsonData)).spread((results, metadata) => {
				//console.log("DirectEditAllocationDetailsQuery Response   results::",results)
				console.log("DirectEditAllocationDetailsQuery Response   metadata::", metadata)
				callback(results, metadata, errorCode, 'success')
			}).catch(function (err) {
				var errorCode = 1;
				console.log("error *****", err)
				console.log("ERROR .......", err.name, "on field :")
				if (err.name == 'SequelizeUniqueConstraintError') {
					var message = "Resource already allocated"
				} else {
					var message = "Error while creating allocation"
				}
				callback(err, null, errorCode, message)
			});
		} else {
			var errorCode = 2;
			callback(data, null, errorCode, '% Allocation exceeds limit of ' + allowablePercentageAllocation + ' for selected dates')
		}
	})
}

function ReleaseRequest(id, dor, modified_date, feedback, rating, callback) {
	var sequelize = db.CreateDBConnection();
	sequelize.query(query.ReleaseRequestQuery(id, dor, modified_date, feedback, rating)).spread((results, metadata) => {
		//console.log("ReleaseRequestQuery Response   results::",results)
		console.log("ReleaseRequestQuery Response   metadata::", metadata)
		callback(results, metadata)
	})
}

module.exports = {
	EditAllocationDetails,
	ReleaseRequest,
	DirectEditAllocationDetails
}

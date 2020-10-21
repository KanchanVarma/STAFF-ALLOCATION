const query = require("../queryDictionary/allocateResourceQuery")
const db = require('../database/databaseConnect')
//const model = require("../models/project")


function InsertAllocateResource(jsonData,callback) {

	var sequelize=db.CreateDBConnection();
	sequelize.query(query.CheckAllocationQuery(jsonData), { type: sequelize.QueryTypes.SELECT}).then(data => {

		console.log("CheckAllocationQuery Data  INSIDE DAO :" ,data)
		var allowablePercentageAllocation =100 - data[0].total_percentage_allocation
		var requestedPercentageAllocation = jsonData.percentage_allocation
		console.log("**++**allowablePercentageAllocation**++**",allowablePercentageAllocation,'--requestedPercentageAllocation--',requestedPercentageAllocation)

		if (requestedPercentageAllocation<=allowablePercentageAllocation)
		{
			var errorCode = 0;
			sequelize.query(query.InsertIntoProjectAllocationQuery(jsonData), { type: sequelize.QueryTypes.INSERT}).then(data1 => {
				//console.log("allocateResourceQuery Data  INSIDE DAO :" ,data1)
				callback(data1,errorCode,'success')
		  }).catch(function (err) {
			var errorCode = 1;
			console.log("error *****",err)
			console.log("ERROR .......",err.name,"on field :")
			if (err.name =='SequelizeUniqueConstraintError') {
				var message = "Resource already allocated"
				} else {
				var message = "Error while creating allocation"
				}
			 callback(err,errorCode,message)
		});
		} else {
			var errorCode = 2;
			callback(data,errorCode,'% Allocation exceeds limit of '+ allowablePercentageAllocation+' for selected dates')
		}
	})

}


// function InsertAllocateResourceDirect(jsonData,callback) {
// 	var errorCode = 0;
// 	var sequelize=db.CreateDBConnection();
// 	sequelize.query(query.InsertIntoProjectAllocationDirectQuery(jsonData), { type: sequelize.QueryTypes.INSERT}).then(data => {
// 		//console.log("allocateResourceQuery Data  INSIDE DAO :" ,data)
// 		callback(data,errorCode,'success')
//   }).catch(function (err) {
// 	var errorCode = 1;
// 	console.log("ERROR .......",err.name,"on field :")
// 	if (err.name =='SequelizeUniqueConstraintError') {
// 		var message = "Resource already allocated"
// 		} else {
// 		var message = "Error while creating allocation"
// 		}
// 	 callback(err,errorCode,message)
// });
// }


function InsertAllocateResourceDirect(jsonData,callback) {

	console.log("**inside InsertAllocateResourceDirect**")

	var sequelize=db.CreateDBConnection();
	sequelize.query(query.CheckAllocationQuery(jsonData), { type: sequelize.QueryTypes.SELECT}).then(data => {

		console.log("CheckAllocationQuery Data  INSIDE DAO :" ,data)
		var allowablePercentageAllocation =100 - data[0].total_percentage_allocation
		var requestedPercentageAllocation = jsonData.percentage_allocation
		console.log("**++**allowablePercentageAllocation**++**",allowablePercentageAllocation,'--requestedPercentageAllocation--',requestedPercentageAllocation)

		if (requestedPercentageAllocation<=allowablePercentageAllocation)
		{
			var errorCode = 0;
			sequelize.query(query.InsertIntoProjectAllocationDirectQuery(jsonData), { type: sequelize.QueryTypes.INSERT}).then(data1 => {
				//console.log("allocateResourceQuery Data  INSIDE DAO :" ,data1)
				callback(data1,errorCode,'success')
		  }).catch(function (err) {
			var errorCode = 1;
			console.log("error *****",err)
			console.log("ERROR .......",err.name,"on field :",err)

			if (err.name =='SequelizeUniqueConstraintError') {
				var message = "Resource already allocated"
				} else {
				var message = "Error while creating allocation"
				}
			 callback(err,errorCode,message)
		});
		} else {
			var errorCode = 2;
			callback(data,errorCode,'% Allocation exceeds limit of '+ allowablePercentageAllocation+' for selected dates')
		}
	})

}

module.exports = {
	InsertAllocateResource,
	InsertAllocateResourceDirect,
}

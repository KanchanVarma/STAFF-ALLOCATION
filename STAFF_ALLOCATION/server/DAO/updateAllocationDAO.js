const query = require("../queryDictionary/updateAllocationQuery")

const db = require('../database/databaseConnect')

// function UpdateAllocationQuery(jsonData,callback) {

// 	var sequelize=db.CreateDBConnection();
// 	sequelize.query(query.UpdateAllocationQuery(jsonData)).spread((results, metadata) => {
// 	  console.log("UpdateAllocationQuery Response   results::",results)
// 	  console.log("UpdateAllocationQuery Response   metadata::",metadata)
// 	  callback(results,metadata)
// 	})

// }


// Important to check what is in jsonData

function UpdateAllocationQuery(jsonData,callback) {

	var sequelize=db.CreateDBConnection();

	if (jsonData.status=='Reject'){

		var errorCode = 0;
			sequelize.query(query.UpdateAllocationQuery(jsonData)).spread((results, metadata) => {
				//console.log("UpdateAllocationQuery Response   results::",results)
				console.log("UpdateAllocationQuery Response   metadata::",metadata)
				callback(results,metadata,errorCode,'success')
			})

	} else {

	sequelize.query(query.CheckAllocationQuery(jsonData), { type: sequelize.QueryTypes.SELECT}).then(data => {

		console.log("CheckAllocationQuery For Approval Data  INSIDE DAO :" ,data)
		var allowablePercentageAllocation =100 - data[0].total_percentage_allocation
		var requestedPercentageAllocation = jsonData.percentage_allocation
		console.log("**++**allowablePercentageAllocation**++**",allowablePercentageAllocation,'--requestedPercentageAllocation--',requestedPercentageAllocation)

		if (requestedPercentageAllocation<=allowablePercentageAllocation)
		{
			var errorCode = 0;
			sequelize.query(query.UpdateAllocationQuery(jsonData)).spread((results, metadata) => {
				console.log("UpdateAllocationQuery Response   results::",results)
				console.log("UpdateAllocationQuery Response   metadata::",metadata)
				callback(results,metadata,errorCode,'success')
			}).catch(function (err) {
			var errorCode = 1;
			console.log("error *****",err)
			console.log("ERROR .......",err.name,"on field :")
			if (err.name =='SequelizeUniqueConstraintError') {
				var message = "Resource already allocated"
				} else {
				var message = "Error while creating allocation"
				}
			 callback(err,null,errorCode,message)
		});
		} else {
			var errorCode = 2;
			callback(data,null,errorCode,'% Allocation exceeds limit of '+ allowablePercentageAllocation+' for selected dates')
		}
	})
}

}




function UpdateAllocationDataQuery(jsonData,callback) {
	var sequelize=db.CreateDBConnection();
	sequelize.query(query.UpdateAllocationReleaseQuery(jsonData)).spread((results, metadata) => {
	  //console.log("UpdateAllocationDataQuery Response   results::",results)
	  console.log("UpdateAllocationDataQuery Response   metadata::",metadata)
	  callback(results,metadata)
	})
}




module.exports = {
	// MyProjectsData,
	UpdateAllocationQuery,
	UpdateAllocationDataQuery
	//MyResourcesData,
}

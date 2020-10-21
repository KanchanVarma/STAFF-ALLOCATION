//For Allocate Resource Screen
// exports.UpdateAllocationQuery = function (jsonData) {

// 	console.log('-----------------------------', jsonData.date_submitted)
// 	query = `Update project_allocation
// 						set remark='${jsonData.remark}'
// 						, status='${jsonData.status}',
// 						create_allocation_status='${jsonData.status}' ,
// 						modify_allocation_status='${jsonData.status}'  `
// 	if (jsonData.date_submitted)
// 		query += ` ,planned_release_date='${jsonData.date_submitted}' `

// 	query += ` where id=${jsonData.id}
// 						`
// 	return query
// }

// exports.UpdateAllocationReleaseQuery = function (jsonData) {

// 	console.log('-----------------------------', jsonData.date_submitted)
// 	query = `Update project_allocation
// 							set remark='${jsonData.remark}'
// 							, status='Approve', release_allocation_status ='Approve'`
// 	if (jsonData.date_submitted && jsonData.status=='Reject')
// 		query += ` ,planned_release_date='${jsonData.old_release_date}' `
// 	if (jsonData.date_submitted && jsonData.status=='Approve')
// 		query += ` ,planned_release_date='${jsonData.release_date}'`

// 	query += ` where id=${jsonData.id}
// 							`
// 	return query
// }


exports.CheckAllocationQuery=function (jsonData){
	console.log("*****-----Inside updateAllocationQuery.js",jsonData)
	return `select coalesce( (select coalesce(sum(pa.percentage_allocation),0) as total_percentage_allocation  from project_allocation pa , employee e1
	Where pa.employee_id=e1.id and pa.create_allocation_status not in ('Reject','Pending')
and pa.id in (select id from project_allocation pa where (pa.release_allocation_status is null OR pa.release_allocation_status in ('Pending','Reject') ))
	and (pa.modify_allocation_status not in ('Pending') or  pa.modify_allocation_status is null)
	
and ('${jsonData.doa}'::date between to_char(pa.doa,'yyyy-mm-dd')::date and to_char(pa.planned_release_date,'yyyy-mm-dd')::date  
or '${jsonData.planned_release_date}'::date between to_char(pa.doa,'yyyy-mm-dd')::date and to_char(pa.planned_release_date,'yyyy-mm-dd')::date 
or pa.doa::date between '${jsonData.doa}'::date and '${jsonData.planned_release_date}'::date
or pa.planned_release_date::date between '${jsonData.doa}'::date and '${jsonData.planned_release_date}'::date )  
	and e1.id=(select DISTINCT e.id from employee e where e.code = '${jsonData.employee_code}' limit 1) AND   (e1.exit_date::date >= current_timestamp::date or e1.status='A') group by e1.id ),0) as total_percentage_allocation`
}



//For Allocate Resource Screen
exports.UpdateAllocationQuery = function (jsonData) {

	console.log('-----------------------------', jsonData.allocation_request_type)
	console.log('-----------------------------', jsonData.status)
	console.log('-----------------------------', jsonData.status)


	query = `Update project_allocation
						set `				
		if(jsonData.allocation_request_type=='update'){

				if(jsonData.status=='Reject'){	
					query+=`modify_allocation_status='${jsonData.status}'
							,status='${jsonData.status}'
							,remark='${jsonData.remark}'`					
				}
				if (jsonData.status=='Approve'){
					query+=` modify_allocation_status='${jsonData.status}' 
								,status='${jsonData.status}'
								,doa = '${jsonData.doa}'
								,planned_release_date='${jsonData.planned_release_date}'
								,percentage_allocation=${jsonData.percentage_allocation}
								,remark='${jsonData.remark}'`
				}
		} else{

				if(jsonData.status=='Reject'){	
					query+=`create_allocation_status='${jsonData.status}'
							,status='${jsonData.status}'
							,remark='${jsonData.remark}' `					
				}
				if (jsonData.status=='Approve'){
					query+=` create_allocation_status='${jsonData.status}'
								,status='${jsonData.status}' 
								,doa = '${jsonData.doa}'
								,planned_release_date='${jsonData.planned_release_date}'
								,percentage_allocation=${jsonData.percentage_allocation}
								,remark='${jsonData.remark}' `
				}		
		}

		query += ` where id=${jsonData.id} `
	return query
}

exports.UpdateAllocationReleaseQuery = function (jsonData) {

	console.log('-----------------------------', jsonData.dao)
	query = `Update project_allocation
							set remark='${jsonData.remark}'
							, status='Approve', release_allocation_status ='Approve' `
	if(jsonData.doa!= undefined)
		query+=` , doa = '${jsonData.doa}'`

	if (jsonData.date_submitted && jsonData.status=='Reject')
	{
		query += `/* hey Reject*/ ,planned_release_date='${jsonData.old_release_date}' 
		,rating='${jsonData.rating}',feedback='${jsonData.feedback}'`
	}
	if (jsonData.date_submitted && jsonData.status=='Approve')
		query += `/* hey Approve*/ ,planned_release_date='${jsonData.planned_release_date}' ,
		         rating='${jsonData.rating}',feedback='${jsonData.feedback}',
		         percentage_allocation ='${jsonData.percentage_allocation}'`

	query += ` where id=${jsonData.id}
							`
	return query
}




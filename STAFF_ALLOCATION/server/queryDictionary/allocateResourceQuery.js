//For Allocate Resource Screen
exports.InsertIntoProjectAllocationQuery=function (jsonData){

	
	// var regex = /(\d{4})-(0[1-9]|1[0-2])-(0[1-9]|[1-2]\d|3[0-1])T(?:[0-1]\d|2[0-3]):([0-5]\d):([0-5]\d)\.\d\d\dZ/g
	//	yyyy-mm-ddThh:mm:ss.mmm
	// console.log("RD",jsonData.planned_release_date)
	// console.log("DOA",jsonData.doa)
	// console.log("date_submitted",jsonData.date_submitted)
	// var subs1 = jsonData.doa.split("T")
	// var subs2 = jsonData.planned_release_date.split("T")
	// var subs3 = jsonData.date_submitted.split("T")
	// jsonData.doa=subs1[0]
	// jsonData.planned_release_date=subs2[0]
	//jsonData.date_submitted=subs3[0] 

	// console.log("DOA NEW ",subs[0])

				return `insert into project_allocation
				(id,
				project_id,
				employee_id,
				percentage_allocation,
				billing_rate,
				onsite_offshore,
				location_id,
				doa,
				planned_release_date,
				created_by_id,
				billing_status,
				status,
				create_allocation_status,

				modified_date,
				modified_by_id

				)

				values

				(${jsonData.id},
				(select DISTINCT p.id from project p where p.name = '${jsonData.project_name}' limit 1),
				(select DISTINCT e.id from employee e where e.code = '${jsonData.employee_code}'
				 AND (e.exit_date::date >= current_timestamp::date or e.status='A') limit 1),
				${jsonData.percentage_allocation},
				${jsonData.billing_rate},
				'${jsonData.onsite_offshore}',
				(select l.id from location l  where	 l.city ilike '%${jsonData.city}%' and l.area ilike '%${jsonData.area}%' limit 1),
				'${jsonData.doa}',
				'${jsonData.planned_release_date}',
				
				${jsonData.created_by_id},
				'${jsonData.billing_status}',
				'Pending',
				'Pending',

				'${jsonData.date_submitted}',
				${jsonData.created_by_id}


				);`
				}

exports.CheckAllocationQuery=function (jsonData){
	console.log("*****-----Inside allocateResourceQuery.js",jsonData)
	return `select coalesce( (select coalesce(sum(pa.percentage_allocation),0) as total_percentage_allocation  from project_allocation pa , employee e1
	Where pa.employee_id=e1.id and pa.create_allocation_status not in ('Reject','Pending')
and pa.id in (select id from project_allocation pa where (pa.release_allocation_status is null OR pa.release_allocation_status in ('Pending','Reject') )) 
	and (pa.modify_allocation_status not in ('Pending') or  pa.modify_allocation_status is null)
	
and ('${jsonData.doa}'::date between to_char(pa.doa,'yyyy-mm-dd')::date and to_char(pa.planned_release_date,'yyyy-mm-dd')::date  
or '${jsonData.planned_release_date}'::date between to_char(pa.doa,'yyyy-mm-dd')::date and to_char(pa.planned_release_date,'yyyy-mm-dd')::date 
or pa.doa::date between '${jsonData.doa}'::date and '${jsonData.planned_release_date}'::date
or pa.planned_release_date::date between '${jsonData.doa}'::date and '${jsonData.planned_release_date}'::date )  
 
	and e1.id=(select DISTINCT e.id from employee e where e.code = '${jsonData.employee_code}' 
	AND (e.exit_date::date >= current_timestamp::date or e.status='A') limit 1) 
	AND   (e1.exit_date::date >= current_timestamp::date or e1.status='A') group by e1.id ),0) as total_percentage_allocation`
}



exports.InsertIntoProjectAllocationDirectQuery=function (jsonData){

	return `insert into project_allocation
	(id,
	project_id,
	employee_id,
	percentage_allocation,
	billing_rate,
	onsite_offshore,
	location_id,
	doa,
	planned_release_date,
	created_by_id,
	billing_status,
	status,
	create_allocation_status,
	modify_allocation_status,
	modified_date,
	modified_by_id

	)

	values

	(${jsonData.id},
	(select DISTINCT p.id from project p where p.name = '${jsonData.project_name}' limit 1),
	(select DISTINCT e.id from employee e where e.code = '${jsonData.employee_code}' 
	AND (e.exit_date::date >= current_timestamp::date or e.status='A') limit 1),
	${jsonData.percentage_allocation},
	${jsonData.billing_rate},
	'${jsonData.onsite_offshore}',
	(select l.id from location l  where	 l.city ilike '%${jsonData.city}%' and l.area ilike '%${jsonData.area}%' limit 1),
	'${jsonData.doa}',
	'${jsonData.planned_release_date}',
	
	${jsonData.created_by_id},
	'${jsonData.billing_status}',
	'Approve',
	'Approve',
	'Approve',
	'${jsonData.date_submitted}',
	${jsonData.created_by_id}


	);`
}



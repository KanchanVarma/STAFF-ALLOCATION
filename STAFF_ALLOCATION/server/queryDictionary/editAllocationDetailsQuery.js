//For Allocate Resource Screen
exports.EditAllocationDetailsQuery=function (jsonData){


	return `Update  project_allocation 
	set 

	project_id =  (select p.id from project p 
			where p.name='${jsonData.project_name}' limit 1),

	employee_id = (select e.id from employee e
			where e.name='${jsonData.employee_name}' 
			AND (e.exit_date::date >= current_timestamp::date or e.status='A') limit 1),

	/* percentage_allocation = ${jsonData.percentage_allocation}, */
	billing_rate = ${jsonData.billing_rate},
	onsite_offshore = '${jsonData.onsite_offshore}',
	location_id = (select l.id from location l
			where l.city='${jsonData.city}' and l.area='${jsonData.area}' limit 1),
	/* doa = '${jsonData.doa}', */
	status = 'Pending',
	modify_allocation_status='Pending',
	status_date = '${jsonData.modified_date}' ,
	/* planned_release_date = '${jsonData.planned_release_date}', */
	modified_by_id  = ${jsonData.modified_by_id},
	modified_date = '${jsonData.modified_date}',
	billing_status = '${jsonData.billing_status}'
	where id= ${jsonData.id}
	`
}

// Direct edit for rm

exports.DirectEditAllocationDetailsQuery=function (jsonData){


return `Update  project_allocation 
set 

project_id =  (select p.id from project p 
	where p.name='${jsonData.project_name}' limit 1),

employee_id = (select e.id from employee e
	where e.name='${jsonData.employee_name}' 
	AND (e.exit_date::date >= current_timestamp::date or e.status='A') limit 1),

percentage_allocation = ${jsonData.percentage_allocation}, 
billing_rate = ${jsonData.billing_rate},
onsite_offshore = '${jsonData.onsite_offshore}',
location_id = (select l.id from location l
	where l.city='${jsonData.city}' and l.area='${jsonData.area}' limit 1),
doa = '${jsonData.doa}', 
status = 'Approve',
modify_allocation_status='Approve',
status_date = '${jsonData.modified_date}' ,
planned_release_date = '${jsonData.planned_release_date}', 
modified_by_id  = ${jsonData.modified_by_id},
modified_date = '${jsonData.modified_date}',
billing_status = '${jsonData.billing_status}'
where id= ${jsonData.id}
`
}

exports.CheckAllocationQuery=function (jsonData){

console.log("*-*-*-*--*-*-*-",jsonData);

return `select coalesce( (select coalesce(sum(pa.percentage_allocation),0) as total_percentage_allocation  from project_allocation pa , employee e1
Where pa.employee_id=e1.id and pa.create_allocation_status not in ('Reject','Pending')
and pa.id in (select id from project_allocation pa where (pa.release_allocation_status is null OR pa.release_allocation_status in ('Pending','Reject') ))
and (pa.modify_allocation_status not in ('Pending') or  pa.modify_allocation_status is null)
and pa.project_id not in (select p.id from project p where p.name='${jsonData.project_name}')

and ('${jsonData.doa}'::date between to_char(pa.doa,'yyyy-mm-dd')::date and to_char(pa.planned_release_date,'yyyy-mm-dd')::date  
or '${jsonData.planned_release_date}'::date between to_char(pa.doa,'yyyy-mm-dd')::date and to_char(pa.planned_release_date,'yyyy-mm-dd')::date 
or pa.doa::date between '${jsonData.doa}'::date and '${jsonData.planned_release_date}'::date
or pa.planned_release_date::date between '${jsonData.doa}'::date and '${jsonData.planned_release_date}'::date )  
and e1.id=(select DISTINCT e.id from employee e where e.code = '${jsonData.employee_code}' 
AND (e.exit_date::date >= current_timestamp::date or e.status='A') limit 1)
AND   (e1.exit_date::date >= current_timestamp::date or e1.status='A') group by e1.id ),0) as total_percentage_allocation`
}


//For Allocate Resource Screen
exports.ReleaseRequestQuery=function (id,dor,modified_date,feedback,rating){

return `Update  project_allocation 
set 
/*planned_release_date = '${dor}',*/
rating  = '${rating}',
feedback = '${feedback}',
modified_date='${modified_date}',
status = 'Pending',
release_allocation_status = 'Pending' 
where id= ${id}
`
}

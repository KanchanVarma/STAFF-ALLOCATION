exports.CreateResourceQuery=function (data){

	query= `
			insert into employee(
						
						name,
						code,
						designation,
						grade,
						location_id ,
						gender,
						doj,
						dob,
						total_experience,
						relevant_experience,
						email_id,
						contact,
						status,
						employment_status,
						eduation,
						recruiters_id,
						created_by_id,
						created_dtm,
						modified_by_id,
						modified_dtm`
					if((data.certification !=undefined))
					query+=`,certification`

					if((data.domain !=undefined))
					query+=`,domain `

					if((data.levelofexpertise !=undefined))
					query+=`,level_of_expertise `
					
					if((data.std_billing_rate !=undefined))
					query+=`,std_billing_rate `

					if((data.min_billing_rate !=undefined))
					query+=`,min_billing_rate `
						
					if((data.average_billing_rate !=undefined))
					query+=`,average_billing_rate `
						
			query+=`)

			values
			(
			
			'${data.name}',
			'${data.code}',
			'${data.designation}',
			'${data.grade}',
			(select id from location where city='${data.city}' and area='${data.area}' limit 1),
			'${data.gender}',
			'${data.doj}',
			'${data.dob}',
			${data.total_experience},
			${data.relevant_experience},
			'${data.email_id}',
			'${data.contact}',
			'A',
			'${data.employment_status}',
			'${data.education}',
			(select id from public.user where name ='${data.recruiters_name}' limit 1),
			
			${data.created_by_id},
			'${data.created_dtm}',
			${data.modified_by_id},
			'${data.modified_dtm}'`


			
			if((data.certification !=undefined))	
			query+=`,'${data.certification}'`

			if((data.domain !=undefined))	
			query+=`,'${data.domain}'`

			
			if((data.levelofexpertise !=undefined))	
			query+=`,'${data.levelofexpertise}'`
			
			if((data.std_billing_rate !=undefined))	
			query+=`,'${data.std_billing_rate}'`

			if((data.min_billing_rate !=undefined))	
			query+=`,'${data.min_billing_rate}'`

			if((data.average_billing_rate !=undefined))	
			query+=`,'${data.average_billing_rate}'`

			
			query+=`)  RETURNING ID;`
			return query
}


exports.UpdateResourceQuery=function (id,data){

	var query= `
			Update employee set `
			if(data.name!= undefined)
			query+=`name = '${data.name}'`

			if(data.code!= undefined)
			query+=`,code = '${data.code}'`

			if(data.designation!= undefined)
			query+=`,designation = '${data.designation}'`

			if(data.grade!= undefined)
			query+=`,grade = '${data.grade}'`

			if((data.area!=undefined && data.city!=undefined))
			query+=`,location_id=(select l.id from location l ,
				employee e where e.location_id=l.id and 
			l.city='${data.city}' and l.area='${data.area}' 
			AND (e.exit_date::date >= current_timestamp::date or e.status='A') limit 1) `

			if(data.gender!= undefined)
			query+=`,gender = '${data.gender}'`
					
			if(data.doj!= undefined)
			query+=`,doj = '${data.doj}'`
					
			if(data.dob!= undefined)
			query+=`,dob = '${data.dob}'`
					
			if(data.total_experience!= undefined)
			query+=`,total_experience = '${data.total_experience}'`
					
			if(data.relevant_experience!= undefined)
			query+=`,relevant_experience = '${data.relevant_experience}'`
					
			if(data.email_id!= undefined)
			query+=`,email_id = '${data.email_id}'`
					
			if(data.contact!= undefined)
			query+=`,contact = '${data.contact}'`
					
			// if(data.status!= undefined)
			// query+=`,status = '${data.status}'`

			if(data.employment_status!= undefined)
			query+=`,employment_status = '${data.employment_status}'`
					
			if(data.eduation!= undefined)
			query+=`,eduation = '${data.eduation}'`

			if(data.certification!= undefined)
			query+=`,certification = '${data.certification}'`
					
			if(data.std_billing_rate!= undefined)
			query+=`,std_billing_rate = '${data.std_billing_rate}'`

			if(data.min_billing_rate!= undefined)
			query+=`,min_billing_rate = '${data.min_billing_rate}'`

			if(data.average_billing_rate!= undefined)
			query+=`,average_billing_rate = '${data.average_billing_rate}'`
						
			if((data.area!=undefined && data.city!=undefined))
			query+=`,recruiters_id = (select id from public.user where
					 name ='${data.recruiters_name}' limit 1)`
							 
			if(data.exit_date && data.exit_date!=undefined)
			query+= `,exit_date = '${data.exit_date}' , status='N' `
						
						
			if(data.created_by_id!= undefined)
			query+=`,created_by_id = '${data.created_by_id}'`
				
			//query+=`,created_by_id = ${data.created_by_id},

			if(data.created_dtm!= undefined)
			query+=`,created_dtm = '${data.created_dtm}'`

			if(data.modified_by_id!= undefined)
			query+=`,modified_by_id = '${data.modified_by_id}'`

			if(data.modified_dtm!= undefined)
			query+=`,modified_dtm = '${data.modified_dtm}'`

			//created_dtm = ,'${data.created_dtm}',
			//	modified_by_id =, ${data.modified_by_id},
			//modified_dtm=,'${data.modified_dtm}',

			if(data.domain!= undefined)
			query+=`,domain = '${data.domain}'`
						
			if(data.levelofexpertise!= undefined)
			query+=`,level_of_expertise = '${data.levelofexpertise}'`
	
			query+=`WHERE id=${data.id}	`	
	return query
}

exports.UpdateAllocationOnExitQuery=function (id,data){

if(data.exit_date){
 query=`Update project_allocation
 			Set planned_release_date='${data.exit_date}'`
				console.log('@@@@@@@@@@',data.id)
	query+=`WHERE planned_release_date >='${data.exit_date}' and employee_id=${data.id}`
	} else {
	query= `Update project_allocation set id=1 where id=1`
	}			
 	return query
}

exports.SelectResourceByIdQuery=function (id){

	return `SELECT
				e.id,
				e.name,
				e.code,
				e.designation,
				e.grade,
				l.city ,
				l.area,
				e.gender,
				e.doj,
				e.dob,
				e.total_experience + (DATE_PART('year', current_timestamp) - DATE_PART('year', e.doj)) as total_experience,
				e.relevant_experience,
				e.domain,
				e.level_of_expertise as levelofexpertise,
				(select 
					ps.name as primary_skill
					FROM employee e2 ,employee_skill_map esm , primary_skill ps
					WHERE esm.primary_skill_id = ps.id
					AND esm.employee_id=e2.id
					AND e2.id=e.id limit 1 ),
				(select 
					ss.name as secondary_skill
					FROM employee e2 ,employee_skill_map esm , secondary_skill ss
					WHERE esm.secondary_skill_id = ss.id
					AND esm.employee_id=e2.id
					AND e2.id=e.id limit 1),
				e.email_id,
				e.contact,
				e.status,
				e.employment_status,
				e.eduation as education,
				e.certification,
				e.std_billing_rate,
				e.min_billing_rate,
				e.average_billing_rate,
				u.name as recruiters_name,
				e.exit_date,
				e.created_by_id,
				e.created_dtm,
				e.modified_by_id,
				e.modified_dtm,
				e.resume_file_name as file_name

			FROM employee e left join location l on (e.location_id=l.id) , public.user u
			WHERE   e.recruiters_id=u.id
			AND e.id=${id}	
			AND   (e.exit_date::date >= current_timestamp::date or e.status='A')
			order by e.code `

}


exports.InsertEmployeeSkillMapQuery= function(id,data){

query= `

insert into employee_skill_map
(
	
	employee_id,
	primary_skill_id,
	
	level_of_expertise,
	created_by_id,
	created_dtm`

	if((data.secondary_skill_id !=undefined))
					query+=`,secondary_skill_id`
	
query+=`)

values (
		
		${id},
		(select DISTINCT ps.id from  primary_skill ps 
			where ps.name='${data.primary_skill}' limit 1
		 ),`
		 if((data.recruiters_id!=undefined))
			query+=`recruiters_id =(select DISTINCT ss.id from  secondary_skill ss 
			where ss.name='${data.secondary_skill}'  limit 1
		 ),`
		 query+=`
		 '${data.levelofexpertise}',
		 ${data.created_by_id},
		'${data.created_dtm}'

) `
return query
}


exports.UpdateEmployeeSkillMapQuery= function(id,data){

query= `

update employee_skill_map
SET`
	if(data.primary_skill!= undefined)
	query+=	` primary_skill_id = (select DISTINCT ps.id from  primary_skill ps 
		where ps.name='${data.primary_skill}'
	 ),`
	 if(data.secondary_skill!= undefined)
		query+=	` secondary_skill_id =(select DISTINCT ss.id from secondary_skill ss
			where ss.name='${data.secondary_skill}'
	 ),`
	 if(data.levelofexpertise!= undefined)
	 query+=` level_of_expertise= '${data.levelofexpertise}',`

	query+=` modified_by_id =${data.modified_by_id},
		modified_dtm ='${data.modified_dtm}'
		WHERE id = (select esm.id from employee_skill_map esm , employee e where esm.employee_id = e.id and e.id=${data.id}  
			AND (e.exit_date::date >= current_timestamp::date or e.status='A')
			and esm.primary_skill_id= (select p.id from primary_skill p where p.name = '${data.primary_skill}') ) 
		
`
return query
}

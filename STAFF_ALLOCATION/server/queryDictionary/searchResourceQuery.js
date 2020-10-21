exports.SearchResourceQuery = function (res) {
	var yrs = [null, null]
	var data = res.body
	console.log("DATA------------------", res.body)
	if (data.years_of_experience)
		var yrs = data.years_of_experience.split("-")

	if (data.experience_lower == undefined || data.experience_lower == "")
		data.experience_lower = null
	if (data.experience_upper == undefined || data.experience_upper == "")
		data.experience_upper = null
	if (data.employee_name == undefined || data.employee_name == "")
		data.employee_name = null
	else data.employee_name = "'%" + data.employee_name + "%'"
	if (data.employee_code == undefined || data.employee_code == "")
		data.employee_code = null
	else data.employee_code = "'%" + data.employee_code + "%'"
	if (data.designation == undefined || data.designation == "")
		data.designation = null
	else data.designation = "'%" + data.designation + "%'"
	if (data.primary_skill == undefined || data.primary_skill == "")
		data.primary_skill = null
	else data.primary_skill = "'" + data.primary_skill + "'"
	if (data.secondary_skill == undefined || data.secondary_skill == "")
		data.secondary_skill = null
	else data.secondary_skill = "'" + data.secondary_skill + "'"
	if (data.employment_status == undefined || data.employment_status == "")
		data.employment_status = null
	else data.employment_status = "'%" + data.employment_status + "%'"
	if (data.location_city == undefined || data.location_city == "")
		data.location_city = null
	else data.location_city = "'" + data.location_city + "'"
	if (data.location_area == undefined || data.location_area == "")
		data.location_area = null
	else data.location_area = "'" + data.location_area + "'"
	if (data.available_from_date == undefined || data.available_from_date == "")
		data.available_from_date = null
	else data.available_from_date = "'" + data.available_from_date + "'"
	if (data.std_billing_rate == undefined || data.std_billing_rate == "")
		data.std_billing_rate = null

	if (data.min_billing_rate == undefined || data.min_billing_rate == "")
		data.min_billing_rate = null
	if (data.avg_billig_rate == undefined || data.avg_billig_rate == "")
		data.avg_billig_rate = null
	if (data.if_in_project_screen == undefined || data.if_in_project_screen == "")
		data.if_in_project_screen = null
	else data.if_in_project_screen = "'%" + data.if_in_project_screen + "%'"


	console.log(data.primary_skill)

	var query = `
		select	DISTINCT                
														e.id,
														e.code as employee_code,
														e.name as employee_name ,
														e.designation,
														e.total_experience + (DATE_PART('year', current_timestamp) - DATE_PART('year', e.doj)) as relevant_experience,  
														(select string_agg(distinct ps.name,', ') as primary_skill
														FROM employee e2 ,employee_skill_map esm , primary_skill ps
														WHERE esm.primary_skill_id = ps.id
														AND esm.employee_id=e2.id
														AND e2.id=e.id),
														(select string_agg(distinct ss.name,', ') as secondary_skill
														FROM employee e2 ,employee_skill_map esm , secondary_skill ss
														WHERE esm.secondary_skill_id = ss.id
														AND esm.employee_id=e2.id
														AND e2.id=e.id),
														(select distinct l.city from employee e3 , location l 
														where e3.location_id=l.id and e3.id=e.id limit 1),
														(select distinct l.area from employee e4 , location l 
														where e4.location_id=l.id and e4.id=e.id limit 1),
														e.employment_status,
														e.modified_dtm,
														(select sum(pa.percentage_allocation) as percentage_allocation 
														FROM employee e1 , project_allocation pa WHERE pa.employee_id = e1.id 
														AND e1.id=e.id 
														AND pa.create_allocation_status not in ('Reject','Pending') 
														AND pa.doa::date <= current_timestamp::date
														and pa.planned_release_date::date >= current_timestamp::date group by e1.id) 
		 						 FROM employee e /*, project_allocation pa*/ `



	query += `WHERE /* pa.employee_id = e.id 
							AND */  (e.exit_date::date >= current_timestamp::date or e.status='A')
							/*AND current_timestamp BETWEEN pa.doa AND pa.planned_release_date  
							AND  percentage_allocation < 100 */`

	// if (data.available_from_date && data.available_from_date!="")
	// 	query+=` AND pa.planned_release_date <= COALESCE(${data.available_from_date}, pa.planned_release_date) `
	if (data.available_from_date && data.available_from_date != "")
		query += `and e.id in (select distinct id from ((select	DISTINCT                
				e.id,
				   (select coalesce(sum(pa.percentage_allocation),0)  from project_allocation pa , employee e1 
			   Where pa.employee_id=e1.id and pa.create_allocation_status not in ('Reject','Pending') 
			   and pa.doa::date <= ${data.available_from_date}::date
			   and pa.planned_release_date::date >= ${data.available_from_date}::date
				and e1.id=e.id  ) as total_percentage_allocation  
	  		 From  employee e where (e.exit_date::date >= current_timestamp::date or e.status='A')
				Order By e.id)


UNION (select	DISTINCT                
				e.id,
				   (select coalesce(sum(pa.percentage_allocation),0)  from project_allocation pa , employee e1 
			   Where pa.employee_id=e1.id and pa.create_allocation_status not in ('Reject','Pending') 
			   and pa.project_id in (select id from project where is_coe = true)
			   and pa.doa::date <= ${data.available_from_date}::date
			   and pa.planned_release_date::date >= ${data.available_from_date}::date
				and e1.id=e.id  ) as total_percentage_allocation  
	  		 From  employee e where (e.exit_date::date >= current_timestamp::date or e.status='A')
				Order By e.id)
				) as id_date where total_percentage_allocation < 100 and  total_percentage_allocation >= 0 
				)`


	// 	query += ` and e.id in (select id from (select * from (select e1.id,coalesce(sum(pa.percentage_allocation),0) as total_percentage_allocation  from project_allocation pa , employee e1
	// 				Where pa.employee_id=e1.id and pa.create_allocation_status not in ('Reject','Pending')
	// 				and  pa.planned_release_date::date >= current_timestamp::date
	// 				and ${data.available_from_date}::date between to_char(pa.doa,'yyyy-mm-dd')::date and to_char(pa.planned_release_date,'yyyy-mm-dd')::date  
	// 				group by e1.id) as dummy_table where total_percentage_allocation<100) as data)
	// `

	if (data.employee_name && data.employee_name != "")
		query += ` AND e.name ilike (` + data.employee_name + `)`
	if (data.employment_status && data.employment_status != "")
		query += ` AND e.employment_status ilike (` + data.employment_status + `)`
	if (data.employee_code && data.employee_code != "")
		query += ` AND e.code ilike (` + data.employee_code + `)`
	if (data.designation && data.designation != "")
		query += ` AND e.designation ilike (` + data.designation + `)`
	if ((data.experience_lower && data.experience_lower != 0) || (data.experience_upper && data.experience_upper != 0))
		query += ` AND e.total_experience BETWEEN COALESCE(${data.experience_lower}-(DATE_PART('year', current_timestamp) - DATE_PART('year', e.doj)), e.total_experience) 
				AND COALESCE(${data.experience_upper}-(DATE_PART('year', current_timestamp) - DATE_PART('year', e.doj)), e.total_experience)`
	if (data.primary_skill && data.primary_skill != "")
		query += ` AND ` + data.primary_skill + ` in ( select ps.name as primary_skill
							FROM employee e2 ,employee_skill_map esm , primary_skill ps
							WHERE esm.primary_skill_id = ps.id
							AND esm.employee_id=e2.id
							AND e2.id=e.id )`
	if (data.secondary_skill && data.secondary_skill != "")
		query += ` AND ` + data.secondary_skill + ` in (select ss.name as secondary_skill
								FROM employee e2 ,employee_skill_map esm , secondary_skill ss
								WHERE esm.secondary_skill_id = ss.id
								AND esm.employee_id=e2.id
								AND e2.id=e.id)`
	if (data.location_city && data.location_city != "")
		query += ` AND ` + data.location_city + ` in (select distinct l.city from employee e3 , location l 
									where e3.location_id=l.id and e3.id=e.id )`
	if (data.location_area && data.location_area != "")
		query += ` AND ` + data.location_area + ` in (select distinct l.area from employee e4 , location l 
									where e4.location_id=l.id and e4.id=e.id)`

	if (data.std_billing_rate && data.std_billing_rate != "")
		query += ` AND e.std_billing_rate = COALESCE(${data.std_billing_rate},e.std_billing_rate ) `

	if (data.min_billing_rate && data.min_billing_rate != "")
		query += ` AND e.min_billing_rate =  COALESCE(${data.min_billing_rate},e.min_billing_rate) `

	if (data.avg_billig_rate && data.avg_billig_rate != "")
		query += ` AND e.average_billing_rate = COALESCE(${data.avg_billig_rate},e.average_billing_rate) `

	if (data.if_in_project_screen === "true") {
		query += ` AND e.name not in (select distinct e.name from project_allocation pa, project p,employee e  
						   WHERE pa.project_id = p.id 
						   AND pa.employee_id = e.id  
						   AND (e.exit_date::date >= current_timestamp::date or e.status='A')
						   AND p.name='${data.project_name})'`
	}

	query += ` GROUP BY e.id 
			ORDER BY e.modified_dtm
		`
	return query
}




// export class ResourceSearch{
//     employee_code: string
//     employee_name: string
//     designation: string
//     years_of_experience_low: number
//     years_of_experience_high: number
//     primary_skill: string
//     secondary_skill: string
//     employment_status: string
//     location_city: string
//     location_area:string
//     std_billing_rate: number
//     min_billing_rate: number
//     avg_billig_rate: number  
//     available_from_date:Date
//     allocation_type:string
//     //unallocated, allocated,partially_allocated
//   }
//For Request New Hire Screen
exports.InsertRequestNewHireQuery=function (data){

				return `insert into request_new_hire
				(
				project_id,
				primary_skill_id,
				secondary_skill_id,

				domain_skill_id,
				
				designation,

				count,
				job_description,
				location_id,
				status,
				year_of_experience_upper,
				year_of_experience_lower,

				created_dtm,
				created_by_id				
				)

				values

				(
				(select distinct id from project where name='${data.project_name}' limit 1),
				(select distinct id from primary_skill where name='${data.primary_skill}' limit 1),
				(select distinct id from secondary_skill where name='${data.secondary_skill}' limit 1),
				
				(select distinct id from domain_skill where name='${data.domain_skill}' limit 1),
				
				'${data.designation}',

				${data.count},
				'${data.job_description}',
				(select distinct id from location where city='${data.city}' and area = '${data.area}' limit 1),
				'Pending',
				${data.experience_upper},
				${data.experience_lower},

				'${data.created_dtm}',
				${data.created_by_id}

				) returning id;`
	}



exports.UpdateRequestNewHireQuery=function (data){

				return `
					Update request_new_hire 
					SET 
					remark = '${data.remark}',
					status = '${data.status}',
					modified_by_id = ${data.modified_by_id},
					modified_date = '${data.modified_date}'
					WHERE id = ${data.id}



				`
	}


exports.SelectRequestNewHireQuery=function (id){

				return `
						SELECT  rnh.id,
								p.name as project_name,
								ps.name as primary_skill,
								ss.name as secondary_skill,
								ds.name as domain_skill,
								rnh.year_of_experience_upper as experience_upper,
								rnh.year_of_experience_lower as experience_lower,
								rnh.designation,
								rnh.count,
								rnh.mrf_file_name,
								rnh.job_description,
								l.area,
								l.city

						FROM  request_new_hire rnh,
								project p,
								primary_skill ps,
								secondary_skill ss,
								location l,
								domain_skill ds
						WHERE   rnh.project_id = p.id
						AND     rnh.primary_skill_id = ps.id 
						AND     rnh.secondary_skill_id = ss.id 
						AND     rnh.location_id = l.id
						AND     rnh.domain_skill_id = ds.id
						AND     rnh.id = ${id}



				`
	}





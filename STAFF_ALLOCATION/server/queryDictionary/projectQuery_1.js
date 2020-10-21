exports.CreateProjectQuery=function (data){

	return `
			insert into project 
			(
				
				name,
				description,
				code,
				location_id,
				manager,
				department_id,
				start_date,
				end_date,
				billing_start_date,
				billing_end_date,
				billing_type,
				project_value,
				client_id,
				currency,
				account_owner,
				delivery_owner,
				nature,
				finance_owner,
				created_by_id,
				created_dtm,
				status

			)
			values
			(
				
				'${data.name}',
				'${data.description}',
				'${data.code}',
				(select DISTINCT l.id from location l WHERE l.area ilike '${data.area}' 
						and l.city ilike '${data.city}' and l.country ilike '${data.country}' limit 1),
				(select DISTINCT u.id from public.user u , project p,role r  
						where p.manager=u.id 
						and u.role_id=r.id
						and r.name='delivery'
						and u.name ilike '${data.manager}'
						limit 1 ),
				(select DISTINCT d.id from department d where d.name ilike '${data.department}' limit 1),
				'${data.start_date}',
				'${data.end_date}',
				'${data.billing_start_date}',
				'${data.billing_end_date}',
				'${data.billing_type}',
				${data.project_value},
				(select DISTINCT c.id from client c where c.name ilike '${data.client}'),
				'${data.currency}',
				(select DISTINCT u.id from public.user u , project p,role r  
						where p.account_owner=u.id 
						and u.role_id=r.id
						and r.name='delivery'
						and u.name ilike '${data.account_owner}'
						limit 1 ),
				(select DISTINCT u.id from public.user u , project p,role r  
						where p.delivery_owner=u.id 
						and u.role_id=r.id
						and r.name='delivery'
						and u.name ilike '${data.delivery_owner}'
						limit 1 ),
				'${data.nature}',
				(select DISTINCT u.id from public.user u , project p,role r  
						where p.finance_owner=u.id 
						and u.role_id=r.id
						and r.name='finance'
						and u.name ilike '${data.finance_owner}'
						limit 1 ),
				${data.created_by_id},
				'${data.created_dtm}',
				'A'

			) returning * ;

	`

}


exports.UpdateProjectQuery=function (id,data){

	return `
			update project 
			set
				name = '${data.name}',
				description = '${data.description}',
				code = '${data.code}',

				location_id = (select DISTINCT l.id from location l,project p where p.location_id=l.id and l.area ilike '${data.area}' 
						and l.city ilike '${data.city}' and l.country ilike '${data.country}'),

				manager = (select DISTINCT u.id from public.user u , project p,role r  
						where p.manager=u.id 
						and u.role_id=r.id
						and r.name='delivery'
						and u.name ilike '${data.manager}'
						),

				department_id = (select DISTINCT d.id from department d, project p where p.department_id=d.id and d.name ilike '${data.department}'),
				start_date = '${data.start_date}',
				end_date = '${data.end_date}',
				billing_start_date = '${data.billing_start_date}',
				billing_end_date = '${data.billing_end_date}',
				billing_type = '${data.billing_type}',
				project_value = ${data.project_value},
				client_id = (select DISTINCT c.id from client c, project p where p.client_id=c.id and c.name ilike '${data.client}'),
				currency = '${data.currency}',
				account_owner = (select DISTINCT u.id from public.user u , project p,role r  
						where p.account_owner=u.id 
						and u.role_id=r.id
						and r.name='delivery'
						and u.name ilike '${data.account_owner}'
						),
				delivery_owner = (select DISTINCT u.id from public.user u , project p,role r  
						where p.delivery_owner=u.id 
						and u.role_id=r.id
						and r.name='delivery'
						and u.name ilike '${data.delivery_owner}'
						),
				nature = '${data.nature}',
				finance_owner  = (select DISTINCT u.id from public.user u , project p,role r  
						where p.finance_owner=u.id 
						and u.role_id=r.id
						and r.name='finance'
						and u.name ilike '${data.finance_owner}'
						),
				modified_by_id = '${data.modified_by_id}' ,
				modified_dtm  = '${data.modified_dtm}'
				where id=${id}




	`

}

exports.SelectProjectByIdQuery=function (id){

	return `

			select
				p.id,
				p.name,
				p.description,
				p.code,
				l.city,
				l.area,
				l.country,
				(select DISTINCT u.name from public.user u, project p where 
					p.manager=u.id and p.id=${id}
				) as manager,
				d.name as department,
				p.start_date,
				p.end_date,
				p.billing_start_date,
				p.billing_end_date,
				p.billing_type,
				p.project_value,
				c.name as client,
				p.currency,

				(select DISTINCT u.name from public.user u, project p where 
					p.account_owner=u.id and p.id=${id}
				) as account_owner,

				(select DISTINCT u.name from public.user u, project p where 
					p.delivery_owner=u.id and p.id=${id}
				) as delivery_owner,
				p.nature,
				(select DISTINCT u.name from public.user u, project p where 
					p.finance_owner=u.id and p.id=${id}
				) as finance_owner

			FROM project p, location l, department d,
				client c, public.user u 
			WHERE p.location_id = l.id
			AND   p.department_id = d.id
			AND   p.client_id = c.id
			AND   p.manager=u.id
			AND p.id=${id} 
			order by p.id `

}
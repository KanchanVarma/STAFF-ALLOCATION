exports.CreateProjectQuery=function (data){

	var query= `insert into project 
			(
				
				name,
				code,
				manager, 
				finance_owner,
				created_by_id, 
				created_dtm, 
				status,
				delivery_owner,
				account_owner,
				modified_dtm,
				modified_by_id

				`
				if((data.description !=undefined))
					query+=`,description `

				if((data.area && data.city!=undefined))
					query+=`,location_id `

				if((data.department!=undefined))
					query+=`,department_id `

				if((data.start_date!=undefined))
					query+=`,start_date `

				if((data.end_date!=undefined))
					query+=`,end_date `

				if((data.billing_start_date!=undefined))
					query+=`,billing_start_date `

				if((data.billing_end_date!=undefined))
					query+=`,billing_end_date `

				if((data.billing_type!=undefined))
					query+=`,billing_type `

				if((data.project_value!=undefined))
					query+=`,project_value `

				if((data.client!=undefined))
					query+=`,client_id `

				if((data.currency!=undefined))
					query+=`,currency `

				if((data.nature!=undefined))
					query+=`,nature `

		query+=`)
				values
			(
				
				'${data.name}'
				,'${data.code}'
				,(select DISTINCT u.id from public.user u ,role r  
					
					where u.role_id=r.id
					and r.name='delivery'
					and u.name ilike '${data.manager}'
					limit 1 )
				,(select DISTINCT u.id from public.user u ,role r  
 
					where u.role_id=r.id
					and r.name='finance'
					and u.name ilike '${data.finance_owner}'
					limit 1 )
				,${data.created_by_id}
				,'${data.created_dtm}'
				,'A'
				,(select DISTINCT u.id from public.user u ,role r  
					where u.role_id=r.id
					and r.name='delivery'
					and u.name ilike '${data.delivery_owner}'
					limit 1 )
				,(select DISTINCT u.id from public.user u , role r  
						where u.role_id=r.id
						and r.name='delivery'
						and u.name ilike '${data.account_owner}'
						limit 1 )
				,'${data.created_dtm}'
				,${data.created_by_id}


				
				`

			if((data.description !=undefined))	
				query+=`,'${data.description}'`
				
			if((data.area!=undefined && data.city!=undefined))
				query+=`,(select DISTINCT l.id from location l WHERE l.area ilike '${data.area}' 
						and l.city ilike '${data.city}' and l.country ilike '${data.country}' limit 1)`

			if((data.department!=undefined))
				query+=`,(select DISTINCT d.id from department d where d.name ilike '${data.department}' limit 1)`

			if((data.start_date!=undefined))
				query+=`,'${data.start_date}'`

			if((data.end_date!=undefined))
				query+=`,'${data.end_date}'`

			if((data.billing_start_date!=undefined))
				query+=`,'${data.billing_start_date}'`

			if((data.billing_end_date!=undefined))
				query+=`,'${data.billing_end_date}'`

			if((data.billing_type!=undefined))
				query+=`,'${data.billing_type}'`

			if((data.project_value!=undefined))
				query+=	`,${data.project_value}`

			if((data.client!=undefined))
				query+=`,(select DISTINCT c.id from client c where c.name ilike '${data.client}')`

			if((data.currency!=undefined))
				query+=`,'${data.currency}'`

			if((data.nature!=undefined))
				query+=`,'${data.nature}'`

				query+=`
				

			) returning id`
			console.log("/*********************************",query)
			
return query

}



exports.UpdateProjectQuery=function (id,data){

	query = `
			update project 
			set `
				if(data.name!= undefined)
					query+=`name = '${data.name}'`
				if(data.description!=undefined)
					query+=`,description = '${data.description}'`
				if(data.code!=undefined)
					query+=`, code = '${data.code}'`
				if((data.area!=undefined && data.city!=undefined))
					query+=`,location_id = (select DISTINCT l.id from location l,project p where p.location_id=l.id and l.area ilike '${data.area}' 
							and l.city ilike '${data.city}' and l.country ilike '${data.country}')`
				if(data.manager!=undefined)
					query+=`,manager = (select DISTINCT u.id from public.user u , project p,role r  
							 where u.role_id=r.id
							and r.name='delivery'
							and u.name ilike '${data.manager}' limit 1
							)`

				if(data.department!=undefined)		
					query+=`,department_id = (select DISTINCT d.id from department d, project p where p.department_id=d.id and d.name ilike '${data.department}')`

				if(data.start_date!=undefined)
					query+=`,start_date = '${data.start_date}'`

				if(data.end_date!=undefined)
					query+=`,end_date = '${data.end_date}'`

				if(data.billing_start_date!=undefined)
					query+=`,billing_start_date = '${data.billing_start_date}'`

				if(data.billing_end_date!=undefined)
					query+=`,billing_end_date = '${data.billing_end_date}'`

				if(data.billing_type!=undefined)
					query+=`,billing_type = '${data.billing_type}'`

				if(data.project_value!=undefined)
					query+=`,project_value = ${data.project_value}`

				if(data.client!=undefined)
					query+=`,client_id = (select DISTINCT c.id from client c where c.name = '${data.client}' limit 1)`

				if(data.currency!=undefined)
					query+=`,currency = '${data.currency}'`

				if(data.account_owner!=undefined)
					query+=`,account_owner = (select DISTINCT u.id from public.user u , project p,role r  
							 where u.role_id=r.id
							and r.name='delivery'
							and u.name ilike '${data.account_owner}' limit 1
							)`

				if(data.delivery_owner!=undefined)
					query+=`,delivery_owner = (select DISTINCT u.id from public.user u , project p,role r  
							 where u.role_id=r.id
							and r.name='delivery'
							and u.name ilike '${data.delivery_owner}' limit 1
							)`

				if(data.nature!=undefined)
					query+=`,nature = '${data.nature}'`

				if(data.finance_owner!=undefined)
					query+=`,finance_owner  = (select DISTINCT u.id from public.user u , project p,role r  
							 where u.role_id=r.id
							and r.name='finance'
							and u.name ilike '${data.finance_owner}' limit 1
							)`
				modified_by_id = `,'${data.modified_by_id}'` 
				modified_dtm  = `,'${data.modified_dtm}'`
				query+=` where id=${id}

	`
  return query
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

			FROM project p left join location l on (p.location_id = l.id) left join department d on (p.department_id = d.id)
			 left join 	client c on (p.client_id = c.id), public.user u   
			WHERE   p.manager=u.id
			AND p.id=${id} 
			order by p.id `

}
exports.HrDashboardDataQuery=function (userId){

		return `
						SELECT DISTINCT
							e.id,
							e.name,
							e.code,
							p.name as project,
							(select pa.percentage_allocation from project_allocation pa,employee e1 
								where pa.employee_id=e1.id and e1.id=e.id and pa.create_allocation_status not in ('Reject','Pending') 
								and pa.status not in('Reject','Pending') 
								and pa.planned_release_date::date >= current_timestamp::date limit 1),
							pa.doa,
							pa.planned_release_date ,
							e.modified_dtm

						FROM   employee e left join project_allocation pa on (pa.employee_id = e.id) left join project p on (pa.project_id = p.id) , public.user u
						WHERE e.recruiters_id = u.id
						AND   u.id =${userId}
						AND   (e.exit_date::date >= current_timestamp::date or e.status='A')
						order by e.modified_dtm DESC `

}


exports.FinanceDashboardDataQuery=function (userId){

		return `
					SELECT DISTINCT
						p.id,
						p.name,
						p.code,
						p.start_date,
						p.end_date,
						c.name as client,
						p.modified_dtm
					FROM  project p left join  client c on (p.client_id = c.id) , public.user u 
					WHERE   p.finance_owner = u.id
					AND   u.id =${userId}
					order by p.modified_dtm  DESC`

}
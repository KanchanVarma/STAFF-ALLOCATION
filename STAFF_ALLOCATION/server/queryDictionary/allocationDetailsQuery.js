exports.AllocationDetailsForProjectQuery=function (id){

	return `
				SELECT DISTINCT pa.id,
					e.name,
					e.code as employee_code,
					p.code as project_code,
					pa.doa,
					pa.status,
					pa.create_allocation_status,
					pa.modify_allocation_status,
					pa.release_allocation_status,
					pa.planned_release_date,
					pa.percentage_allocation,
					pa.modified_date,
					(select coalesce(sum(pa.percentage_allocation),0)  from project_allocation pa , employee e1 
						Where pa.employee_id=e1.id and e1.id=e.id 
						AND pa.doa::date <= current_timestamp::date
						AND pa.planned_release_date::date >= current_timestamp::date
						 and pa.create_allocation_status not in ('Reject','Pending')) as total_percentage_allocation
				FROM project_allocation pa, employee e , project p
				WHERE pa.employee_id=e.id
				AND   pa.project_id = p.id
				AND   pa.project_id= ${id}
				AND   (pa.status='Approve' or pa.status='Pending' or pa.status='Reject')
				AND   pa.create_allocation_status not in ('Reject')
				--and pa.planned_release_date::date >= current_timestamp::date 
				AND 
				(
				(date_part('month',pa.planned_release_date::date) = date_part('month',current_timestamp::date) 
				AND 
				(date_part('year',pa.planned_release_date::date) = date_part('year',current_timestamp::date))) 
				OR 
				((date_part('year',pa.planned_release_date::date) >= date_part('year',current_timestamp::date)) 
				AND 
				((current_timestamp::date between pa.doa and pa.planned_release_date::date) OR ( pa.doa::date >= current_timestamp::date))) 
				) 
				AND   (e.exit_date::date >= current_timestamp::date or e.status='A')
				ORDER BY pa.modified_date DESC;

	`

}

exports.AllocationDetailsForResourceQuery=function (id){

	return `
				SELECT DISTINCT
					pa.id,
					p.name,
					
					e.code as employee_code,
					p.code as project_code,
					pa.doa,
					pa.status,
					pa.create_allocation_status,
					pa.modify_allocation_status,
					pa.release_allocation_status,
					pa.planned_release_date,
					pa.percentage_allocation,
					pa.modified_date,
					(select coalesce(sum(pa.percentage_allocation),0)  from project_allocation pa , employee e1 
						Where pa.employee_id=e1.id and e1.id=e.id 
						AND pa.doa::date <= current_timestamp::date
						AND pa.planned_release_date::date >= current_timestamp::date
						 and pa.create_allocation_status not in ('Reject','Pending')) as total_percentage_allocation
				FROM project_allocation pa , employee e ,project p
				WHERE pa.employee_id = e.id
				AND   pa.project_id = p.id
				AND   pa.employee_id =${id}
				AND   (e.exit_date::date >= current_timestamp::date or e.status='A')
				AND   (pa.status='Approve' or pa.status='Pending' or pa.status='Reject')
				AND   pa.create_allocation_status not in ('Reject')
				--and pa.planned_release_date::date >= current_timestamp::date 
				AND 
				(
				(date_part('month',pa.planned_release_date::date) = date_part('month',current_timestamp::date) 
				AND 
				(date_part('year',pa.planned_release_date::date) = date_part('year',current_timestamp::date))) 
				OR 
				((date_part('year',pa.planned_release_date::date) >= date_part('year',current_timestamp::date)) 
				AND 
				((current_timestamp::date between pa.doa and pa.planned_release_date::date) OR ( pa.doa::date >= current_timestamp::date))) 
				) 
				ORDER BY pa.modified_date DESC;

	`

}
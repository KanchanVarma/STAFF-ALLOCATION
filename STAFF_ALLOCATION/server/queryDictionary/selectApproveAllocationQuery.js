//selectApproveAllocationQuery



exports.SelectProjectAllocationQuery=function (id){

		return `
				SELECT
					pa.id,
					e.name as employee_name,
					p.description,
					e.designation,
					p.start_date,
					p.end_date,
					p.billing_type,
					p.name as project_name,
					pa.billing_rate,
					pa.billing_status,
					l.city,
					l.area,
					pa.onsite_offshore,
					pa.doa,
					p.code as project_code,
					pa.planned_release_date,
					pa.percentage_allocation,
					p.start_date,
					p.end_date,
					pa.status




				FROM project_allocation pa,
					project p,
					employee e,
					location l

				WHERE pa.project_id = p.id
				AND   pa.employee_id = e.id
				AND   pa.location_id = l.id
				AND   pa.id=${id}
				AND   (e.exit_date::date >= current_timestamp::date or e.status='A');

		`

}


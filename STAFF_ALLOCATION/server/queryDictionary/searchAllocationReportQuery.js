//searchAllocationReportQuery



exports.SearchAllocationReportQuery = function (data) {

	var compareDate = data.year + '-' + data.month + '-01'
	var lastDate = `(SELECT (date_trunc('MONTH', '${compareDate}'::date) + INTERVAL '1 MONTH - 1 day')::DATE)`
	var firstDate = `(SELECT (date_trunc('MONTH', '${compareDate}'::date))::DATE)`
	console.log("compareDate :", compareDate)
	console.log("firstDate :", firstDate)
	console.log("lastDate :", lastDate)

	var noOfDaysInMonth = `(SELECT  
    DATE_PART('days', 
        DATE_TRUNC('month', '${compareDate}'::date) 
        + '1 MONTH'::INTERVAL 
        - '1 DAY'::INTERVAL
    ))`



	var query = `
			
SELECT emp_code,
	emp_status,
	emp_name,
	dep_name,
	proj_name,
	proj_code,
	proj_start_date,
	proj_end_date,
	client_name,
	proj_manager,
	del_owner,
	doa,
	planned_release_date,
	onsite_offshore,
	bill_status,
	bill_rate,
	bill_type,
	loc_city,
	loc_area,
	CASE WHEN (sum_alloc_percent > 0) THEN percent_project_allocation/sum_alloc_percent ELSE 0 END AS sal_alloc,
	percent_project_allocation/100 as alloc_percent
  
  FROM
  (SELECT emp_code,
	emp_status,
	emp_name,
	dep_name,
	proj_name,
	proj_code,
	proj_start_date,
	proj_end_date,
	client_name,
	proj_manager,
	del_owner,
	doa,
	planned_release_date,
	onsite_offshore,
	bill_status,
	bill_rate,
	bill_type,
	loc_city,
	loc_area,
	percentage_allocation,
	availability,
	percent_project_allocation,
	(SUM(percent_project_allocation) OVER (PARTITION BY (emp_code))) AS sum_alloc_percent
   
  FROM
  (SELECT emp_code,
	emp_status,
	emp_name,
	dep_name,
	proj_name,
	proj_code,
	proj_start_date,
	proj_end_date,
	client_name,
	proj_manager,
	del_owner,
	doa,
	planned_release_date,
	onsite_offshore,
	bill_status,
	bill_rate,
	bill_type,
	loc_city,
	loc_area,
	percentage_allocation,
	availability,
	(percentage_allocation * availability)/100 AS percent_project_allocation
   
  FROM
	(SELECT e.code AS emp_code,
		e.exit_date,
		CASE WHEN (e.status='N') THEN (CASE WHEN (e.exit_date>=current_timestamp::date) THEN ('A') 
						WHEN (e.exit_date<current_timestamp) THEN ('N') END) 
					ELSE ('A') END as emp_status,
		
	e.name AS emp_name,
	d.name as dep_name,
	p.name AS proj_name,
	p.code AS proj_code,
	p.start_date as proj_start_date,
	p.end_date as proj_end_date,
	c.name as client_name,
	u.name as proj_manager,
	u1.name as del_owner,
	pa.doa,
	pa.planned_release_date,
	pa.onsite_offshore AS onsite_offshore,
	pa.billing_status AS bill_status,
	pa.billing_rate AS bill_rate,
	p.billing_type AS bill_type,
	l.city AS loc_city,
	l.area AS loc_area,
	pa.percentage_allocation AS percentage_allocation,
	CASE WHEN (pa.planned_release_date::date > ${lastDate}::date) THEN ((LEAST((DATE_PART('day', ${lastDate}::timestamp - pa.doa::date::timestamp) + 1), (DATE_PART('day', DATE_TRUNC('month', ${firstDate}::date) + '1 MONTH'::INTERVAL - '1 DAY'::INTERVAL)))/
  (DATE_PART('day', DATE_TRUNC('month', ${firstDate}::date) + '1 MONTH'::INTERVAL - '1 DAY'::INTERVAL))) * 100)
  WHEN (pa.doa::date < ${firstDate}::date) THEN ((LEAST((DATE_PART('day', pa.planned_release_date::date::timestamp - ${firstDate}::timestamp) + 1), (DATE_PART('day', DATE_TRUNC('month', ${firstDate}::date) + '1 MONTH'::INTERVAL - '1 DAY'::INTERVAL)))/
  (DATE_PART('day', DATE_TRUNC('month', ${firstDate}::date) + '1 MONTH'::INTERVAL - '1 DAY'::INTERVAL))) * 100)
  ELSE ((LEAST((DATE_PART('day', pa.planned_release_date::date::timestamp - pa.doa::date::timestamp) + 1), (DATE_PART('day', DATE_TRUNC('month', ${firstDate}::date) + '1 MONTH'::INTERVAL - '1 DAY'::INTERVAL)))/
  (DATE_PART('day', DATE_TRUNC('month', ${firstDate}::date) + '1 MONTH'::INTERVAL - '1 DAY'::INTERVAL))) * 100)
  END
   AS availability
   
  FROM
	employee e,
	project p,
	project_allocation pa,
	location l,
	public.user u,
	public.user u1,
	department d,
	client c
  
  WHERE
	e.id = pa.employee_id
	AND p.id = pa.project_id
	AND pa.location_id = l.id
	AND pa.percentage_allocation > 0
	AND date_trunc('month', pa.doa) <= date_trunc('month', ${lastDate}::date)
	AND date_trunc('year', pa.doa) <= date_trunc('year', ${lastDate}::date)
	AND date_trunc('month', pa.planned_release_date) >= date_trunc('month', ${lastDate}::date)
	AND date_trunc('year', pa.planned_release_date) >= date_trunc('year', ${lastDate}::date)
	AND p.department_id = d.id
	AND p.client_id = c.id
	AND p.manager = u.id
	AND p.delivery_owner = u1.id
	AND ((
		e.exit_date :: date > ${lastDate} :: date
		OR e.status = 'A'
		) OR ( (e.exit_date :: date >= ${firstDate} :: date
	AND e.exit_date :: date <= ${lastDate} :: date)		AND ((e.status = 'A') OR (e.status ='N')) 
	
			)
		
		 ) 
	AND pa.create_allocation_status not in ('Reject','Pending')`
   	if (data.project && data.project != "")
		query += ` and p.name = '${data.project}'`
	if (data.department && data.department != "")
		query += ` and p.department_id= ( select d.id from department d where d.name = '${data.department}' limit 1)`
	if (data.client && data.client != "")
		query += ` and p.client_id= (select c.id from client c where c.name = '${data.client}' limit 1)`
	if (data.city && data.city != "")
		query += ` and l.city ilike '%${data.city}%'`
	if (data.area && data.area != "")
		query += ` and l.area ilike '%${data.area}%'`
	if (data.billing_status && data.billing_status != "")
		query += ` and pa.billing_status ilike '%${data.billing_status}%'`
	if (data.reporting_manager && data.reporting_manager != "")
		query += ` and u.name ilike '%${data.reporting_manager}%'`
 query+=` ) AS subqry
  ) AS innerqry
  ) AS outerqry
`



	return query;
}







//for  Projects Data
exports.MyProjectsDataQuery=function (userId){

	return `
	SELECT distinct  a.name as project_name,
	COUNT(project_allocation.employee_id) as resource_count,
	a.code as project_code, 
	a.id as id,
	a.start_date, a.end_date,
	client.name as client,
	a.modified_dtm
FROM project a left join project_allocation ON 
(a.id = project_allocation.project_id AND project_allocation.create_allocation_status not in ('Reject','Pending') and project_allocation.planned_release_date::date >= current_timestamp::date ) left join client on   (a.client_id = client.id ) , public.user u
 
WHERE (a.manager = u.id 
OR a.account_owner = u.id 
OR a.delivery_owner = u.id)
AND u.id = ${userId}
GROUP BY a.id,a.name, a.code, a.start_date, a.end_date, client.name 
ORDER BY a.modified_dtm DESC;
					`

}

//for  Resource Data
exports.MyResourcesDataQuery=function (userId){

	return `
			SELECT distinct  e.id AS resource_id,
				e.code ,
				e.name AS resource_name ,
				p.name AS project,
				p.id as id,
				pa.percentage_allocation,
				pa.doa AS date_of_allocation,
				pa.planned_release_date AS date_of_release,
				e.modified_dtm
			FROM employee e left join project_allocation pa ON (  e.id = pa.employee_id 
				AND pa.create_allocation_status not in ('Reject','Pending') 
				and pa.planned_release_date::date >= current_timestamp::date )  
				left join project p on (pa.project_id = p.id) ,public.user u
			WHERE 
			(p.manager = u.id 
			OR p.account_owner = u.id 
			OR p.delivery_owner = u.id)
			AND u.id=${userId}
			AND p.status='A'
			AND pa.create_allocation_status not in ('Reject','Pending')
			AND   (e.exit_date::date >= current_timestamp::date or e.status='A')
			Order by e.modified_dtm DESC
	`
}

//for  New Project Data
exports.NewProjectDataQuery=function (){

	return `
			select distinct  
			p.name as project_name,
			p.code as project_code,
			c.name as client,
			p.id as id
			from project p
			inner join public.user u on p.created_by_id = u.id
			inner join client c on p.client_id = c.id
			where p.modified_by_id is null and department_id is null
			and delivery_owner is null ;

	`
}


//for  Project Closing In 7 Days
exports.ProjectClosingIn15DaysDataQuery=function (userId){

if(userId==undefined)
	userId=null
	return `
		SELECT  distinct  p.name AS project_name,
			p.code AS project_code,
			p.start_date,
			p.end_date,
			p.id as id,
			c.name AS client
		FROM project p,client c ,public.user u
		where p.client_id = c.id
		AND (p.manager = u.id 
		OR p.account_owner = u.id 
		OR p.delivery_owner = u.id)
		AND (p.end_date BETWEEN current_timestamp AND current_timestamp+'15 day'::interval)
		AND p.status='A'
		AND u.id=COALESCE(${userId},u.id)
		Order By p.end_date

	`
}

//for Project Starting in 7 days
exports.ProjectStartingIn15DaysDataQuery=function (userId){

if(userId==undefined)
	userId=null
	return `
			SELECT distinct  p.name AS project_name,
				p.code as project_code,
				p.start_date,
				p.end_date,
				p.id as id,
				(select c.name AS client from client c,project p1 where p1.client_id=c.id and p1.id=p.id limit 1)
			FROM project p,public.user u
			WHERE (p.manager = u.id 
			OR p.account_owner = u.id 
			OR p.delivery_owner = u.id)
			AND (p.start_date BETWEEN current_timestamp AND current_timestamp+'15 day'::interval)
			AND p.status='A'
			AND u.id=COALESCE(${userId},u.id)
			Order by p.start_date

	`
}


//for Resource Releasing  In 7 Days
exports.ResourceReleasingIn15DaysDataQuery=function (userId){

if(userId==undefined)
	userId=null
	return `
			SELECT distinct e.id AS resource_id,
				e.code,
				e.name  AS resource_name,
				p.name  AS project,
				p.id as id,
				pa.percentage_allocation,	
				pa.doa  AS date_of_allocation,
				pa.planned_release_date AS date_of_release
			FROM project_allocation pa ,employee e ,public.user u, project p 
			where e.id = pa.employee_id
			AND pa.created_by_id = u.id
			AND  pa.project_id = p.id 
			AND (p.manager = u.id 
			OR p.account_owner = u.id 
			OR p.delivery_owner = u.id)
			AND (pa.planned_release_date BETWEEN current_timestamp and current_timestamp+'15 day'::interval)
			AND pa.create_allocation_status not in ('Reject','Pending') 
			AND u.id=COALESCE(${userId},u.id)
			AND p.status='A'
			AND   (e.exit_date::date >= current_timestamp::date or e.status='A')
			order by pa.planned_release_date

	`
}



exports.ResourceCalenderDataQuery=function (){
	query=
			`SELECT distinct e.id,
			e.code,
				e.name,
				p.name project_name,
				pa.planned_release_date::date+'1 Day'::interval as planned_release_date
			FROM  project_allocation pa, employee e,project p
			WHERE pa.employee_id = e.id
			AND pa.project_id = p.id
			AND  pa.planned_release_date::date >= current_timestamp::date
			AND pa.create_allocation_status not in ('Reject','Pending') 
			and pa.planned_release_date::date >= current_timestamp::date 
			AND (e.exit_date::date >= current_timestamp::date or e.status='A')
			GROUP BY e.id,pa.planned_release_date,p.name
			ORDER BY pa.planned_release_date::date+'1 Day'::interval
	 ;`
	
		return query
	}
	

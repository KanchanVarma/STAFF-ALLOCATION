exports.ProjectAllocationForCOEQuery=function (){

    return `/*select	DISTINCT                
                    e.id,
                    e.code as employee_code,
                    e.name ,
                    e.designation,
                    e.relevant_experience,
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
    100-sum(pa.percentage_allocation) as percentage_allocation
    
From project_allocation pa, employee e 
Where pa.employee_id=e.id
AND current_timestamp BETWEEN pa.doa-'1 day'::interval AND pa.planned_release_date+'1 day'::interval
Group by  e.id*/



select * from (select	DISTINCT                
                    e.id,
                    e.code as employee_code,
                    e.name ,
                    e.designation,
                    e.relevant_experience,
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
		   100-(select coalesce(sum(pa.percentage_allocation),0)  from project_allocation pa , employee e1 
        Where pa.employee_id=e1.id and pa.create_allocation_status not in ('Reject','Pending') 
        and pa.doa::date <= current_timestamp::date
        and pa.planned_release_date::date >= current_timestamp::date
         and e1.id=e.id 
         AND   (e.exit_date::date >= current_timestamp::date or e.status='A') ) as percentage_allocation
From  employee e 
Order By e.name  ) as temp_report
where percentage_allocation > 0



`

}
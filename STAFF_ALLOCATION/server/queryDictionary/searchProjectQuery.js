


//for  Projects Data
exports.SearchProjectsDataQuery=function (jsonData){

    var query= `SELECT p.id,p.name as project_name,p.code as project_code,
    p.start_date,p.end_date,p.nature as nature_of_project,
    c.name as client,
    l.city,l.area,
    COUNT(pa.employee_id) as resource_count 
    FROM project p left join project_allocation pa on (p.id=pa.project_id AND pa.create_allocation_status not in ('Reject','Pending') and pa.planned_release_date::date >= current_timestamp::date ) left join location l on ( p.location_id=l.id) 
     left join client c on (c.id=p.client_id)
     WHERE 
    p.status='A'  `
    if(jsonData.project_name &&  jsonData.project_name!="")
        query+=`and p.name ilike '%${jsonData.project_name}%'`
    if(jsonData.start_date &&  jsonData.start_date!="")
        query+=`and p.start_date >= '${jsonData.start_date}'`
    if(jsonData.end_date &&  jsonData.end_date!="")
        query+=`and p.end_date <= '${jsonData.end_date}'`
    if(jsonData.nature &&  jsonData.nature!="")
        query+=`and p.nature ilike '%${jsonData.nature}%'`
    if(jsonData.client &&  jsonData.client!="")
        query+=`and p.client_id in (select DISTINCT c.id from client c, project n where n.client_id=c.id and c.name ilike '%${jsonData.client}%')`
    if((jsonData.city &&  jsonData.city!="") && jsonData.area &&  jsonData.area!="")
        query+=`and p.location_id in (select DISTINCT l.id from location l,project p where p.location_id=l.id and l.area ilike '%${jsonData.area}%' 
        and l.city ilike '%${jsonData.city}%')`
    else if((jsonData.city &&  jsonData.city!=""))
        query+=`and p.location_id in (select DISTINCT l.id from location l,project p where p.location_id=l.id 
            and l.city ilike '%${jsonData.city}%')`
    else if(jsonData.area &&  jsonData.area!="")
        query+=`and p.location_id in (select DISTINCT l.id from location l,project p where p.location_id=l.id 
             and l.area ilike '%${jsonData.area}%')`
    if(jsonData.project_code &&  jsonData.project_code!="")
        query+=`and p.code ilike '%${jsonData.project_code}%'`
    

    query+=`GROUP BY p.id,p.code,p.name,p.start_date,p.end_date,p.nature,c.name,l.city,l.area
            ORDER BY  p.modified_dtm DESC`
    console.log("Query ",query)

    return query

}
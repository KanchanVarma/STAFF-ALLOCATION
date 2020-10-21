
export class ActiveProjects {
    project_name:string
    project_code: number 
    start_date: Date 
    end_date: Date 
    client: string 
    resource_count: number
    //Search
    city:string
    area:string
    nature_of_project:string
 }
 export class ActiveResources {
   resource_name:string
   project: string 
   percentage_allocation: number 
   date_of_allocation: Date 
   date_of_release: Date
 }
 
 export class RequestList {
    resource_name:string
    requestor: string 
    type_of_request: number 
    date_submitted: Date 
  }

  export class ResourceSearch{
    employee_code: string
    employee_name: string
    designation: string
    years_of_experience: string
    primary_skill: string
    secondary_skill: string
    employment_status: string
    location_city: string
    location_area:string
    std_billing_rate: number
    min_billing_rate: number
    avg_billig_rate: number  
    available_from_date:Date
    allocation_type:string
    if_in_project_screen:string
    project_name:string
    experience_lower:number
    experience_upper:number
    //unallocated, allocated,partially_allocated
  }
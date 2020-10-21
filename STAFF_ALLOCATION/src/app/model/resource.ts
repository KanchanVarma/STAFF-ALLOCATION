export class Resource {
    id: number
    code: string
    name: string
    designation: string
    grade: string
    gender: string
    doj: Date
    dob: Date
    education: string
    certification: string
    total_experience: number
    relevant_experience: number
    email_id: string
    contact: string
    status: string
    employment_status: string
    std_billing_rate: number
    min_billing_rate: number
    average_billig_rate: number
    city:string
    area:string
    recruiters_name: string
    exit_date: Date
    created_by_id: number
    created_dtm: Date
    modified_by_id: number
    modified_dtm: Date
    domain: string
    levelofexpertise:string

}

export class EmployeeSkillMap {
    id: number
    employee_id: number
    primary_skill_id: number
    secondary_skill_id: number
    levelofexpertise: string
    status: string
    created_by_id: number
    created_dtm: Date
    modified_by_id: number
    modified_dtm: Date
}

export class EmployeeDomainMap {
    id: number
    employee_id: number
    domain_id: number
    status: string
    created_by_id: number
    created_dtm: Date
    modified_by_id: number
    modified_dtm: Date
}
export class EmployeeSearch{
    domain:string
    id: number
    code: string
    name: string
    designation: string
    grade: string
    gender: string
    doj: Date
    dob: Date
    education: string
    certification: string
    total_experience: number
    relevant_experience: number
    levelofexpertise:number
    email_id: string
    contact: string
    status: string
    employment_status: string
    std_billing_rate: number
    min_billing_rate: number
    avg_billig_rate: number
    average_billing_rate:number
    city: string
    area:string
    recruiters_name: string
    exit_date: Date
    created_by_id: number
    created_dtm: Date
    modified_by_id: number
    secondary_skill:string
    primary_skill:string
    years_of_experience:number
    available_from_date:Date
    modified_dtm :Date
    // skill_id:number
    file_name:string
}




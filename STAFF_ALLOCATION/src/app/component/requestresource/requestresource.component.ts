import { Component, ViewChild } from '@angular/core';
import { FormControl, FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import swal from 'sweetalert';
import { AppConstants } from 'src/app/constants/app-constants';

const ELEMENT_DATA: EmployeeElement[] = [
  { employee_name: "EMPLOYEE", employee_code: 'EMP001', primary_skill: 'Java', secondary_skill: "NodeJS", domain: "TEST", total_experience_at_joining: 1 },
  { employee_name: "EMPLOYEE", employee_code: 'EMP001', primary_skill: 'Java', secondary_skill: "NodeJS", domain: "TEST", total_experience_at_joining: 1 },
  { employee_name: "EMPLOYEE", employee_code: 'EMP001', primary_skill: 'Java', secondary_skill: "NodeJS", domain: "TEST", total_experience_at_joining: 1 },
  { employee_name: "EMPLOYEE", employee_code: 'EMP001', primary_skill: 'Java', secondary_skill: "NodeJS", domain: "TEST", total_experience_at_joining: 1 },
  { employee_name: "EMPLOYEE", employee_code: 'EMP001', primary_skill: 'Java', secondary_skill: "NodeJS", domain: "TEST", total_experience_at_joining: 1 },
  { employee_name: "EMPLOYEE", employee_code: 'EMP001', primary_skill: 'Java', secondary_skill: "NodeJS", domain: "TEST", total_experience_at_joining: 1 },
  { employee_name: "EMPLOYEE", employee_code: 'EMP001', primary_skill: 'Java', secondary_skill: "NodeJS", domain: "TEST", total_experience_at_joining: 1 },

];

@Component({
  selector: 'app-requestresource',
  templateUrl: './requestresource.component.html',
  styleUrls: ['./requestresource.component.css']
})



export class RequestresourceComponent {

  @ViewChild("fileInput") cassandraFile;
  myControl = new FormControl();
  options: string[] = ['select', '', ''];
  mRequest: ResourceRequest = new ResourceRequest();
  employeeList: any;
  submitted = false;
  selectedEmp: any;
  dataSource = ELEMENT_DATA;
  reqID: string;
  constructor(public formBuilder: FormBuilder, public httpClient: HttpClient) { }

  uploadForm: FormGroup;
  ngOnInit() {
    this.uploadForm = this.formBuilder.group({
      name: ['',],
      email: ['',],
      cassandraFile: ['',],

    });

  }

  onSubmit() {
    console.log(JSON.stringify({
      primary_skill: this.mRequest.primary_skills,
      domain: this.mRequest.domain,
      designation: this.mRequest.designation,
      total_experience_at_joining: this.mRequest.year_of_experience
    }))

    this.httpClient.post(AppConstants.HOST+'resourceRequest/getResourceList', {
      primary_skill: this.mRequest.primary_skills,
      domain: this.mRequest.domain,
      designation: this.mRequest.designation,
      total_experience_at_joining: this.mRequest.year_of_experience
    }).subscribe(
      res => {
        this.reqID = JSON.parse(JSON.stringify(res)).requestId

        console.log("REQ ID SET :" + this.reqID);
        this.employeeList = JSON.parse(JSON.stringify(res)).data;

        this.submitted = true;
        console.log(this.employeeList);
        console.log(this.employeeList[0].employee_name)
        console.log("Data : " + JSON.stringify(res));

      }
    )
  }


  onRequest() {
    // console.log(this.member)

    this.mRequest.employee_name = this.selectedEmp;
    this.mRequest.request_id = this.reqID;
    console.log("REQ ID SET AND SENT :" + this.reqID);
    console.log("this EMP ID " + this.mRequest.employee_name)
    this.httpClient.post(AppConstants.HOST+'resourceRequest/addRequestAllotment', this.mRequest).subscribe(
      data => {
        // console.log("Data" + data)
        
        swal("Allocated",JSON.parse(JSON.stringify(data)).data,"success")
      }
    )
  }


}

export class ResourceRequest {
  project_code: string
  percent_allocation: number
  start_date: Date
  end_date: Date
  billing_type: string
  billing_rate: number
  onsite_offshore: string
  doa: string
  approval_status: string
  planned_release_date: Date
  remark: string
  billing_status: string
  work_location: string
  client_place: string
  request_id: string
  request_raised_by: string
  primary_skills: string
  domain: string
  job_description: string
  employee_name: string

  designation: string
  year_of_experience: string

}
export interface EmployeeElement {
  employee_name: string;
  employee_code: string;
  primary_skill: string;
  secondary_skill: string;
  domain: string;
  total_experience_at_joining: number;
}
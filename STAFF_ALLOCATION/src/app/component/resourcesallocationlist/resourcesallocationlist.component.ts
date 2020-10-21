import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Data } from '@angular/router';
import { AppComponent } from 'src/app/app.component';
import { AppConstants } from 'src/app/constants/app-constants';
import { PickDateAdapter, PICK_FORMATS } from 'src/app/constants/date-adaptor';
import { DateAdapter,MAT_DATE_FORMATS } from '@angular/material';

export interface PeriodicElement {
  Resource: string;
  Project: string;
  position: number;
  allocation: number;
}


const ELEMENT_DATA: PeriodicElement[] = [
  { position: 1, Resource: 'Hydrogen', Project: '', allocation: 60 },
  { position: 2, Resource: 'Helium', Project: '', allocation: 50 },
  { position: 3, Resource: 'Lithium', Project: '', allocation: 50 },
  { position: 4, Resource: 'Beryllium', Project: '', allocation: 50 },
  { position: 5, Resource: 'Boron', Project: '', allocation: 50 },
  { position: 6, Resource: 'Carbon', Project: '', allocation: 40 },
  { position: 7, Resource: 'Nitrogen', Project: '', allocation: 50 },
  { position: 8, Resource: 'Oxygen', Project: '', allocation: 50 },
  { position: 9, Resource: 'Fluorine', Project: '', allocation: 50 },
  { position: 10, Resource: 'Neon', Project: '', allocation: 50 },
];

@Component({
  selector: 'app-resourcesallocationlist',
  templateUrl: './resourcesallocationlist.component.html',
  styleUrls: ['./resourcesallocationlist.component.css'],
    providers : [{provide: DateAdapter, useClass: PickDateAdapter},
      {provide: MAT_DATE_FORMATS, useValue: PICK_FORMATS}]
})

export class ResourcesallocationlistComponent {
  displayedColumns: string[] = ['position', 'Resource', 'Project', 'allocation'];
  dataSource = ELEMENT_DATA;
  mRequest: ResourceAllocation = new ResourceAllocation();
  constructor(public formBuilder: FormBuilder, public httpClient: HttpClient) { }

  uploadForm: FormGroup;
  ngOnInit() {
    this.uploadForm = this.formBuilder.group({

    });
  }

  onSubmit() {
    // console.log(this.member)
    this.httpClient.post(AppConstants.HOST+'addRequestAllotment', this.mRequest).subscribe(
      data => {
        // console.log("Data" + data)
        alert("Submitted")
      }
    )
  }
}

export class ResourceAllocation {
   project_code: string 
     employee_code: string 
  employee_id: string
  employee_name:string 
  job_description:string
  name:string
  description:string
  project_name:string
  designation:string
  percent_allocation: number 
  start_date: Date
   end_date: Date
   billing_type: string 
   billing_rate: number 
   onsite_offshore: string 
   doa: Date 
   approval_status: string 
   planned_release_date: Date 
   remark: string 
   id: number 
   billing_status: string 
   work_location: string 
   work_area: string 
   work_city: string 
   primary_skill:string
   secondary_skill:string
  client_place: string 
  request_id: number
  city:string
  area:string
  percentage_allocation:number
  rating:string
  feedback:string
  new_doa:any
  new_release_date:any
  new_percentage_allocation:any

} 

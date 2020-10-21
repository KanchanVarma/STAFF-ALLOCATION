import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppConstants } from 'src/app/constants/app-constants';
import { PickDateAdapter, PICK_FORMATS } from 'src/app/constants/date-adaptor';
import { DateAdapter,MAT_DATE_FORMATS } from '@angular/material';

@Component({
  selector: 'app-project-manager-dashboard',
  templateUrl: './project-manager-dashboard.component.html',
  styleUrls: ['./project-manager-dashboard.component.css'],
  providers : [{provide: DateAdapter, useClass: PickDateAdapter},
    {provide: MAT_DATE_FORMATS, useValue: PICK_FORMATS}]

})
export class ProjectManagerDashboardComponent implements OnInit {

  public loading = false;
  p: any;
  ActiveProjects:any 
  // = [{ project_name: "ENIT", project_code: 11, startDate: "--", endDate: "--", nature: "--", client: "--", location: "Mumbai", resourceCount: 2 },
  // { project_name: "SIDBI", project_code: 12, startDate: "--", endDate: "--", nature: "--", client: "--", location: "Mumbai", resourceCount: 2 },
  // { project_name: "CG", project_code: 10, startDate: "--", endDate: "--", nature: "--", client: "--", location: "Mumbai", resourceCount: 2 },
  // { project_name: "Staff Allocation", project_code: 10, startDate: "--", endDate: "--", nature: "--", client: "--", location: "Mumbai", resourceCount: 2 }]

  CloseProjects:any
  //  = [{ name: "ENIT", projectCode: 11, startDate: "--", endDate: "--", nature: "--", client: "--", location: "--", resourceCount: 2 },
  // { name: "SIDBI", projectCode: 12, startDate: "--", endDate: "--", nature: "--", client: "--", location: "--", resourceCount: 2 },
  // ]
  StartProjects:any
  //  = [{ name: "ENIT", projectCode: 11, startDate: "--", endDate: "--", nature: "--", client: "--", location: "--", resourceCount: 2 },
  // { name: "SIDBI", projectCode: 12, startDate: "--", endDate: "--", nature: "--", client: "--", location: "--", resourceCount: 2 },
  // ]

  AssignedResource:any 
  // = [{ name: "Resource1", project: "CG", doa: "--", dor: "--", percent_allocation: 15 },
  // { name: "Resource1", project: "SIDBI", doa: "--", dor: "--", percent_allocation: 10 },
  // { name: "Resource2", project: "CG", doa: "--", dor: "--", percent_allocation: 25 },
  // { name: "Resource3", project: "SIDBI", doa: "--", dor: "--", percent_allocation: 50 },
  // { name: "Resource4", project: "SIDBI", doa: "--", dor: "--", percent_allocation: 33 }
  // ]

  ReleasingResource:any
  //  = [
  //   { name: "Resource3", project: "SIDBI", doa: "--", dor: "--", percent_allocation: 50 },
  //   { name: "Resource4", project: "SIDBI", doa: "--", dor: "--", percent_allocation: 33 }
  // ]
  user_id:any;
  constructor(public httpClient:HttpClient) { 
  }

  ngOnInit() {
    
    var v =localStorage.getItem('LoggedInUser')
    this.user_id = JSON.parse(v).user_id;
this.loading=true;
    this.httpClient.get(AppConstants.HOST+'dash/myProject?user_id='+this.user_id).subscribe(data=>{
      this.ActiveProjects=data
    })
    this.httpClient.get(AppConstants.HOST+'dash/myResource?user_id='+this.user_id).subscribe(data=>{
      this.AssignedResource=data
    })
    this.httpClient.get(AppConstants.HOST+'dash/projectClosingIn15Days?user_id='+this.user_id).subscribe(data=>{
      this.CloseProjects=data
    })
    this.httpClient.get(AppConstants.HOST+'dash/resourceReleasingIn15Days?user_id='+this.user_id).subscribe(data=>{
      this.ReleasingResource=data
    })
    this.httpClient.get(AppConstants.HOST+'dash/projectStartingIn15Days?user_id='+this.user_id).subscribe(data=>{
      this.StartProjects=data
      this.loading=false
    })


  }

}

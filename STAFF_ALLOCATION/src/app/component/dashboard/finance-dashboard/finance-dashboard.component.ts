import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppConstants } from 'src/app/constants/app-constants';
import { PickDateAdapter, PICK_FORMATS } from 'src/app/constants/date-adaptor';
import { DateAdapter,MAT_DATE_FORMATS } from '@angular/material';

@Component({
  selector: 'app-finance-dashboard',
  templateUrl: './finance-dashboard.component.html',
  styleUrls: ['./finance-dashboard.component.css'],
  providers : [{provide: DateAdapter, useClass: PickDateAdapter},
    {provide: MAT_DATE_FORMATS, useValue: PICK_FORMATS}]
})



export class FinanceDashboardComponent implements OnInit {

  public loading = false;
  ProjectsList:any=[]
//   [
//   {name:"ENIT",projectCode:11,startDate:"--",endDate:"--",nature:"--",client:"--",location:"--",resourceCount:2},
//   {name:"SIDBI",projectCode:12,startDate:"--",endDate:"--",nature:"--",client:"--",location:"--",resourceCount:2},
//  ]  
 user_id:any
 p:any;
  constructor(public httpClient:HttpClient) { }

  ngOnInit() {
    this.loading =true
    var v =localStorage.getItem('LoggedInUser')
    this.user_id = JSON.parse(v).user_id;
    
    this.httpClient.get(AppConstants.HOST+'dashb/finance?id='+this.user_id).subscribe(data=>{
      this.ProjectsList=data
      this.loading=false
    })
  }

}

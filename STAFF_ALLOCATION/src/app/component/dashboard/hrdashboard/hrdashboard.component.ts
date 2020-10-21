import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppConstants } from 'src/app/constants/app-constants';
import { PickDateAdapter, PICK_FORMATS } from 'src/app/constants/date-adaptor';
import { DateAdapter,MAT_DATE_FORMATS } from '@angular/material';
@Component({
  selector: 'app-hrdashboard',
  templateUrl: './hrdashboard.component.html',
  styleUrls: ['./hrdashboard.component.css'],
  providers : [{provide: DateAdapter, useClass: PickDateAdapter},
    {provide: MAT_DATE_FORMATS, useValue: PICK_FORMATS}]
})
export class HRDashboardComponent implements OnInit {
  ResourceList: any
  // =[
  //   {name:"Resource3",project:"SIDBI",doa:"--",dor:"--",percent_allocation:50},
  //   {name:"Resource4",project:"SIDBI",doa:"--",dor:"--",percent_allocation:33}
  //   ]
  user_id: any
  p: any;

  public loading = false;
  constructor(public httpClient: HttpClient) { }

  ngOnInit() {
    this.loading=true
    var v = localStorage.getItem('LoggedInUser')
    this.user_id = JSON.parse(v).user_id;
    this.httpClient.get(AppConstants.HOST + 'dashb/hr?id=' + this.user_id).subscribe(data => {
      this.ResourceList = data
      for (var i = 0; i < this.ResourceList.length; i++) {
        if (this.ResourceList[i].percentage_allocation == null || this.ResourceList[i].percentage_allocation == null) {
          this.ResourceList[i].percentage_allocation = 0.00
        }
      }
      this.loading=false
    })

  }

}

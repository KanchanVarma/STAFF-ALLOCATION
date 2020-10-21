import { Component, OnInit, ViewChild } from '@angular/core';
////import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import {  DateAdapter, MatDatepicker } from '@angular/material';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AppConstants } from 'src/app/constants/app-constants';

import { saveAs as importedSaveAs } from "file-saver";
import { PickDateAdapter, PICK_FORMATS } from 'src/app/constants/date-adaptor';
import { MAT_DATE_FORMATS } from '@angular/material';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Component({
  selector: 'app-monthly-allocation-rpt',
  templateUrl: './monthly-allocation-rpt.component.html',
  styleUrls: ['./monthly-allocation-rpt.component.css'],
  providers : [{provide: DateAdapter, useClass: PickDateAdapter},
    {provide: MAT_DATE_FORMATS, useValue: PICK_FORMATS}]
})
export class MonthlyAllocationRptComponent implements OnInit {
  @ViewChild(MatDatepicker) picker;
  date = new FormControl();
  someDate: Date = new Date()
  Report: any=[]
  CityList = []
  AreaList = []
  ClientList = []
  DepartmentList = []
  ProjectList = []
  itemsPerPage:any ='10'
  ProjectManagerList = []
  public loading=false
  showGrid:boolean=false
  billingStats:string[] =['Annuity','T&M','FP','OES','Non-Billable','Billable']
  MonthlyAllocation: MonthlyAllocationReport = new MonthlyAllocationReport()
  constructor(public httpClient: HttpClient) { }

  ngOnInit() {
    this.showGrid=false
    this.loading=true
    this.getDropDowns()
  }

  monthSelected(params) {
    this.someDate = params;

    this.picker.close();
  }

hideGrid()
{
  this.showGrid=false;
}
  getDropDowns() {
    this.httpClient.get(AppConstants.HOST + 'dropdown/getCity').subscribe(
      data => {
        console.log("FETCHED Project Data", data)
        this.CityList = JSON.parse(JSON.stringify(data))
      });

    this.httpClient.get(AppConstants.HOST + 'dropdown/getArea').subscribe(
      data => {
        console.log("FETCHED Project Data", data)
        this.AreaList = JSON.parse(JSON.stringify(data))
      });

    this.httpClient.get(AppConstants.HOST + 'dropdown/getClient').subscribe(
      data => {
        console.log("FETCHED Project Data", data)
        this.ClientList = JSON.parse(JSON.stringify(data))
      });

    this.httpClient.get(AppConstants.HOST + 'dropdown/getDepartment').subscribe(
      data => {
        console.log("FETCHED Project Data", data)
        this.DepartmentList = JSON.parse(JSON.stringify(data))
      })
    this.httpClient.get(AppConstants.HOST + 'dropdown/getRmgProjectData').subscribe(
      data => {
        console.log("FETCHED Project Data", data)
        this.ProjectList = JSON.parse(JSON.stringify(data))
      })
      
    this.httpClient.get(AppConstants.HOST + 'dropdown/getProjectManager').subscribe(
      data => {
        console.log("FETCHED Project Data", data)
        this.ProjectManagerList = JSON.parse(JSON.stringify(data))
        this.loading=false;
      });

  }

  onSearch() {
    this.loading=true
    this.showGrid=true
    var v = localStorage.getItem('LoggedInUser')
    this.MonthlyAllocation.month = this.someDate.getMonth() + 1
    this.MonthlyAllocation.year = this.someDate.getFullYear()
    this.httpClient.post(AppConstants.HOST + 'report/monthlyAllocation', this.MonthlyAllocation).subscribe(
      data => {
        console.log("FETCHED Project Data", data)
        this.Report = JSON.parse(JSON.stringify(data))
        this.loading=false
      });
  }

  ExportToExcel(){
    this.httpClient.post(AppConstants.HOST + 'export/xlsx?filename=Report-'+(this.someDate.getMonth() + 1)+"-"+this.someDate.getFullYear(), { data: this.Report }, { headers: httpOptions.headers, responseType: 'blob', observe: 'response' })
      .subscribe(response => {
        var attachment = response.headers.get("content-disposition")
        var filename = attachment.slice(attachment.indexOf("=") + 2, attachment.length - 1)
        importedSaveAs(response.body, filename);
      },
        error => {
          console.log("Error ", error)
        })
  }

}

export class MonthlyAllocationReport {


  month: number
  year: number
  project: string
  department: string
  client: string
  city: string
  area: string
  billing_status: string
  reporting_manager: string

}
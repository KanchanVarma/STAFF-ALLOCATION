import { Component, OnInit } from '@angular/core';
import { CalendarEvent } from 'angular-calendar/modules/calendar.module';
import {
  startOfDay,
  endOfDay,
  subDays,
  addDays,
  endOfMonth,
  isSameDay,
  isSameMonth,
  addHours
} from 'date-fns';
import swal from 'sweetalert';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AppConstants } from 'src/app/constants/app-constants';
import { PickDateAdapter, PICK_FORMATS } from 'src/app/constants/date-adaptor';
import { DateAdapter,MAT_DATE_FORMATS } from '@angular/material';
const colors: any = {
  red: {
    primary: '#ad2121',
    secondary: '#FAE3E3'
  },
  blue: {
    primary: '#1e90ff',
    secondary: '#D1E8FF'
  },
  yellow: {
    primary: '#e3bc08',
    secondary: '#FDF1BA'
  },
  white: {
    primary: '#ffffff',
    secondary: '#ffffff'

  }
};

@Component({
  selector: 'app-resource-manager-dashboard',
  templateUrl: './resource-manager-dashboard.component.html',
  styleUrls: ['./resource-manager-dashboard.component.css'],
  providers : [{provide: DateAdapter, useClass: PickDateAdapter},
    {provide: MAT_DATE_FORMATS, useValue: PICK_FORMATS}]
})

export class ResourceManagerDashboardComponent implements OnInit {

  public loading = false;
  currentDate: any
  viewDate: Date = new Date();
  view: string = 'month';
  currentDateEvents: any;
  activeDayIsOpen: false;
  p: any;
  events: CalendarEvent[] = [

    // {
    //   start: startOfDay(new Date()),
    //   title: '',

    // },

  ];
  RequestList: any = [
    // {topicName:'finalise_request_resource_hire'}
  ]


  CloseProjects: any = []


  StartProjects: any = []


  ReleasingResource: any = []
  AvailableResourceList: any = []
  user_id: number;
  constructor(public httpClient: HttpClient, public router: Router) { }

  ngOnInit() {

    var v = localStorage.getItem('LoggedInUser')
    this.user_id = JSON.parse(v).user_id;
    this.loading=true
    this.httpClient.get(AppConstants.HOST + 'resourceRequest/getAllocation').subscribe(
      data => {
        this.RequestList = data;
        console.log("*-*-*-*-*-*- :",this.RequestList)
        this.RequestList.sort(function(a,b){
          // Turn your strings into dates, and then subtract them
          // to get a value that is either negative, positive, or zero.
          var d1 = new Date(b.variables.date_submitted.value)
          var d2 = new Date(a.variables.date_submitted.value)
          return  d1.getTime()-d2.getTime() ;
        });
        // console.log(this.RequestList);
        // console.log(this.RequestList[0].resource)
        // console.log("Data : " + JSON.stringify(data));

      }
    )

    this.httpClient.get(AppConstants.HOST + 'dash/projectClosingIn15Days').subscribe(data => {
      this.CloseProjects = data
    })
    this.httpClient.get(AppConstants.HOST + 'dash/resourceReleasingIn15Days').subscribe(data => {
      this.ReleasingResource = data
    })
    this.httpClient.get(AppConstants.HOST + 'dash/projectStartingIn15Days').subscribe(data => {
      this.StartProjects = data
    })
    this.httpClient.get(AppConstants.HOST + 'dash/calender').subscribe(data => {
      var jsonData = JSON.parse(JSON.stringify(data))
      this.events=[]
      this.AvailableResourceList = jsonData
      for (var i = 0; i < jsonData.length; i++) {
        this.events.push({
          start: startOfDay(jsonData[i].planned_release_date),
          title: '',
        })
      }
      this.loading=false
    })
  }

  ShowList(date: Date) {
    // console.log(this.AvailableResourceList)
    console.log("ProjectName:")
    // console.log(this.events)
    this.currentDate = date
    this.currentDateEvents = [];
    for (var i = 0; i < this.AvailableResourceList.length; i++) {
      // console.log(startOfDay(this.AvailableResourceList[i].planned_release_date))
      // console.log(startOfDay(this.AvailableResourceList[i].planned_release_date).toDateString() == startOfDay(date).toDateString())
      if (startOfDay(this.AvailableResourceList[i].planned_release_date).toDateString() == startOfDay(date).toDateString()) {
        // console.log("PUSHED")
        this.currentDateEvents.push({code:this.AvailableResourceList[i].code, employee: this.AvailableResourceList[i].id, resourceName: this.AvailableResourceList[i].name, AvailibleFrom: this.AvailableResourceList[i].planned_release_date, projectName:this.AvailableResourceList[i].project_name })
      }
    }
    // console.log(this.currentDateEvents)
    document.getElementById("resourceListButton").click();
  }

}

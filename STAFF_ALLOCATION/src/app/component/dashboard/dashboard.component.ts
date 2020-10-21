import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { PickDateAdapter, PICK_FORMATS } from 'src/app/constants/date-adaptor';
import { DateAdapter,MAT_DATE_FORMATS } from '@angular/material';
import { Router } from '@angular/router';
@Component({
  selector: 'app-Dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  providers : [{provide: DateAdapter, useClass: PickDateAdapter},
    {provide: MAT_DATE_FORMATS, useValue: PICK_FORMATS}]
})
export class DashboardComponent implements OnInit {
  Form :FormGroup;
  current:any
  @ViewChild('myModal') myModal;
  constructor(private formBuilder:FormBuilder,private router:Router) { }

  ngOnInit() {
    this.current = JSON.parse(localStorage.getItem("LoggedInUser"));
    if(!this.current)
    {
      this.router.navigate(['/'])
    }
    this.Form = this.formBuilder.group({
      Date: ['', ],
      memberName: ['', ],
      memberCode: ['',  ],
      status: ['',  ],
      statusFromDate: ['', ],
      statusToDate: ['', ],
      requestRecievedToDate: ['', ],
      requestRecievedFromDate: ['', ],
      requestReferenceId: ['', ],
    });
    this.current = JSON.parse(localStorage.getItem("LoggedInUser"));
    console.log(this.current)
    console.log(this.current.role)
  }

  openModal() {
    document.getElementById("openModalButton").click();
  }
  onSearch(){}
  
}

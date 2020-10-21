import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ResourceAllocation } from '../resourcesallocationlist/resourcesallocationlist.component';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert';
import { ActivatedRoute, Router } from '@angular/router';
import { AppConstants } from 'src/app/constants/app-constants';
import { PickDateAdapter, PICK_FORMATS } from 'src/app/constants/date-adaptor';
import { DateAdapter, MAT_DATE_FORMATS } from '@angular/material';
import { numberLength } from 'src/app/services/validation.service';

@Component({
  selector: 'app-approve-resource',
  templateUrl: './approve-resource.component.html',
  styleUrls: ['./approve-resource.component.css'],
  providers: [{ provide: DateAdapter, useClass: PickDateAdapter },
  { provide: MAT_DATE_FORMATS, useValue: PICK_FORMATS }]
})
export class ApproveResourceComponent implements OnInit {

  myControl = new FormControl();
  show: boolean = false;
  requestId: string;
  emp: any
  InstanceId: any
  RequestId: any
  topic: any
  date_submitted: any
  release_date: any
  old_release_date: any
  options: string[] = ['select', '', ''];
  constructor(public formBuilder: FormBuilder, public httpClient: HttpClient, public route: ActivatedRoute, public router: Router) { }
  requestor: any
  resourceList: any;
  requestList: any
  mRequest: ResourceAllocation = new ResourceAllocation();;
  DSForm: FormGroup;
  currentDate:Date;
  allocation_request_type:any
  new_doa:any
  new_release_date:any
  new_percentage_allocation:any



  ngOnInit() {

    this.currentDate = new Date();
    this.currentDate.setHours(0);
    this.currentDate.setMinutes(0);
    this.currentDate.setSeconds(0);
    this.currentDate.setMilliseconds(0);
    console.log("CurrentDate",this.currentDate)
    this.DSForm = this.formBuilder.group({
      projectDescription: ['',[]],
      project_code:['',[]],
      onsiteOffshore: ['', []],
      billingStatus: ['', []],
      billingRate: ['', []],
      billingType:[],
      percentageofallocation: ['', [Validators.required, Validators.min(0.1), Validators.max(100)]],
      secondarySkills: ['', []],
      primarySkills: ['', []],
      location_city: ['', []],
      location_area: ['', []],
      client: ['', [Validators.maxLength(40)]],
      job_description:[],
      natureofProject: ['', []],
      stdbillingRate: ['', []],
      minbillingRate: ['', []],
      avgbillingRate: ['', []],
      yearsofExperience: ['', []],
      project: [],
      resource: [],
      planned_release_date: ['', ],
      doa: ['', ],
      designation:[],
      // designation: ['', [Validators.maxLength(30)]],
      // empName: ['', [Validators.maxLength(30)]],
      // empCode: ['', [Validators.maxLength(10)]],
      startDate:[],
      endDate:[],
      available_from_date: [],
      empStatus: [],
      allocation_type: [],
      domain: [],
      remark:[]

    });
    this.route.queryParams.subscribe(data => {
      // console.log(data)
      if (data.employee != null && data.employee != "") {
        if (data.InstanceId != null && data.InstanceId != "") {
          this.InstanceId = data.InstanceId
          this.RequestId = data.RequestId
          this.requestor = data.requestor
          this.topic = data.topic
          this.allocation_request_type = data.allocation_request_type
          this.new_doa=data.new_doa
          this.new_release_date=data.new_release_date
          this.new_percentage_allocation=data.new_percentage_allocation
          this.date_submitted = data.date_submitted
          this.release_date = data.release_date
          this.old_release_date = data.old_release_date

          //console.log('query',data);



          this.httpClient.get(AppConstants.HOST + 'allocation?id=' + Number(this.RequestId)).subscribe(
            data => {
              // console.log(data);
              this.mRequest = JSON.parse(JSON.stringify(data[0]));
              if(this.new_doa)
              	this.mRequest.doa=this.new_doa
              if(this.new_percentage_allocation)
              	this.mRequest.percentage_allocation=this.new_percentage_allocation
              if(this.new_release_date)
              	this.mRequest.planned_release_date = this.new_release_date
              console.log("new this.mRequest :",this.mRequest)
              // console.log(this.requestList);
              // console.log(this.requestList[0])
              // console.log("Data : "+JSON.stringify(data));

            }
          )
        }
        // this.mRequest.employee_name = data.employee
      }
      else {

      }
    })



    console.log("Data : 1");
  }

  onGetRequest(request) {
    document.getElementById("openModalButton").click();
    this.mRequest = request;
    this.mRequest.doa = new Date()
    // var t = id
    // this.httpClient.get(AppConstants.HOST+'resourceRequest/getAllocationMasterBY/'+Number(t)).subscribe(
    //   data => {
    //     this.mRequest = data[0];
    //     // console.log("Data : "+JSON.stringify(data));
    //     // console.log(JSON.stringify(this.mRequest) )

    //   }
    // )
  }

  onSubmit(status) {
    // console.log(this.member)
    
    var d = this.mRequest.doa;
    var dw:Date = new Date(this.mRequest.doa)
      dw.setHours(12)
      this.mRequest.doa= dw;
    console.log("old ",d," NEW",this.mRequest.doa)
    var d = this.mRequest.planned_release_date;
    var dw:Date = new Date(this.mRequest.planned_release_date)
    dw.setHours(12)
    this.mRequest.planned_release_date=dw
  

    console.log("old ",d," NEW",this.mRequest.planned_release_date)
    var t = this.mRequest.id
    this.mRequest.approval_status = status
    if (this.topic === 'finalise_allocation_of_resource') {
      this.httpClient.put(AppConstants.HOST + 'resourceRequest/approveAllotment?id=' + this.InstanceId, {allocation_request_type:this.allocation_request_type, requestor: this.requestor, employee_name: this.mRequest.employee_name, project_name: this.mRequest.project_name, id: this.RequestId, status: this.mRequest.approval_status, remark: this.mRequest.remark, doa: this.mRequest.doa, planned_release_date: this.mRequest.planned_release_date,percentage_allocation:this.mRequest.percentage_allocation,date_submitted:this.date_submitted }).subscribe(
        data => {
          //  console.log("Data" , data)

        var d=JSON.parse(JSON.stringify(data))

        if (d.code == 1 || d.code==2) {
          swal(d.message, '', 'error').then((value) => {
          //this.reload()
          // if(this.mRequest.approval_status=="Reject")
          // message="Resource Allocation Rejected"
          // else
          // message="Resource Allocation Approved"
          // Swal(message,'','success').then(value=>{
          //   this.router.navigateByUrl('/dashboard')
          // })
          });
        } else {
          var message
          if(this.mRequest.approval_status=="Reject")
          message="Resource Allocation Rejected"
          else
          message="Resource Allocation Approved"
          Swal(message,'','success').then(value=>{
            this.router.navigateByUrl('/dashboard')
          })
        }
            
          // else
          //   swal("Rejected ",JSON.parse(JSON.stringify(data)).data,"success")
        }
      )
    }
    else if (this.topic === 'finalise_release_resource') {
      this.httpClient.put(AppConstants.HOST + 'resourceRequest/approveRelease?id=' + this.InstanceId, { requestor: this.requestor, employee_name: this.mRequest.employee_name, project_name: this.mRequest.project_name, id: this.RequestId, status: this.mRequest.approval_status, remark: this.mRequest.remark, date_submitted: this.date_submitted, release_date: this.release_date, old_release_date: this.old_release_date, doa: this.mRequest.doa, planned_release_date: this.mRequest.planned_release_date,percentage_allocation:this.mRequest.percentage_allocation }).subscribe(
        data => {
          //  console.log("Data" , data)
          var message
          if (this.mRequest.approval_status == "Reject")
            message = "Resource Release Rejected"
          else
            message = "Resource Release Approved"
          Swal(message, '', 'success').then(value => {
            this.router.navigateByUrl('/dashboard')
          })

          // else
          //   swal("Rejected ",JSON.parse(JSON.stringify(data)).data,"success")
        }
      )

    }
  }

  reload(){
    location.reload();
  }
}

import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators,AbstractControl } from '@angular/forms';
import { NewHire } from '../request-new-hire/request-new-hire.component';
import { Router, ActivatedRoute } from '@angular/router';

import { HttpClient } from '@angular/common/http';
import { AppConstants } from 'src/app/constants/app-constants';
import Swal from 'sweetalert';
import { PickDateAdapter, PICK_FORMATS } from 'src/app/constants/date-adaptor';
import { DateAdapter, MAT_DATE_FORMATS } from '@angular/material';
import { isGreaterThanValidatorOrEqual } from 'src/app/services/validation.service';


@Component({
  selector: 'app-approve-new-hire',
  templateUrl: './approve-new-hire.component.html',
  styleUrls: ['./approve-new-hire.component.css'],
  providers: [{ provide: DateAdapter, useClass: PickDateAdapter },
  { provide: MAT_DATE_FORMATS, useValue: PICK_FORMATS }]
})
export class ApproveNewHireComponent implements OnInit {

  myControl = new FormControl();
  fileName: String
  public loading = false;
  DataForm: FormGroup;
  requestHire: NewHire = new NewHire()
  options: string[] = ['select', '', ''];
  fileInput: any;
  constructor(public router: Router, public route: ActivatedRoute, private formBuilder: FormBuilder, public httpClient: HttpClient) {

  }
  InstanceId: any
  RequestId: any
  date_submitted: Date
  topic: any
  ngOnInit() {
    this.loading = true
    this.DataForm = this.formBuilder.group({
      project_name: ['', Validators.required],
      primary_skill: ['', Validators.required],
      secondary_skill: ['', Validators.required],
      domain_skill: ['', Validators.required],
      //year_of_experience: ['', Validators.required,],
      designation: ['', Validators.required],
      count: ['', Validators.required],
      job_description: ['', Validators.required],
      city: ['', Validators.required],
      area: ['', Validators.required],
      remark: ['', Validators.required],
      upperlimitsofExperience:['',[Validators.required, (control: AbstractControl) => Validators.min(this.requestHire.experience_lower)(control)]],
      lowerlimitsofExperience:['',[Validators.required, (control: AbstractControl) => Validators.max(this.requestHire.experience_upper)(control)]]
    });
    this.route.queryParams.subscribe(data => {
      // console.log(data)
      if (data.RequestId != null && data.RequestId != "") {
        
        if (data.InstanceId != null && data.InstanceId != "") {
          this.InstanceId = data.InstanceId
          this.RequestId = data.RequestId
          this.topic = data.topic
          this.date_submitted = data.date_submitted
          
          this.httpClient.get(AppConstants.HOST + 'newHire/select?id=' + Number(this.RequestId)).subscribe(
            data => {
              // console.log(data);
              this.requestHire = JSON.parse(JSON.stringify(data[0]));
              this.fileName = this.requestHire.mrf_file_name;
              this.loading = false

            }
          )
        }
        // this.mRequest.employee_name = data.employee
      }
    })

  }

  onSubmit(status) {
    var t = this.requestHire.id
    this.requestHire.status = status
    if (this.topic === 'finalise_request_resource_hire') {

      var v = localStorage.getItem('LoggedInUser')
      this.requestHire.modified_by_id = JSON.parse(v).user_id
      this.requestHire.modified_date = new Date()
      this.httpClient.put(AppConstants.HOST + 'resourceRequest/approveNewResourceRequest?id=' + this.InstanceId, {
        id: this.requestHire.id,
        status: this.requestHire.status,
        remark: this.requestHire.remark,
        modified_date: this.requestHire.modified_date,
        modified_by_id: this.requestHire.modified_by_id,
      }).subscribe(
        data => {
          //  console.log("Data" , data)
          var message
          if (this.requestHire.status == "Reject")
            message = "New Hire Rejected"
          else
            message = "New Hire Approved"
          Swal(message, '', 'success').then(value => {
            this.router.navigateByUrl('/dashboard')
          })

          // else
          //   swal("Rejected ",JSON.parse(JSON.stringify(data)).data,"success")
        }
      )
    }
  }
  Download() {
    if (this.fileName) {
      window.open(AppConstants.FILE_IP +'download/' + this.fileName)
      console.log("Resume Downlaoded........!" + this.fileName);
    } else {
      this.httpClient.get(AppConstants.FILE_IP +'download/' + this.fileName).subscribe(data => {
        Swal('File Not Found', '', 'error')
      })
    }
  }

}

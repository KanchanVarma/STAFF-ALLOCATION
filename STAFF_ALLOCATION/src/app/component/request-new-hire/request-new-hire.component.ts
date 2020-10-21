import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient, HttpRequest, HttpEvent, HttpResponse } from '@angular/common/http';
import { AppConstants } from 'src/app/constants/app-constants';
import Swal from 'sweetalert';
import { PickDateAdapter, PICK_FORMATS } from 'src/app/constants/date-adaptor';
import { DateAdapter, MAT_DATE_FORMATS } from '@angular/material';
import { Observable } from 'rxjs';
import * as sequelize from 'sequelize';
import { ValidationError } from 'sequelize';
import { isGreaterThanValidator, isGreaterThanValidatorOrEqual, isLessThanValidatorOrEqual } from 'src/app/services/validation.service';
@Component({
  selector: 'app-request-new-hire',
  templateUrl: './request-new-hire.component.html',
  styleUrls: ['./request-new-hire.component.css'],
  providers: [{ provide: DateAdapter, useClass: PickDateAdapter },
  { provide: MAT_DATE_FORMATS, useValue: PICK_FORMATS }]
})
export class RequestNewHireComponent {

  DataForm: FormGroup;
  requestHire: NewHire = new NewHire()
  options: string[] = ['select', '', ''];
  CityList = []
  AreaList = []
  PrimarySkillList = []
  SecondarySkillList = []
  DomainList = []
  ProjectList = []
  designationlist: string[] = ['Associate','Data Analyst','ASA-DevOps','Sub- Con', 'ASA', 'Associate', 'TASA', 'ML', 'PL', 'SA', 'Manager - Testing', 'ATA', 'Lead - BA', 'BA', 'Lead - Testing', 'TAPS', 'TATA', 'Sr. Manager', 'Assistant Manager', 'Engineer - Production Support', 'SBA', 'Jr. Engg. Prod Sup.', 'BA', 'Associate Consultant', 'DL', 'UI Developer', 'PM', 'Program Manager', 'Test Analyst', 'UI Designer', 'AM', 'AM - UI Developer', 'Lead UI Developer', 'Sr. Engineer', 'Sr. Executive - Presales', 'Sr. Tech. Manager', 'AVP', 'Quality Analyst', 'Consultant', 'Executive Presales', 'AM-Testing', 'Manager - BA', 'UI Dev', 'Technical Manager', 'APL', 'Tech. Manager', 'Sr. Executive', 'TL', 'RMG', 'Manager', 'Engineer Production Support', 'Application Support', 'Engineer', 'Vice President', 'Solution Architect', 'Business Analyst', 'Manager Testing', 'Engineer-Production Support', 'Sr. PM', 'DGM', 'Project Manager',,'Senior Cyber Security Consultant',
  'Cyber Security Specialist',
  'Cyber Security Engineer',
  'Trainee Engineer','Sr. Executive Engineer','Jr. Engineer']

  public loading = false;
  constructor(public router: Router, public route: ActivatedRoute, private formBuilder: FormBuilder, public httpClient: HttpClient) {

  }
  uploadSingle(event) {

  }

  ngOnInit() {
    this.DataForm = this.formBuilder.group({
      project_name: ['', Validators.required],
      primary_skill: ['', Validators.required],
      secondary_skill: ['', Validators.required],
      domain_skill: ['', Validators.required],
      // year_of_experience: ['', Validators.required],
      designation: ['', Validators.required],
      count: ['', [Validators.required, Validators.pattern('^[1-9]+[0-9]*$')]],
      job_description: ['', Validators.required],
      city: ['', Validators.required],
      area: ['', Validators.required],
      upperlimitsofExperience: ['', [Validators.required, (control: AbstractControl) => Validators.min(this.requestHire.experience_lower)(control)]],
      lowerlimitsofExperience: ['', [Validators.required, (control: AbstractControl) => Validators.max(this.requestHire.experience_upper)(control)]]
    });
    this.loading = true
    this.getDropDowns();

  }



  getDropDowns() {
    this.httpClient.get(AppConstants.HOST + 'dropdown/getCity').subscribe(
      data => {
        // console.log("FETCHED Project Data", data)
        this.CityList = JSON.parse(JSON.stringify(data))
      });

    this.httpClient.get(AppConstants.HOST + 'dropdown/getArea').subscribe(
      data => {
        // console.log("FETCHED Project Data", data)
        this.AreaList = JSON.parse(JSON.stringify(data))
      });

    this.httpClient.get(AppConstants.HOST + 'dropdown/getPrimarySkill').subscribe(
      data => {
        // console.log("FETCHED Project Data", data)
        this.PrimarySkillList = JSON.parse(JSON.stringify(data))
      });

    var v = localStorage.getItem('LoggedInUser')
    var id = JSON.parse(v).user_id
    this.httpClient.get(AppConstants.HOST + 'dropdown/managerProject?id=' + id).subscribe(
      data => {
        // console.log("FETCHED Project Data", data)
        this.ProjectList = JSON.parse(JSON.stringify(data))
      });
    this.httpClient.get(AppConstants.HOST + 'dropdown/getSecondarySkill').subscribe(
      data => {
        // console.log("FETCHED Project Data", data)
        this.SecondarySkillList = JSON.parse(JSON.stringify(data))
      });
    this.httpClient.get(AppConstants.HOST + 'dropdown/getDomain').subscribe(
      data => {
        // console.log("FETCHED Project Data", data)
        this.DomainList = JSON.parse(JSON.stringify(data))
        this.loading = false
      });
  }

  RequestNewHire() {



    if (!this.DataForm.valid) {
      console.log("Invalid")
      return
    }
    var v = localStorage.getItem('LoggedInUser')
    var id = JSON.parse(v).user_id
    this.requestHire.created_dtm = new Date()
    this.requestHire.created_by_id = id
    for (var i = 0; i < this.ProjectList.length; i++) {
      if (this.ProjectList[i].project == this.requestHire.project_name) {
        this.requestHire.project_code = this.ProjectList[i].project_code;
      }
    }
    this.requestHire.date_submitted = new Date()
    this.requestHire.requestor = JSON.parse(v).user_name
    this.httpClient.post(AppConstants.HOST + 'resourceRequest/startProcess?key=new_hire_resource_request_process&type=newhire', this.requestHire).subscribe(
      data => {
        // console.log("FETCHED Project Data", data)
        if (this.selectedFiles)
          this.uploadFile(JSON.parse(JSON.stringify(data)).reqID)

        var id = JSON.parse(JSON.stringify(data)).task.processInstanceId
        // console.log("FETCHED AND LOCKED ")
        this.httpClient.get(AppConstants.HOST + 'resourceRequest/fetchAndLock?topic=create_request_resource_hire&id=' + id).subscribe(
          data => {

            Swal('Resource Requested', '', 'success').then((value) => {
              console.log("FETCHED AND LOCKED AND COMPLETED")
              this.router.navigate(['/dashboard'])
            });

          })
      });
  }

  //MRF FILE UPLOAD
  public fileData: any;
  selectedFiles: FileList;
  currentFileUpload: File;

  selectFile(event) {
    this.selectedFiles = event.target.files;
  }

  uploadFile(id) {
    if (this.selectedFiles) {
      this.currentFileUpload = this.selectedFiles.item(0);
      this.pushFileToStorage(this.currentFileUpload, id).subscribe(event => {
        if (event instanceof HttpResponse) {
          console.log('File is completely uploaded!');
        }
      });
    }
    this.selectedFiles = undefined;
  }

  pushFileToStorage(file: File, id: number): Observable<HttpEvent<{}>> {
    const formdata: FormData = new FormData();
    formdata.append('file', file);
    console.log("ID : *********", id)
    const req = new HttpRequest('POST', AppConstants.FILE_IP +'uploadMRF/'+  id, formdata, {
      reportProgress: true,
      responseType: 'text'
    }
    );
    return this.httpClient.request(req);
  }

}

export class NewHire {
  project_code: string
  project_name: string
  primary_skill: string
  secondary_skill: string
  domain_skill: string
  year_of_experience: number
  designation: string
  count: number
  job_description: string
  city: string
  area: string
  created_dtm: Date
  created_by_id: number
  modified_by_id: number
  modified_date: Date
  remark: string
  status: string
  requestor: string
  date_submitted: Date
  id: number
  experience_upper:number
  experience_lower:number
  mrf_file_name:string
}

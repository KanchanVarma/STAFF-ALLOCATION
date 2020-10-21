import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
// import { DataService } from 'src/app/Services/data.service';
import { ResourceSearch } from 'src/app/model/dashboard';
import { AppConstants } from 'src/app/constants/app-constants';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { saveAs as importedSaveAs } from "file-saver";

import swal from 'sweetalert';
import { SearchProject } from '../search-project/search-project.component';
import { AllocateResource } from 'src/app/model/allocate-resource';
import { PickDateAdapter, PICK_FORMATS } from 'src/app/constants/date-adaptor';
import { DateAdapter, MAT_DATE_FORMATS } from '@angular/material';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};
@Component({
  selector: 'app-searchresource',
  templateUrl: './searchresource.component.html',
  styleUrls: ['./searchresource.component.css'],
  providers: [{ provide: DateAdapter, useClass: PickDateAdapter },
  { provide: MAT_DATE_FORMATS, useValue: PICK_FORMATS }]
})
export class SearchresourceComponent {
  public loading = false
  DataForm: FormGroup;
  [x: string]: any;
  searchParams: ResourceSearch = new ResourceSearch()
  myControl = new FormControl();
  options: string[] = ['select', 'option 1', 'option 2'];
  empStatus: string[] = ['Permanent Employee', 'Consultant', 'Sub Consultant', 'Intership']
  Resource: any = []
  newLine = "\n                                    "
  //  = [{ code: "3013", empName: "Pooja chaudhari", empSkills: "bootstrap, angular 7", yearofExp: "2", empLocation: "Mumbai", empDesignation: "Developer", allocationType: "--", percentageAllocation: "--", allocateResources: "--" },
  // { code: "3014", empName: "--", empSkills: "--", yearofExp: "--", empLocation: "--", empDesignation: "--", allocationType: "--", percentageAllocation: "--", allocateResources: "--" },
  // { code: "3015", empName: "--", empSkills: "--", yearofExp: "--", empLocation: "--", empDesignation: "--", allocationType: "--", percentageAllocation: "--", allocateResources: "--" }]
  itemsPerPage: any = "10"
  CityList = []
  AreaList = []
  PrimarySkillList = []
  SecondarySkillList = []
  DomainList = []
  role: any
  mitem: any
  showGrid: boolean
  showGrid1: boolean
  designationlist: string[] = ['Associate','Data Analyst','ASA-DevOps','Associate PL','Associate Systems Analyst','Assistant Manager','Assistant Manager - QA','Assistant Manager - Testing','Assistant Manager - UxD',
  'Associate Test Analyst','Business Analyst','Delivery Manager','Delivery Manager - QA','Delivery Manager - Testing','Delivery Manager - UxD',
  'Junior UI','Lead - Business Analyst','Lead - UI Developer','Lead - UI Designer','Lead - UX Designer','Lead - QA','Lead - Testing','Manager','Manager - QA','Manager - UxD',
  'Manager - Testing','Module Lead','Prinicipal Consultant','Program Manager',
  'Project Leader','Project Manager','Quality Analyst','Senior Business Analyst',
  'Sr. Consultant','Sr. Manager - QA','Sr. Manager - Testing','Sr. Manager - UxD',
  'Sr. Project Manager','Sr. Quality Analyst','Sr. UI Developer','Sr. UI Designer','Sr. UX Designer','Systems Analyst','Technical Consultant',
  'Technical Leader','Technical Manager','Test Analyst','Trainee Associate Systems Analyst','Trainee Associate Test Analyst',
  'Trainee Business Analyst','Trainee Quality Analyst','UI Designer','UI Developer','UX Designer','Trainee UI',

'Sr Officer Sales','Account Manager','Sales Manager','Sr. Executive - Presales',
'Executive','Senior Execuitve - Account Management','Sr. Vice President & Global Head - Sales & Marketing','Assistant Vice President','Assistant Vice President - Sales',,'Senior Cyber Security Consultant',
'Cyber Security Specialist',
'Cyber Security Engineer',
'Trainee Engineer','Sr. Executive Engineer','Jr. Engineer']

  Projects: any = []
  searchData: SearchProject = new SearchProject()
  DSForm: FormGroup;
  request: AllocateResource = new AllocateResource();

  PrimarySkillListM: any = []
  SecondarySkillListM: any = []
  ProjectForm: FormGroup
  ClientList = []
  billingStats: string[] = ['Annuity', 'T&M', 'FP', 'OES', 'Non-Billable', 'Billable']
  rname: any
  pname: any
  currentDate: Date;
  constructor(public router: Router, public route: ActivatedRoute, private formBuilder: FormBuilder, public httpClient: HttpClient) {

  }
  Function(item) {
    this.mitem = item
  }


  ngOnInit() {
    this.currentDate = new Date();
    this.loading = true;
    this.role = JSON.parse(localStorage.getItem('LoggedInUser')).role
    this.DataForm = this.formBuilder.group({
      empName: ['', [Validators.maxLength(30), Validators.pattern('^[a-zA-Z\- _]+$')]],
      empCode: ['', [Validators.maxLength(7), Validators.pattern('^[a-zA-Z0-9 _]*$')]],
      designation: ['', [Validators.maxLength(30), Validators.pattern('^[a-zA-Z0-9\- _()]*$')]],
      yearofExperience: ['', []],
      secondarySkills: ['', []],
      primarySkills: ['', []],
      Employmentstatus: ['', []],
      upperlimitsofExperience: ['', [Validators.required, (control: AbstractControl) => Validators.min(this.searchParams.experience_lower)(control)]],
      lowerlimitsofExperience: ['', [Validators.required, (control: AbstractControl) => Validators.max(this.searchParams.experience_upper)(control)]],
      city: ['', [Validators.maxLength(50)]],
      area: ['', [Validators.maxLength(50)]],
      stdbillingRate: ['', []],
      minbillingRate: ['', []],
      avgbillingRate: ['', []],
      domain: ['', []],
      allocation_type: [],
      yearsofExperience: [],
      empStatus: [],
      location_city: [],
      location_area: [],
      available_from_date: [],
    });
    this.role = JSON.parse(localStorage.getItem("LoggedInUser")).role
    this.searchParams.if_in_project_screen = "false"
    this.searchParams.project_name = null

    sessionStorage.removeItem('primarySkill')
    sessionStorage.removeItem('secondarySkill')
    this.getDropDowns();



    this.DSForm = this.formBuilder.group({
      // projectName: ['', [Validators.required, Validators.maxLength(100)]],
      //projectDescription: ['',[Validators.required,Validators.maxLength(300)]],
      project_code: [''],
      onsiteOffshore: ['', [Validators.required]],
      billingStatus: ['', [Validators.required,]],
      billingRate: ['', [Validators.required,]],
      percentageofallocation: ['', [Validators.required, Validators.min(0.1), Validators.max(100)]],
      secondarySkills: ['', []],
      primarySkills: ['', []],
      location_city: ['', [Validators.required,]],
      location_area: ['', [Validators.required,]],
      client: ['',],
      natureofProject: ['', []],
      stdbillingRate: ['', []],
      minbillingRate: ['', []],
      avgbillingRate: ['', []],
      yearsofExperience: ['', []],
      project: [],
      resource: [],
      planned_release_date: ['', Validators.required],
      doa: ['', Validators.required,],
      designation: ['',],
      empName: ['',],
      empCode: ['',],
      available_from_date: [],
      empStatus: [],
      startDate: [],
      endDate: [],
      allocation_type: [],
      domain: [],
      toatalpercentageofallocation: [],

    });
    this.ProjectForm = this.formBuilder.group({
      projectName: ['', [Validators.maxLength(100)]],
      city: ['', []],
      area: ['', []],
      natureofProject: ['', []],
      client: ['', []],
      startDate: [],
      endDate: []
    });

  }

  AllocateResource(item) {
    sessionStorage.setItem("primarySkill", item.primary_skill)
    sessionStorage.setItem("secondarySkill", item.secondary_skill)
    this.Projects = []
    this.rname = item.employee_name
    this.request.employee_name = item.employee_name
    this.request.employee_code = item.employee_code
    console.log("item", item)
    this.request.total_percentage_allocation = item.percentage_allocation
    if (item.primary_skill) {
      this.PrimarySkillListM = item.primary_skill.split(",")
    }
    if (item.secondary_skill) {
      this.SecondarySkillListM = item.secondary_skill.split(",")
    }
    document.getElementById("openModalButton1").click();
    // this.router.navigate(['/dashboard/Resource/Allocate'], { queryParams: { 'employee': item.employee_name,'employee_id':item.id } })
  }

  Search() {
    document.getElementById("datanotavailButton").click();
  }

  NewHire() {
    this.router.navigateByUrl('/dashboard/Resource/NewHire/Request')
  }

  onSearchR() {
    this.loading = true
    this.searchParams.if_in_project_screen = "false"
    this.searchParams.project_name = null
    this.show = true
    // console.log("SEARCH")
    this.httpClient.post(AppConstants.HOST + 'resource/search', this.searchParams).subscribe(
      data => {
        this.Resource = data
        for (var i = 0; i < this.Resource.length; i++) {
          if (this.Resource[i].percentage_allocation == null || this.Resource[i].percentage_allocation == null) {
            this.Resource[i].percentage_allocation = 0.00
          }
        }
        this.resourceList = data;
        this.loading = false
        // console.log(this.resourceList);
        // console.log(this.resourceList[0].employee_name)
        // console.log("Data : " + JSON.stringify(data));
        if (this.resourceList.length <= 0) {
          if (this.searchParams.employee_name || this.searchParams.employee_code)
            return;
          else
            document.getElementById("datanotavailButton").click();
        }
      }
    )
    this.showGrid = true;
  }

  hideGrid() {
    this.showGrid = false;
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
    this.httpClient.get(AppConstants.HOST + 'dropdown/getSecondarySkill').subscribe(
      data => {
        // console.log("FETCHED Project Data", data)
        this.SecondarySkillList = JSON.parse(JSON.stringify(data))
      });
    this.httpClient.get(AppConstants.HOST + 'dropdown/getDomain').subscribe(
      data => {
        // console.log("FETCHED Project Data", data)
        this.DomainList = JSON.parse(JSON.stringify(data))

        this.loading = false;
      });
  }

  ExportToExcel() {
    var someDate = new Date()
    this.httpClient.post(AppConstants.HOST + 'export/xlsx?filename=ResourceList-' + (someDate.getMonth() + 1) + "-" + someDate.getFullYear(), { data: this.Resource }, { headers: httpOptions.headers, responseType: 'blob', observe: 'response' })
      .subscribe(response => {
        var attachment = response.headers.get("content-disposition")
        var filename = attachment.slice(attachment.indexOf("=") + 2, attachment.length - 1)
        importedSaveAs(response.body, filename);
      },
        error => {
          console.log("Error ", error)
        })
  }
  getCommaSeprated(array) {
    var val = ""
    for (var i = 0; i < array.length; i++) {
      val += array[i] + " ";
      if (i < array.length - 1) {
        val += ","
      }
    }

  }

  AllocateSubmit() {
    if (!this.DSForm.valid) {
      Object.keys(this.DSForm.controls).forEach(key => {
        console.log('Key control: ' + key + ', keyError: ', this.DSForm.get(key).errors);
      });
      return;
    }

    var d = this.request.doa;
    var dw: Date = new Date(this.request.doa)
    dw.setHours(12)
    this.request.doa = dw;
    console.log("old ", d, " NEW", this.request.doa)
    var d = this.request.planned_release_date;
    var dw: Date = new Date(this.request.planned_release_date)
    dw.setHours(12)
    this.request.planned_release_date = dw
    var v = localStorage.getItem('LoggedInUser')
    this.request.requestor = JSON.parse(v).user_name
    var date = new Date()
    this.request.date_submitted = new Date()
    this.request.created_by_id = JSON.parse(v).user_id
    this.request.id = date.getMonth() * 10000000 + date.getDate() * 1000000 + date.getHours() * 10000 + date.getMinutes() * 100 + date.getSeconds()
    this.httpClient.post(AppConstants.HOST + 'resourceRequest/startProcess?key=allocate_resource_process&type=insert', this.request).subscribe(
      data => {
        // console.log("Data", data)
        var d = JSON.parse(JSON.stringify(data))
        if (d.code == 1 || d.code == 2) {
          swal(d.message, '', 'error').then((value) => {

            //document.getElementById("AllocationDismiss").click();
            //this.reload()
          });
        }
        else {

          // console.log("FETCHED AND LOCKED ChECK ")
          var id = JSON.parse(JSON.stringify(data)).processInstanceId
          // console.log("FETCHED AND LOCKED ")
          this.httpClient.get(AppConstants.HOST + 'resourceRequest/fetchAndLock?topic=allocate_resource&id=' + id).subscribe(
            data => {

              swal('Resource Allocation Requested', '', 'success').then((value) => {
                document.getElementById("AllocationDismiss").click();
                console.log("FETCHED AND LOCKED AND COMPLETED")
                this.ngOnInit()

              });

            });
        }
      });
  }

  onSearchP() {

    this.httpClient.post(AppConstants.HOST + 'project/search', this.searchData).subscribe(data => {
      this.Projects = data
    })
    this.showGrid1 = true
  }
  hideGrid1() {
    this.showGrid1 = false;
  }

  MAXdate: Date
  MINdate: Date
  AllocateResourceProject(item) {
    console.log("Called         AllocateResourceProject", item)
    // this.PrimarySkillListM = []
    // this.SecondarySkillListM = []
    // this.
    // this.PrimarySkillListM.push( this.EmployeeModel.primary_skill)
    // this.SecondarySkillListM.push(this.EmployeeModel.secondary_skill)
    this.MAXdate = new Date(item.end_date)
    this.MINdate = new Date(item.start_date)

    this.request.project_name = item.project_name
    this.request.project_code = item.project_code
    console.log(item)

    //DATE SAGAR 
    var dw: Date = new Date(this.currentDate)
    dw.setDate(dw.getDate() + 1);
    dw.setHours(12)
    this.request.doa = dw;
    //  console.log("old ",d," NEW",this.request.doa)
    //  var d = this.request.planned_release_date;
    var dw: Date = new Date(item.end_date)
    dw.setHours(12)
    this.request.planned_release_date = dw
    //DATE SAGAR


    document.getElementById("openAllocateModalButton").click();
  }

  public reload() {
    location.reload();
  }
}

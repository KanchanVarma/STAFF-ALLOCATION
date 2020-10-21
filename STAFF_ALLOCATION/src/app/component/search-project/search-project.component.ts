import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
// import { DataService } from 'src/app/Services/data.service';
import { AppConstants } from 'src/app/constants/app-constants';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { saveAs as importedSaveAs } from "file-saver";
import { ResourceSearch } from 'src/app/model/dashboard';
import swal from 'sweetalert';
import { AllocateResource } from 'src/app/model/allocate-resource';
import { MatGridTileHeaderCssMatStyler, DateAdapter, MAT_DATE_FORMATS } from '@angular/material';
import { PickDateAdapter, PICK_FORMATS } from 'src/app/constants/date-adaptor';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Component({
  selector: 'app-project-management',
  templateUrl: './search-project.component.html',
  styleUrls: ['./search-project.component.css'],
  providers: [{ provide: DateAdapter, useClass: PickDateAdapter },
  { provide: MAT_DATE_FORMATS, useValue: PICK_FORMATS }]
})
export class ProjectManagementComponent implements OnInit {
  public loading = false
  DataForm: FormGroup;
  currentPage: any
  searchData: SearchProject = new SearchProject()
  Projects: any = []
  currentDate: Date;
  // =[{name:"ENIT",startDate:"--",endDate:"--",nature:"--",client:"--",location:"Mumbai",resourceCount:2},
  // {name:"SIDBI",startDate:"--",endDate:"--",nature:"--",client:"--",location:"Mumbai",resourceCount:2},
  // {name:"CG",startDate:"--",endDate:"--",nature:"--",client:"--",location:"Mumbai",resourceCount:2},
  // {name:"Staff Allocation",startDate:"--",endDate:"--",nature:"--",client:"--",location:"Mumbai",resourceCount:2}]
  itemsPerPage: string = "10"
  p: any;
  CityList = []
  AreaList = []
  CountryList = []
  DepartmentList = []
  ClientList = []
  role: any
  showGrid: boolean
  //
  showGrid1: boolean


  page(event) {
    this.p = event
  }
  page2(event) {
    this.p2 = event
  }
  searchParams: ResourceSearch = new ResourceSearch()
  pname: string = ""
  resourceList: any = [];
  PrimarySkillList = [];
  SecondarySkillList = [];
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
  empStatus: string[] = ['Permanent Employee', 'Consultant', 'Sub Consultant', 'Intership']
  Resource: any = []
  //Allocation Modal

  Heading = "Allocation Details"
  DataForm1: FormGroup
  DSForm: FormGroup
  request: AllocateResource = new AllocateResource();
  p2: any
  PrimarySkillListM: any = []
  SecondarySkillListM: any = []

  billingStats: string[] = ['Annuity', 'T&M', 'FP', 'OES', 'Non-Billable', 'Billable']
  rname: any
  constructor(public route: ActivatedRoute, public router: Router, private formBuilder: FormBuilder, public httpClient: HttpClient) { }

  ngOnInit() {
    this.currentDate = new Date();
    this.loading = true
    var v = localStorage.getItem('LoggedInUser')
    this.role = JSON.parse(v).role
    this.DataForm = this.formBuilder.group({
      projectName: ['', [Validators.maxLength(100), Validators.pattern('^[a-zA-Z\- &$,:=@#_]+$')]],
      projectCode: [''],
      city: ['', []],
      area: ['', []],
      natureofProject: ['', []],
      client: ['', []],
      startDate: [],
      endDate: []
    });


    this.DSForm = this.formBuilder.group({
      // projectName: ['', [Validators.required, Validators.maxLength(100),Validators.pattern('^[a-zA-Z\- &$,:=@#_]+$')]],
      //projectDescription: ['',[Validators.required,Validators.maxLength(300)]],
      //projectCode:['',[Validators.required,Validators.maxLength(10)]],
      project_code: [''],
      onsiteOffshore: ['', [Validators.required,]],
      billingStatus: ['', [Validators.required,]],
      billingRate: ['', [Validators.required,]],
      percentageofallocation: ['', [Validators.required, Validators.min(0.1), Validators.max(100)]],
      secondarySkills: ['', []],
      primarySkills: ['', []],
      location_city: ['', [Validators.required,]],
      location_area: ['', [Validators.required,]],
      // client: ['', [Validators.maxLength(40)]],
      natureofProject: ['', []],
      stdbillingRate: ['', []],
      minbillingRate: ['', []],
      avgbillingRate: ['', []],
      yearsofExperience: ['', []],
      project: [],
      resource: [],
      planned_release_date: ['', Validators.required],
      doa: ['', Validators.required,],
      designation: ['', [Validators.maxLength(30)]],
      empName: ['', [Validators.maxLength(30)]],
      empCode: ['', [Validators.maxLength(10)]],
      available_from_date: [],
      empStatus: [],
      startDate: [],
      endDate: [],
      allocation_type: [],
      domain: [],
      toatalpercentageofallocation: []
    });

    this.DataForm1 = this.formBuilder.group({
      projectName: ['', [Validators.maxLength(100)]],
      //projectDescription: ['',[Validators.required,Validators.maxLength(300)]],
      projectCode: ['', [Validators.maxLength(10)]],
      onsiteOffshore: ['', []],
      worklocationCity: ['', [Validators.maxLength(50)]],
      worklocationArea: ['', [Validators.maxLength(50)]],
      billingStatus: ['', []],
      billingRate: ['', []],
      ofallocation: ['', []],
      secondarySkills: ['', []],
      primarySkills: ['', []],
      location_city: ['', []],
      location_area: ['', []],
      client: ['', [Validators.maxLength(40)]],
      natureofProject: ['', []],
      stdbillingRate: ['', []],
      minbillingRate: ['', []],
      avgbillingRate: ['', []],
      yearsofExperience: ['', []],
      project: [''],
      resource: [''],
      planned_release_date: [''],
      doa: [''],
      designation: ['', [Validators.maxLength(30)]],
      empName: ['', [Validators.maxLength(30)]],
      empCode: ['', [Validators.maxLength(10)]],
      available_from_date: [],
      empStatus: [''],
      startDate: [''],
      endDate: [''],
      allocation_type: [''],
      domain: [''],
      location: ['']

    });




    this.getDropDowns()
  }


  AllocateResourceProject(item) {
    // this.router.navigate(['/dashboard/Resource/Allocate'], { queryParams: { 'project_name': this.ProjectModel.name, 'project_id': this.ProjectModel.id }})
    this.PrimarySkillListM = []
    this.SecondarySkillListM = []
    if (item.primary_skill)
      this.PrimarySkillListM = item.primary_skill.split(',')
    if (item.secondary_skill)
      this.SecondarySkillListM = item.secondary_skill.split(',')
    this.rname = item.employee_name
    this.request.total_percentage_allocation = item.percentage_allocation
    this.request.employee_name = item.employee_name
    this.request.employee_code = item.employee_code
    console.log(this.pname, "---------------")
    console.log(item)

    //DATE SAGAR 
    var dw: Date = new Date(this.currentDate)
    dw.setDate(dw.getDate() + 1);
    dw.setHours(12)
    this.request.doa = dw;

    //  var d = this.request.planned_release_date;

    //DATE SAGAR

    document.getElementById("openAllocateModalButton").click();
  }


  MAXdate: Date
  MINdate: Date
  AllocateResource(item) {
    var dw: Date = new Date(item.end_date)
    dw.setHours(12)
    console.log("old ", dw)
    this.MAXdate = new Date(item.end_date)
    this.MINdate = new Date(item.start_date)
    this.request.planned_release_date = dw
    this.Resource = []

    this.pname = item.project_name
    this.request.project_name = this.pname
    this.request.project_code = item.project_code
    document.getElementById("openModalButton").click();
    // this.router.navigate(['/dashboard/Resource/Allocate'],{ queryParams: { 'project_name': item.project_name ,'project_id': item.id } })
    // this.showGrid = false;
  }

  CreateProject() {
    this.router.navigateByUrl('/dashboard/Project/Create')
  }

  onSearchP() {
    this.loading = true
    console.log("**************************", this.searchData)
    this.httpClient.post(AppConstants.HOST + 'project/search', this.searchData).subscribe(data => {
      this.Projects = data
      this.loading = false
    })
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

    this.httpClient.get(AppConstants.HOST + 'dropdown/getCountry').subscribe(
      data => {
        // console.log("FETCHED Project Data", data)
        this.CountryList = JSON.parse(JSON.stringify(data))
      });
    this.httpClient.get(AppConstants.HOST + 'dropdown/getDepartment').subscribe(
      data => {
        // console.log("FETCHED Project Data", data)
        this.DepartmentList = JSON.parse(JSON.stringify(data))
      });
    this.httpClient.get(AppConstants.HOST + 'dropdown/getClient').subscribe(
      data => {
        // console.log("FETCHED Project Data", data)
        this.ClientList = JSON.parse(JSON.stringify(data))
        this.loading = false
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
  }

  ExportToExcel() {

    var someDate = new Date()
    this.httpClient.post(AppConstants.HOST + 'export/xlsx?filename=ProjectList-' + (someDate.getMonth() + 1) + "-" + someDate.getFullYear(), { data: this.Projects }, { headers: httpOptions.headers, responseType: 'blob', observe: 'response' })
      .subscribe(response => {
        var attachment = response.headers.get("content-disposition")
        var filename = attachment.slice(attachment.indexOf("=") + 2, attachment.length - 1)
        importedSaveAs(response.body, filename);
      },
        error => {
          console.log("Error ", error)
        })
  }

  onSearchR() {
    // console.log("SEARCH")
    // if (this.inProjectScreen) {
    this.searchParams.if_in_project_screen = "true"
    this.searchParams.project_name = this.pname
    // }
    // else {
    //   this.searchParams.if_in_project_screen = "false"
    //   this.searchParams.project_name = null
    // }
    this.httpClient.post(AppConstants.HOST + 'resource/search', this.searchParams).subscribe(
      data => {
        this.Resource = data
        for (var i = 0; i < this.Resource.length; i++) {
          if (this.Resource[i].percentage_allocation == null || this.Resource[i].percentage_allocation == null) {
            this.Resource[i].percentage_allocation = 0.00
          }
        }
        this.resourceList = data;
        // console.log(this.resourceList);
        // console.log(this.resourceList[0].employee_name)
        // console.log("Data : " + JSON.stringify(data));
        /*  if (this.resourceList.length <= 0) {
           document.getElementById("openModalButton").click();
           document.getElementById("datanotavailButton").click();
         } */
      }
    )
    this.showGrid1 = true;
  }
  hideGrid1()
  {
    this.showGrid1=false;
  }

  AllocateSubmit() {

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
    if (this.role == 'rm') {
      this.httpClient.post(AppConstants.HOST + 'allocateNew', this.request).subscribe((data) => {

        var d = JSON.parse(JSON.stringify(data))
        if (d.code == 1 || d.code == 2) {
          // document.getElementById("AllocationDismiss").click();
          swal(d.message, '', 'error').then((value) => {

            // this.ngOnInit()
          });
        }
        else {
          document.getElementById("AllocationDismiss").click();
          swal('Resource Allocated', '', 'success')
        }
      })
    } else {

      this.httpClient.post(AppConstants.HOST + 'resourceRequest/startProcess?key=allocate_resource_process&type=insert', this.request).subscribe(
        data => {
          var d = JSON.parse(JSON.stringify(data))
          if (d.code == 1 || d.code == 2) {
            // document.getElementById("AllocationDismiss").click();
            swal(d.message, '', 'error').then((value) => {

              //this.reload()
            });
          }
          else {
            // console.log("Data", data)

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
  }
  public reload() {
    location.reload();
  }

}
export class SearchProject {
  project_name: string
  start_date: Date
  end_date: Date
  nature: string
  client: string
  city: string
  area: string
  project_code: string
}

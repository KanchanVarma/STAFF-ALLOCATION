import { Component } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ResourceAllocation } from '../resourcesallocationlist/resourcesallocationlist.component';
import { TestBed } from '@angular/core/testing';
import { template } from '@angular/core/src/render3';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert'
import { Resource } from 'src/app/model/resource';
import { ResourceSearch } from 'src/app/model/dashboard';
import { AppConstants } from 'src/app/constants/app-constants';
import { SearchProject } from '../search-project/search-project.component';
import { AllocateResource } from 'src/app/model/allocate-resource';
import { PickDateAdapter, PICK_FORMATS } from 'src/app/constants/date-adaptor';
import { DateAdapter, MAT_DATE_FORMATS } from '@angular/material';
import { numberLength } from 'src/app/services/validation.service';

@Component({
  selector: 'app-allocateresource',
  templateUrl: './allocateresource.component.html',
  styleUrls: ['./allocateresource.component.css'],
  providers: [{ provide: DateAdapter, useClass: PickDateAdapter },
  { provide: MAT_DATE_FORMATS, useValue: PICK_FORMATS }]
})
export class AllocateresourceComponent {

  searchData: SearchProject = new SearchProject()
  show = false
  showP = false
  DataForm: FormGroup;
  DSForm: FormGroup
  ProjectForm: FormGroup
  request: AllocateResource = new AllocateResource();
  myControl = new FormControl();
  searchParams: ResourceSearch = new ResourceSearch()
  project: any;
  employee: any;
  Resource: any = []
  //  [{ employee_code: "3013", employee_name: "Pooja chaudhari", primary_skill: "bootstrap, angular 7", total_experience: "2", city: "Mumbai", designation: "Developer", allocationType: "--", percentageAllocation: "--", allocateResources: "--" },
  // { employee_code: "3014", employee_name: "--", primary_skill: "--", total_experience: "--", city: "--", designation: "--", allocationType: "--", percentageAllocation: "--", allocateResources: "--" },
  // { employee_code: "3015", employee_name: "--", primary_skill: "--", total_experience: "--", city: "--", designation: "--", allocationType: "--", percentageAllocation: "--", allocateResources: "--" }]
  Projects: any = []
  //  [{ name: "ENIT", startDate: "--", endDate: "--", nature: "--", client: "--", location: "Mumbai", resourceCount: 2 },
  // { name: "SIDBI", startDate: "--", endDate: "--", nature: "--", client: "--", location: "Mumbai", resourceCount: 2 },
  // { name: "CG", startDate: "--", endDate: "--", nature: "--", client: "--", location: "Mumbai", resourceCount: 2 },
  // { name: "Staff Allocation", startDate: "--", endDate: "--", nature: "--", client: "--", location: "Mumbai", resourceCount: 2 }]
  resourceList: any = [];
  emp: any
  Rallocated = false
  Pallocated = false
  title: string = "Submit"
  options: string[] = ['select', '', ''];
  empStatus: string[] = ['Permanent Employee', 'Consultant', 'Sub Consultant', 'Intership']
  billingStats: string[] = ['Annuity', 'T&M', 'FP', 'OES', 'Non-Billable', 'Billable']
  p: any;
  employee_id: any
  constructor(public formBuilder: FormBuilder, public httpClient: HttpClient, public route: ActivatedRoute, public router: Router) { }
  itemsPerPage: any = '10'
  currentPage: number
  mRequest: ResourceAllocation = new ResourceAllocation();
  uploadForm: FormGroup;
  task: string
  CityList = [];
  AreaList = [];
  CountryList = [];
  PrimarySkillList = [];
  SecondarySkillList = [];
  RequestId: any;
  DomainList = []
  DepartmentList = []
  ClientList = []
  PrimarySkillListM: any = []
  SecondarySkillListM: any = []
  inProjectScreen = false
  M_project_id: any
  releaseResource: any
  Heading: any
  rname: string
  pname: string
  empCode: any
  currentDate: Date
  public loading = false;
  ngOnInit() {
    this.currentDate = new Date();
    this.currentDate.setHours(0);
    this.currentDate.setMinutes(0);
    this.currentDate.setSeconds(0);
    this.currentDate.setMilliseconds(0);
    console.log("CurrentDate", this.currentDate)
    this.loading = true
    this.uploadForm = this.formBuilder.group({
    });

    this.DataForm = this.formBuilder.group({
      projectName: ['', [Validators.maxLength(100)]],
      //projectDescription: ['',[Validators.required,Validators.maxLength(300)]],
      //projectCode:['',[Validators.required,Validators.maxLength(10)]],
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
projectcode:[''],
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

    this.DSForm = this.formBuilder.group({
      //projectDescription: ['',[Validators.required,Validators.maxLength(300)]],
      //projectCode:['',[Validators.required,Validators.maxLength(10)]],
      onsiteOffshore: ['', [Validators.required,]],
      billingStatus: ['', [Validators.required,]],
      billingRate: ['', [Validators.required,]],
      percentageofallocation: ['', [Validators.required,Validators.min(0.1),Validators.max(100)]],
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
projectcode:[''],

      resource: [],
      planned_release_date: ['', Validators.required],
      doa: ['', Validators.required,],
      // designation: ['', [Validators.maxLength(30)]],
      // empName: ['', [Validators.maxLength(30)]],
      // empCode: ['', [Validators.maxLength(10)]],
      available_from_date: [],
      empStatus: [],
      startDate: [],
      endDate: [],
      allocation_type: [],
      domain: []

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

    this.route.queryParams.subscribe(params => {
      this.Heading = "Allocation Details"
      this.request.project_name = params['project_name'];
      this.request.project_code = params['project_code']
      console.log(params['employee_code'])
      this.request.employee_code = params['employee_code']
      console.log(this.request.employee_code)
      this.empCode = params['employee_code']
      console.log("**************************************", params)
      if (this.request.project_name) {
        this.inProjectScreen = true
        this.pname = this.request.project_name
      }
      this.employee_id = params['employee_id']
      this.request.employee_name = params['employee'];
      this.rname = this.request.employee_name

      this.employee_id = params['employee_id'];
      this.RequestId = params['reqID'];
      this.M_project_id = params['project_id'];
      this.releaseResource = params['releaseResource']
      if (this.request.employee_name && (this.RequestId == null || this.RequestId == undefined)) {

        this.PrimarySkillListM = sessionStorage.getItem("primarySkill").split(',')
        this.SecondarySkillListM = sessionStorage.getItem("secondarySkill").split(',')
      }
      console.log("REQ ID ", this.RequestId)
      if (this.RequestId) {
        this.task = "update"
        this.title = "Submit"
        if (this.releaseResource == 'release') {
          this.task = "release"
          this.title = "Submit"
          this.Heading = "Release Resource"
        }
        this.httpClient.get(AppConstants.HOST + 'allocation?id=' + Number(this.RequestId)).subscribe(
          data => {
            // console.log(data);
            this.request = JSON.parse(JSON.stringify(data[0]));
            // console.log(this.requestList);
            // console.log(this.requestList[0])
            // console.log("Data : "+JSON.stringify(data));
            this.pname = this.request.project_name
            // this.pname= this.request.project_name
            this.loading = false


          }
        )
      }
      else {
        this.task = "insert"
        this.title = "Submit"

        this.loading = false
      }

    })
    this.getDropDowns()

  }

  onSubmit() {
    
    var d = this.request.doa;
    var dw:Date = new Date(this.request.doa)
      dw.setHours(12)
      this.request.doa= dw;
    console.log("old ",d," NEW",this.request.doa)
    var d = this.request.planned_release_date;
    var dw:Date = new Date(this.request.planned_release_date)
    dw.setHours(12)
    this.request.planned_release_date=dw
  console.log("CALLL 1")
    this.mRequest.employee_id = this.emp;
    // console.log("this EMP ID " + this.mRequest.employee_id)
    if (this.task === "insert") {

      console.log("CALLL in")
      var v = localStorage.getItem('LoggedInUser')
      this.request.requestor = JSON.parse(v).user_name
  

      var date = new Date()
      this.request.date_submitted = new Date()
      this.request.created_by_id = JSON.parse(v).user_id
      this.request.id = date.getMonth() * 10000000 + date.getDate() * 1000000 + date.getHours() * 10000 + date.getMinutes() * 100 + date.getSeconds()
      this.httpClient.post(AppConstants.HOST + 'resourceRequest/startProcess?key=allocate_resource_process&type=insert', this.request).subscribe(
        data => {

          var d = JSON.parse(JSON.stringify(data))
          if (d.code == 1 || d.code == 2) {
            swal(d.message, '', 'error').then((value) => {
              //this.ngOnInit();
            });
          } else {
            // console.log("Data", data)
            // console.log("FETCHED AND LOCKED ChECK ")

            var id = JSON.parse(JSON.stringify(data)).processInstanceId
            // console.log("FETCHED AND LOCKED ")
            this.httpClient.get(AppConstants.HOST + 'resourceRequest/fetchAndLock?topic=allocate_resource&id=' + id).subscribe(
              data => {

                Swal('Resource Allocation Requested', '', 'success').then((value) => {
                  console.log("FETCHED AND LOCKED AND COMPLETED")
                  if (this.employee_id) {
                    this.router.navigate(['/dashboard/Resource/Create'], { queryParams: { employee: this.employee_id } })
                  }
                  else {
                    this.router.navigate(['/dashboard/Project/Create'], { queryParams: { project_name: this.request.project_name, project_id: this.M_project_id } })
                  }

                });

              });
          }
        });
    }
    else if (this.task === 'update') {

      console.log("CALLL up")
      if (this.DSForm.pristine) {
        Swal("No Data Modified ", '', 'success').then((value) => {
          location.reload()
        })
        console.log("Not Modidfied")
      }
      else {
        var v = localStorage.getItem('LoggedInUser')

        this.request.date_submitted = new Date()
        this.request.requestor = JSON.parse(v).user_name
        var date = new Date()
        console.log(this.request.project_code)
        this.request.employee_code = this.empCode

        console.log(this.empCode)
        console.log(this.request.employee_code)
        this.request.modified_by_id = JSON.parse(v).user_id
        this.request.modified_date = new Date()

        if (JSON.parse(v).role == 'delivery') {
          this.httpClient.post(AppConstants.HOST + 'resourceRequest/startProcess?key=allocate_resource_process&type=update', this.request).subscribe(
            data => {
              var mdata = JSON.parse(JSON.stringify(data));
              // console.log("Data", data)


              // console.log("FETCHED AND LOCKED ChECK ")
              if (mdata.code == 0) {
                var id = JSON.parse(JSON.stringify(data)).processInstanceId
                // console.log("FETCHED AND LOCKED ")
                this.httpClient.get(AppConstants.HOST + 'resourceRequest/fetchAndLock?topic=allocate_resource&id=' + id).subscribe(
                  data => {
                    Swal('Resource Allocation Modified', '', 'success').then((value) => {
                      // console.log("FETCHED AND LOCKED AND COMPLETED")
                      if (this.employee_id) {
                        this.router.navigate(['/dashboard/Resource/Create'], { queryParams: { employee: this.employee_id } })
                      }
                      else {
                        this.router.navigate(['/dashboard/Project/Create'], { queryParams: { project_name: this.request.project_name, project_id: this.M_project_id } })
                      }
                    });

                  });
              } else if (mdata.code == 1 || mdata.code == 2) {
                Swal(mdata.message, '', 'error').then((value) => {

                });
              } else {

              var id = JSON.parse(JSON.stringify(data)).processInstanceId
              // console.log("FETCHED AND LOCKED ")
              this.httpClient.get(AppConstants.HOST + 'resourceRequest/fetchAndLock?topic=allocate_resource&id=' + id).subscribe(
                data => {
                  Swal('Resource Allocation Modified', '', 'success').then((value) => {
                    // console.log("FETCHED AND LOCKED AND COMPLETED")
                    if (this.employee_id) {
                      this.router.navigate(['/dashboard/Resource/Create'], { queryParams: { employee: this.employee_id } })
                    }
                    else {
                      this.router.navigate(['/dashboard/Project/Create'], { queryParams: { project_name: this.request.project_name, project_id: this.M_project_id } })
                    }
                  });

                  });


              }
            });
        }
        else if (JSON.parse(v).role == 'rm') {
          this.httpClient.put(AppConstants.HOST + 'allocate/directAllocate', this.request).subscribe(
            data => {
              var d = JSON.parse(JSON.stringify(data))

              if (d.code == 1 || d.code == 2) {
                Swal(d.message, '', 'error').then((value) => {

                });
              } else {
                // console.log("Data", data)
                Swal('Resource Allocation Modified', '', 'success').then((value) => {
                  // console.log("FETCHED AND LOCKED ChECK ")
                  if (value) {
                    if (this.employee_id) {
                      this.router.navigate(['/dashboard/Resource/Create'], { queryParams: { employee: this.employee_id } })
                    }
                    else {
                      this.router.navigate(['/dashboard/Project/Create'], { queryParams: { project_name: this.request.project_name, project_id: this.M_project_id } })
                    }
                    // this.router.navigate(['/dashboard/Resource/Create'], { queryParams: { employee: this.employee_id } })
                  }
                });
              }
            });

        }

      }
    }
    else if (this.task === 'release') {
      var v = localStorage.getItem('LoggedInUser')
      this.request.requestor = JSON.parse(v).user_name
      var date = new Date()

      this.request.date_submitted = new Date()
      this.request.modified_by_id = JSON.parse(v).user_id
      this.request.modified_date = new Date()
      this.httpClient.post(AppConstants.HOST + 'resourceRequest/startProcess?key=allocate_resource_process&type=update', this.request).subscribe(
        data => {
          console.log("Data", data)
          // console.log("FETCHED AND LOCKED ChECK ")

          var id = JSON.parse(JSON.stringify(data)).processInstanceId
          // console.log("FETCHED AND LOCKED ")
          this.httpClient.get(AppConstants.HOST + 'resourceRequest/fetchAndLock?topic=allocate_resource&id=' + id).subscribe(
            data => {

              Swal('Resource Released', '', 'success').then((value) => {
                // console.log("FETCHED AND LOCKED AND COMPLETED")
                this.router.navigate(['/dashboard/Project/Create'], { queryParams: { project_name: this.request.project_name, project_id: this.M_project_id } })

              });

            });
        });
    }
  }

  SearchResource() {

    document.getElementById("openModalButton").click();
  }
  SearchProject() {

    document.getElementById("openModalButton1").click();
  }
  AllocateResource(item) {
    this.request.employee_name = item.employee_name
    this.PrimarySkillListM = []
    this.SecondarySkillListM = []
    this.PrimarySkillListM = item.primary_skill.split(',')
    this.SecondarySkillListM = item.secondary_skill.split(',')
    this.Rallocated = true
  }
  AllocateProject(item) {
    this.request.project_name = item.project_name
    this.request.project_code = item.project_code
    this.Pallocated = true
    // this.PrimarySkillListM = this.PrimarySkillList
    // this.SecondarySkillListM = this.SecondarySkillList
  }

  onSearchR() {
    this.show = true
    // console.log("SEARCH")
    if (this.inProjectScreen) {
      this.searchParams.if_in_project_screen = "true"
      this.searchParams.project_name = this.request.project_name
    }
    else {
      this.searchParams.if_in_project_screen = "false"
      this.searchParams.project_name = null
    }
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
        if (this.resourceList.length <= 0) {

          document.getElementById("openModalButton").click();
          document.getElementById("datanotavailButton").click();
        }

      }
    )
  }


  onSearchP() {

    this.showP = true
    this.httpClient.post(AppConstants.HOST + 'project/search', this.searchData).subscribe(data => {
      this.Projects = data
    })
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
      });
  }
  NewHire() {
    this.router.navigateByUrl('/dashboard/Resource/NewHire/Request')
  }




}



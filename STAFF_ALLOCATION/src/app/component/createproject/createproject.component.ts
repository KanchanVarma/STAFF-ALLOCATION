import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup, FormBuilder, ValidationErrors } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
// import { DataService } from 'src/app/services/data.service';
import { routerNgProbeToken } from '@angular/router/src/router_module';
import { HttpClient } from '@angular/common/http';
// import Swal from 'sweetalert'
import { AppConstants } from 'src/app/constants/app-constants';
import { Project } from 'src/app/model/project';
import swal from 'sweetalert';
import { resource } from 'selenium-webdriver/http';

import Swal from 'sweetalert2'
import { ResourceSearch } from 'src/app/model/dashboard';
import { AllocateResource } from 'src/app/model/allocate-resource';
import { DateAdapter, MAT_DATE_FORMATS } from '@angular/material';
import { PickDateAdapter, PICK_FORMATS } from 'src/app/constants/date-adaptor';


@Component({
  selector: 'app-createproject',
  templateUrl: './createproject.component.html',
  styleUrls: ['./createproject.component.css'],
  providers: [{ provide: DateAdapter, useClass: PickDateAdapter },
  { provide: MAT_DATE_FORMATS, useValue: PICK_FORMATS }]
})
export class CreateprojectComponent implements OnInit {

  designationlist: string[] = ['Associate','Data Analyst','Sub- Con', 'ASA', 'Associate', 'TASA', 'ML', 'PL', 'SA', 'Manager - Testing', 'ATA', 'Lead - BA', 'BA', 'Lead - Testing', 'TAPS', 'TATA', 'Sr. Manager', 'Assistant Manager', 'Engineer - Production Support', 'SBA', 'Jr. Engg. Prod Sup.', 'BA', 'Associate Consultant', 'DL', 'UI Developer', 'PM', 'Program Manager', 'Test Analyst', 'UI Designer', 'AM', 'AM - UI Developer', 'Lead UI Developer', 'Sr. Engineer', 'Sr. Executive - Presales', 'Sr. Tech. Manager', 'AVP', 'Quality Analyst', 'Consultant', 'Executive Presales', 'AM-Testing', 'Manager - BA', 'UI Dev', 'Technical Manager', 'APL', 'Tech. Manager', 'Sr. Executive', 'TL', 'RMG', 'Manager', 'Engineer Production Support', 'Application Support', 'Engineer', 'Vice President', 'Solution Architect', 'Business Analyst', 'Manager Testing', 'Engineer-Production Support', 'Sr. PM', 'DGM', 'Project Manager','Senior Cyber Security Consultant',
  'Cyber Security Specialist',
  'Cyber Security Engineer',
  'Trainee Engineer','Sr. Executive Engineer','Jr. Engineer'
]
  searchParams: ResourceSearch = new ResourceSearch()
  public loading = false;
  ProjectModel: Project = new Project()
  DataForm: FormGroup;
  DataForm1: FormGroup;
  myControl = new FormControl();
  options: string[] = ['select', '', ''];
  title = "Create";
  readonly = false;
  resources = [{ name: "Test", doa: "--", dor: "--", percent_allocation: 10 }, { name: "Test2", doa: "--", dor: "--", percent_allocation: 30 }]
  project_code: number;
  project_name: string
  role: any
  CityList = []
  AreaList = []
  CountryList = []
  DepartmentList = []
  ClientList = []
  FinanceOwnerList = []
  DeliveryOwnerList = []
  AccountOwnerList = []
  ProjectManagerList = []
  Allocations: any = []
  minDate: Date = new Date()
  dor: Date = new Date()
  itemsPerPage: any = '10'

  itemsPerPage1: any = '10'
  pname: string = ""
  resourceList: any = [];
  PrimarySkillList = [];
  SecondarySkillList = [];

  empStatus: string[] = ['Permanent Employee', 'Consultant', 'Sub Consultant', 'Intership']
  Resource: any = []
  p: any
  p1: any
  showGrid: boolean
  feedback: string = ""
  ratinglist: string[] = ['A+', 'A1', 'A2', 'A3', 'B+']
  rating: string
  //Allocation Modal

  Heading = "Allocation Details"
  DSForm: FormGroup
  request: AllocateResource = new AllocateResource();

  PrimarySkillListM: any = []

  SecondarySkillListM: any = []

  billingStats: string[] = ['Annuity', 'T&M', 'FP', 'OES', 'Non-Billable', 'Billable']
  rname: any

  currentDate: Date;
  constructor(public router: Router, public route: ActivatedRoute, private formBuilder: FormBuilder, public httpClient: HttpClient) {
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };

  }

  page(event) {
    this.p = event
  }

  ngOnInit() {

    this.currentDate = new Date();
    this.currentDate.setHours(0);
    this.currentDate.setMinutes(0);
    this.currentDate.setSeconds(0);
    this.currentDate.setMilliseconds(0);
    console.log("CurrentDate", this.currentDate)
    this.showGrid = false;
    this.getDropDowns();
    this.loading = true;
    this.ProjectModel = new Project();

    var v = localStorage.getItem('LoggedInUser')
    this.role = JSON.parse(v).role
    if (this.role == 'rm') {
      this.readonly = true
    }
    this.route.queryParams.subscribe(data => {
      if (data.project_id != null && data.project_id != "") {

        this.loading = true;
        this.ProjectModel.id = data.project_id;
        // console.log("DATA ", data, "MODE>ID", this.ProjectModel.id)
        // this.ProjectModel.name = data.project_name;

        this.readonly = true;
        this.title = "Modify"
        if (data.project_name != 'COE') {
          this.httpClient.get(AppConstants.HOST + 'project/select?id=' + this.ProjectModel.id).subscribe(
            data => {
              console.log("FETCHED Project Data", data)
              this.maximumallocation = 0
              this.ProjectModel = JSON.parse(JSON.stringify(data[0]))
              this.httpClient.get(AppConstants.HOST + 'allocationDetails/project?id=' + this.ProjectModel.id).subscribe(
                data => {
                  // console.log("FETCHED Allocation Data", data)

                  this.Allocations = JSON.parse(JSON.stringify(data))
                  this.loading = false;
                  this.Allocations.forEach(item => {
                    this.maximumallocation += item.percentage_allocation
                  });
                });
              this.pname = this.ProjectModel.name
              // console.log(this.ProjectModel)
            });
        }
        else {
          this.httpClient.get(AppConstants.HOST + 'project/select?id=' + this.ProjectModel.id).subscribe(
            data => {
              console.log("FETCHED Project Data", data)

              this.ProjectModel = JSON.parse(JSON.stringify(data[0]))
              this.httpClient.get(AppConstants.HOST + 'COE').subscribe(
                data => {
                  // console.log("FETCHED Allocation Data", data)

                  this.Allocations = JSON.parse(JSON.stringify(data))
                  this.loading = false;
                });
              this.pname = this.ProjectModel.name
              // console.log(this.ProjectModel)
            });
        }
      }
      else {
        this.title = "Create"
        if (this.role == 'rm') {
          this.readonly = false;
        } else {
          this.readonly = false;
        }
        this.loading = false;
        this.ProjectModel = new Project();
      }
      // console.log(this.readonly)
    })

    this.DataForm = this.formBuilder.group({

      projectName: ['', [Validators.required, Validators.minLength(3), Validators.pattern('^[a-zA-Z0-9\-/\\ &$,.:=@#_)(]+$')]],
      projectDescription: ['', [Validators.minLength(1)]],
      projectCode: ['', [Validators.required, Validators.minLength(2), Validators.pattern('^[a-zA-Z0-9]+$')]],
      projectCity: ['', []],
      country: ['',],
      department: ['', []],
      billingType: ['', []],
      natureofProject: ['', []],
      client: ['', []],
      projectArea: ['', []],
      projectManager: ['', [Validators.required]],
      billingRate: ['', [Validators.maxLength(10)]],
      currency: ['', [Validators.maxLength(5), Validators.pattern('^[a-zA-Z $]*$')]],
      accountOwner: ['', [Validators.required, Validators.maxLength(40)]],
      deliveryOwner: ['', [Validators.required, Validators.maxLength(40)]],
      financeOwner: [],
      end_date: [],
      start_date: [],
      billing_start_date: [],
      billing_end_date: [],
      status: []
    });

    this.DataForm1 = this.formBuilder.group({
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
      resource: [''],
      planned_release_date: ['',],
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
      project: ['', [Validators.required, Validators.maxLength(100)]],
      //projectDescription: ['',[Validators.required,Validators.maxLength(300)]],
      //projectCode:['',[Validators.required,Validators.maxLength(10)]],
      onsiteOffshore: ['', [Validators.required,]],
      billingStatus: ['', [Validators.required,]],
      billingRate: ['', [Validators.required,]],
      percentageofallocation: ['', [Validators.required, Validators.min(0.1), Validators.max(100), Validators.maxLength(2)]],
      secondarySkills: ['', []],
      primarySkills: ['', []],
      location_city: ['', [Validators.required,]],
      location_area: ['', [Validators.required,]],
      client: ['', [Validators.maxLength(40)]],
      natureofProject: ['', []],
      stdbillingRate: ['', []],
      minbillingRate: ['', []],
      avgbillingRate: ['', []],
      yearsofExperience: ['', []],
      project_code: [],
      toatalpercentageofallocation: [],
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
      domain: []
    });
  }

  getDropDowns() {
    this.loading = true;
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
    //////////////////////////////////////////////////////////////
    this.httpClient.get(AppConstants.HOST + 'dropdown/getProjectManager').subscribe(
      data => {
        // console.log("FETCHED Project Data", data)
        this.ProjectManagerList = JSON.parse(JSON.stringify(data))
      });

    this.httpClient.get(AppConstants.HOST + 'dropdown/getAccountOwner').subscribe(
      data => {
        // console.log("FETCHED Project Data", data)
        this.AccountOwnerList = JSON.parse(JSON.stringify(data))
      });

    this.httpClient.get(AppConstants.HOST + 'dropdown/getDeliveryOwner').subscribe(
      data => {
        // console.log("FETCHED Project Data", data)
        this.DeliveryOwnerList = JSON.parse(JSON.stringify(data))
      });

    this.httpClient.get(AppConstants.HOST + 'dropdown/getFinanceOwner').subscribe(
      data => {
        // console.log("FETCHED Project Data", data)
        this.FinanceOwnerList = JSON.parse(JSON.stringify(data))

      });

  }

  AllocateCOE(item) {
    this.rname = item.name
    this.request.employee_name = item.name
    this.request.project_name = this.pname
    document.getElementById("openAllocateModalButton").click();
  }
  maximumallocation: any
  total_percentage_allocation: number
  AllocateResourceProject(item) {
    // this.router.navigate(['/dashboard/Resource/Allocate'], { queryParams: { 'project_name': this.ProjectModel.name, 'project_id': this.ProjectModel.id }})
    this.PrimarySkillListM = []
    this.SecondarySkillListM = []
    if (item.primary_skill != "" && item.primary_skill != null)
      this.PrimarySkillListM = item.primary_skill.split(',')
    if (item.secondary_skill != "" && item.secondary_skill != null)
      this.SecondarySkillListM = item.secondary_skill.split(',')
    this.rname = item.employee_name
    this.request.employee_code = item.employee_code
    this.request.employee_name = item.employee_name
    this.DSForm.controls['resource'].setValue(item.employee_name)
    console.log(item.employee_name)
    this.maximumallocation = item.percentage_allocation
    this.request.project_code = this.ProjectModel.code
    this.DSForm.controls['project_code'].setValue(this.ProjectModel.code)
    this.request.project_name = this.pname
    this.DSForm.controls['project'].setValue(this.pname)
    console.log("ITEM", item)
    this.request.total_percentage_allocation = item.percentage_allocation
    console.log("1=", this.request.percentage_allocation)
    console.log("2=", item.percentage_allocation)
    this.DSForm.controls['percentageofallocation'].setValidators([Validators.required, Validators.min(0.1), Validators.max(100)]) /*, Validators.max(100 - this.maximumallocation)*/
    this.DSForm.controls['percentageofallocation'].updateValueAndValidity()
    console.log(item)

    console.log("tottal", item.percentage_allocation)


    //DATE SAGAR 

    var dw: Date = new Date(this.currentDate)
    dw.setDate(dw.getDate() + 1);
      dw.setHours(12)
      this.request.doa= dw;
    console.log("old ",d," NEW",this.request.doa)
  if(this.ProjectModel.end_date!=null )
  {  var d = this.request.planned_release_date;
    var dw:Date = new Date(this.ProjectModel.end_date)
    dw.setHours(12)
    this.request.planned_release_date=dw}
    else{
      this.request.planned_release_date=null
    }
    //DATE SAGAR
    
    document.getElementById("openAllocateModalButton").click();
  }

  AllocateSubmit() {
  
    var d = this.request.doa;
    var dw:Date = new Date(this.request.doa)
      dw.setHours(12)
      this.request.doa= dw;
    console.log("old ",d," NEW",this.request.doa)
    var d = this.request.planned_release_date;
    var dw:Date = new Date(this.request.planned_release_date)
    dw.setHours(12)
    this.request.planned_release_date=dw
    Object.keys(this.DSForm.controls).forEach(key => {

      const controlErrors: ValidationErrors = this.DSForm.get(key).errors;
      if (controlErrors != null) {
        Object.keys(controlErrors).forEach(keyError => {
          console.log('Key control: ' + key + ', keyError: ' + keyError + ', err value: ', controlErrors[keyError]);
        });
      }
    });
    var v = localStorage.getItem('LoggedInUser')
    this.request.requestor = JSON.parse(v).user_name
    this.request.project_code = this.ProjectModel.code
    var date = new Date()
    this.request.date_submitted = new Date()
    this.request.created_by_id = JSON.parse(v).user_id
    this.request.id = date.getMonth() * 10000000 + date.getDate() * 1000000 + date.getHours() * 10000 + date.getMinutes() * 100 + date.getSeconds()
    if (this.role == 'rm') {
      this.httpClient.post(AppConstants.HOST + 'allocateNew', this.request).subscribe((data) => {
        var d = JSON.parse(JSON.stringify(data))
        if (d.code == 1 || d.code==2) {
          
          //document.getElementById("AllocationDismiss").click();
          swal(d.message, '', 'error').then((value) => {
            //this.reload()
          });
        } else {
          document.getElementById("AllocationDismiss").click();
          swal('Resource Allocated', '', 'success').then((value) => {
            this.ngOnInit()
          })
        }
      })
    } else {
      this.httpClient.post(AppConstants.HOST + 'resourceRequest/startProcess?key=allocate_resource_process&type=insert', this.request).subscribe(
        data => {
          var d = JSON.parse(JSON.stringify(data))
          if (d.code == 1 || d.code==2) {
            swal(d.message, '', 'error').then((value) => {
              //this.reload()
            });
          } else {
            // console.log("Data", data)


            // console.log("FETCHED AND LOCKED ChECK ")
            {
              var id = JSON.parse(JSON.stringify(data)).processInstanceId
              // console.log("FETCHED AND LOCKED ")
              this.httpClient.get(AppConstants.HOST + 'resourceRequest/fetchAndLock?topic=allocate_resource&id=' + id).subscribe(
                data => {
                  document.getElementById("AllocationDismiss").click();
                  swal('Resource Allocation Requested', '', 'success').then((value) => {
                    console.log("FETCHED AND LOCKED AND COMPLETED")
                    // this.ngOnInit()
                    this.reload();
                  });
                  });
            }

          }
        });
    }
  }
  
  AllocateResource() {
    this.DSForm.markAsPristine()
    this.DSForm.markAsUntouched()
    this.DSForm.updateValueAndValidity()
    this.hideGrid();
    // this.router.navigate(['/dashboard/Resource/Allocate'], { queryParams: { 'project_name': this.ProjectModel.name, 'project_id': this.ProjectModel.id }})
    this.Resource = []
    document.getElementById("openModalButton").click();
  }

  ReleaseResource(item) {
    console.log("************ITEM***************", item)
    this.router.navigate(['/dashboard/Resource/Allocate'], { queryParams: { 'project_name': this.ProjectModel.name, 'project_code': this.ProjectModel.code, 'employee_code': item.employee_code, 'project_id': this.ProjectModel.id, 'reqID': item.id } })
  }
  onSubmit() {
    if (this.readonly) {
      if (this.DataForm.pristine) {
        swal("No Data Modified ", '', 'success').then((value) => {
          this.ngOnInit();
        })
        console.log("Not Modidfied")
      }
      else {
        // SAGAR DATE
        var d1 = this.ProjectModel.billing_start_date;
        var d2 = this.ProjectModel.billing_end_date;

        var d3 = this.ProjectModel.start_date;
        var d4 = this.ProjectModel.end_date;
        if (d1) {
          var dw = new Date(d1)
          dw.setHours(12)
          this.ProjectModel.billing_start_date = dw
        }
        if (d2) {
          var dw = new Date(d2)
          dw.setHours(12)
          this.ProjectModel.billing_end_date = dw
        }
        if (d3) {
          var dw = new Date(d3)
          dw.setHours(12)
          this.ProjectModel.start_date = dw
        }
        if (d4) {
          var dw = new Date(d4)
          dw.setHours(12)
          this.ProjectModel.end_date = dw
        }

        var currentDate = new Date()
        currentDate.setHours(12)
        this.ProjectModel.modified_dtm = currentDate
        // SAGAR 



        var v = localStorage.getItem('LoggedInUser')
        this.ProjectModel.modified_by_id = JSON.parse(v).user_id;

        this.httpClient.put(AppConstants.HOST + 'project/update?id=' + this.ProjectModel.id, this.ProjectModel).subscribe(data => {

          var d = JSON.parse(JSON.stringify(data))

          if (d.code == 0) {
            swal("Project Updated", '', 'success').then((value) => {
              this.ngOnInit();
            })
          }

          if (d.code == 1 || d.code == 2) {
            swal(d.message, '', 'error').then((value) => {
              this.ngOnInit();
            })
          }



        })
      }
    } else {


      // SAGAR DATE
      var d1 = this.ProjectModel.billing_start_date;
      var d2 = this.ProjectModel.billing_end_date;

      var d3 = this.ProjectModel.start_date;
      var d4 = this.ProjectModel.end_date;
      if (d1) {
        var dw = new Date(d1)
        dw.setHours(12)
        this.ProjectModel.billing_start_date = dw
      }
      if (d2) {
        var dw = new Date(d2)
        dw.setHours(12)
        this.ProjectModel.billing_end_date = dw
      }
      if (d3) {
        var dw = new Date(d3)
        dw.setHours(12)
        this.ProjectModel.start_date = dw
      }
      if (d4) {
        var dw = new Date(d4)
        dw.setHours(12)
        this.ProjectModel.end_date = dw
      }

      var currentDate = new Date()
      currentDate.setHours(12)
      this.ProjectModel.created_dtm = currentDate
      // SAGAR 


      var date = new Date()
      var v = localStorage.getItem('LoggedInUser')
      // this.ProjectModel.id = date.getMonth() * 10000000 + date.getDate() * 1000000 + date.getHours() * 10000 + date.getMinutes() * 100 + date.getSeconds()
      console.log(date.getMonth() * 100000000 + date.getDate() * 1000000 + date.getHours() * 10000 + date.getMinutes() * 100 + date.getSeconds())
      this.ProjectModel.created_by_id = JSON.parse(v).user_id;
      // this.ProjectModel.created_dtm = new Date()
      this.ProjectModel.finance_owner = JSON.parse(v).user_name
      this.httpClient.post(AppConstants.HOST + 'project/create', this.ProjectModel).subscribe(data => {

        var d = JSON.parse(JSON.stringify(data))

        if (d.code == 0) {
          swal("Project Created", '', 'success').then((value) => {
            this.router.navigate(['/dashboard'])

          })
        }

        if (d.code == 1 || d.code == 2) {
          swal(d.message, '', 'error').then((value) => {
            //this.ngOnInit();
          })
        }




      })
    }
  }
  ITEM: any = { id: '', name: '' }
  release_project_code: string
  release_employee_code: string

  Release(item) {
    this.release_employee_code = item.employee_code
    this.release_project_code = item.project_code
    console.log("item", item)
    console.log("RELEASE ", this.release_project_code, this.release_employee_code)
    document.getElementById('ReleaseResourceButton').click()
    this.ITEM = item
  }



  ReleaseConfirm() {
    var d1 = this.dor;
    if (d1) {
      var dw = new Date(d1)
      dw.setHours(12)
      this.dor = dw
    }

    var d2 = this.ITEM.planned_release_date;
    if (d2) {
      var dw = new Date(d2)
      dw.setHours(12)
      this.ITEM.planned_release_date = dw
    }

    var v = localStorage.getItem('LoggedInUser')
    var requestor = JSON.parse(v).user_name
    this.httpClient.put(AppConstants.HOST + 'resourceRequest/releaseAllotment?id=' + this.ITEM.id, { date_submitted: this.currentDate, 'requestor': requestor, resource: this.ITEM.name, dor: this.dor, old_date: this.ITEM.planned_release_date, rating: this.rating, feedback: this.feedback, 'project_code': this.release_project_code, 'employee_code': this.release_employee_code }).subscribe(
      data => {

        var id = JSON.parse(JSON.stringify(data)).processInstanceId

        this.httpClient.get(AppConstants.HOST + 'resourceRequest/fetchAndLock?topic=release_resource_request&id=' + id).subscribe(
          data => {
            swal("Resource Release Requested", '', "success").then((value) => {
              this.ngOnInit()
            })
          });
      });
  }


  onSearchR() {
    // console.log("SEARCH")
    // if (this.inProjectScreen) {
    this.searchParams.if_in_project_screen = "true"
    this.searchParams.project_name = this.ProjectModel.name
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

        /* if (this.resourceList.length <= 0) {
          document.getElementById("openModalButton").click();
          document.getElementById("datanotavailButton").click();
        } */
      }
    )
    this.showGrid = true;
  }

  hideGrid() {
    this.showGrid = false;
    this.ngOnInit()
  }

  public reload() {
    location.reload();
  }
}

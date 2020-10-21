import { Component, OnInit, ɵConsole } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators, ValidationErrors, AbstractControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { routerNgProbeToken } from '@angular/router/src/router_module';
import { HttpParams, HttpClient, HttpRequest, HttpEvent, HttpResponse, HttpEventType } from '@angular/common/http';
import { AppConstants } from 'src/app/constants/app-constants';
import { EmployeeSearch } from 'src/app/model/resource';
import swal from 'sweetalert';
import { SearchProject } from '../search-project/search-project.component';
import { AllocateResource } from 'src/app/model/allocate-resource';
import { map, filter, scan } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { forEach } from '@angular/router/src/utils/collection';
import { AngularWaitBarrier } from 'blocking-proxy/built/lib/angular_wait_barrier';
import { numberLength, numberminlength } from 'src/app/services/validation.service';
import { DateAdapter, MAT_DATE_FORMATS } from '@angular/material';
import { PickDateAdapter, PICK_FORMATS } from '../../constants/date-adaptor';

@Component({
  selector: 'app-createresource',
  templateUrl: './createresource.component.html',
  styleUrls: ['./createresource.component.css'],
  providers: [{ provide: DateAdapter, useClass: PickDateAdapter },
  { provide: MAT_DATE_FORMATS, useValue: PICK_FORMATS }]
})
export class CreateresourceComponent implements OnInit {

  public loading = false;
  employee: string
  employee_id: string
  params: any
  title: string
  button: string
  hidden: boolean = false;
  DataForm: FormGroup;
  EmployeeModel: EmployeeSearch = new EmployeeSearch()
  itemsPerPage: any = '10'
  p1: any
  itemsPerPage1: any = '10'
  resourcename: string = ""
  showGrid: boolean
  CityList = []
  AreaList = []
  PrimarySkillList = []
  SecondarySkillList = []
  DomainList = []
  HRList = []
  Allocations: any = []
  role: any
  readonly: boolean = false
  minDate: Date = new Date()
  dor: Date = new Date()
  mobileNumber: string
  Projects: any = []
  searchData: SearchProject = new SearchProject()
  DSForm: FormGroup;
  request: AllocateResource = new AllocateResource();
  fileName: String
  PrimarySkillListM: any = []
  SecondarySkillListM: any = []
  ProjectForm: FormGroup
  ClientList = []
  billingStats: string[] = ['Annuity', 'T&M', 'FP', 'OES', 'Non-Billable', 'Billable']
  rname: any = ""
  pname: any = ""
  allocationWithReleaseDate: any = null
  maximumallocation: any = 0
  gradelist: string[] = ['C10','E21','E11', 'E40','L10', 'S10', 'E30','F00', 'M20', 'E20', 'M10', 'E10','M30','0','Intern']
  designationlist: string[] = ['Associate','Data Analyst','Engineer','ASA-DevOps','Associate PL','Associate Systems Analyst','Assistant Manager','Assistant Manager - QA','Assistant Manager - Testing','Assistant Manager - UxD',
  'Associate Test Analyst','Assistant Manager - PMO','Business Analyst','DL','Delivery Manager','Delivery Manager - QA','Delivery Manager - Testing','Delivery Manager - UxD','DGM- QA',
  'Junior UI','Lead - Business Analyst','Lead - Production Support','Lead - UI Developer','Lead - UI Designer','Lead - UX Designer','Lead - QA','Lead - Testing','Manager','Manager - QA','Manager - UxD',
  'Junior Engineer Production Support','Manager Strategy','Manager - Testing','Module Lead','Manager-Presales','Manual Tester','Practice Lead','Prinicipal Consultant','Program Manager',
  'Project Leader','Project Manager','Quality Analyst','Senior Business Analyst','Senior Engineer','Subcon','Contract',
  'Sr. Consultant','Sr. Manager-Sales','Sr. Manager - QA','Sr. Manager Security','Sr. Manager - Testing','Sr. Manager - UxD',
  'Sr. Project Manager','Sr. Quality Analyst','Sr. UI Developer','Sr. UI Designer','Sr. UX Designer','Systems Analyst','Technical Consultant',
  'Technical Leader','Technical Manager','Testing','Test Analyst','Trainee Associate Systems Analyst','Trainee Associate Test Analyst',
  'Trainee Business Analyst','Trainee Quality Analyst','UI Designer','UI Developer','UX Designer','Trainee UI','Sales Manager - Sales and Account Management',

'Sr Officer Sales','Account Manager','Sales Manager','Sr. Executive - Presales','Senior Manager - Operations',
'Executive','Senior Execuitve - Account Management','Sr. Vice President & Global Head - Sales & Marketing','Assistant Vice President','Assistant Vice President - Sales','Engineer Production Support','Helpdesk Associate','HEAD-STRATEGY & MARKETING','Sr. Engineer - Production Support','Executive - Alliances','Senior Cyber Security Consultant',
'Cyber Security Specialist',
'Cyber Security Engineer',
'Trainee Engineer','Sr. Executive Engineer','Jr. Engineer']
  
  levelofExpertiseList = ['Beginner', 'Intermediate', 'Expert']
  feedback: string = ""
  rating: string = ""

  ratinglist: string[] = ['A+', 'A1', 'A2', 'A3', 'B+']
  currentDate: Date


  constructor(public formBuilder: FormBuilder, public httpClient: HttpClient, public route: ActivatedRoute, public router: Router) {
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };
  }
  ngOnInit() {

    this.currentDate = new Date();
    this.currentDate.setHours(0);
    this.currentDate.setMinutes(0);
    this.currentDate.setSeconds(0);
    this.currentDate.setMilliseconds(0);
    console.log("CurrentDate", this.currentDate)
    this.showGrid = false
    console.log("CREATE INIT")

    this.EmployeeModel = new EmployeeSearch()

    var v = localStorage.getItem('LoggedInUser')
    this.role = JSON.parse(v).role
    this.route.queryParams.subscribe(params => {
      this.employee_id = params['employee'];

      if (this.employee_id != "" && this.employee_id != null && this.employee_id != undefined) {
        this.title = "Edit"
        this.hidden = true;
        this.button = "Modify"

        this.loading = false

        //this.loading = true;
        this.readonly = true
        this.httpClient.get(AppConstants.HOST + 'employee?id=' + this.employee_id).subscribe(
          data => {
            if(JSON.parse(JSON.stringify(data)).length==0)
            {
              this.router.navigate(['/dashboard'])
            }
            this.maximumallocation = 0
            console.log("FETCHED Data" + data[0])
            this.EmployeeModel = JSON.parse(JSON.stringify(data[0]))
            this.resourcename = ':  ' + this.EmployeeModel.name
            this.fileName = this.EmployeeModel.file_name;
            console.log("DOJ  " + this.EmployeeModel.doj)
            // alert("this.fileName ==" + this.fileName) 
            console.log(this.EmployeeModel)
            sessionStorage.setItem("primarySkill", this.EmployeeModel.primary_skill)
            sessionStorage.setItem("secondarySkill", this.EmployeeModel.secondary_skill)
            this.httpClient.get(AppConstants.HOST + 'allocationDetails/resource?id=' + this.employee_id).subscribe(
              data => {
                // console.log("FETCHED Project Data", data)
                this.allocationWithReleaseDate = []
                this.Allocations = JSON.parse(JSON.stringify(data))
                this.loading = false;
                this.Allocations.forEach(item => {
                  this.allocationWithReleaseDate.push({ percentage_allocation: item.percentage_allocation, planned_release_date: item.planned_release_date })
                  var releaseDate = new Date(item.planned_release_date)
                  var allocDate = new Date(item.doa)
                  var currentDate = new Date()
                  currentDate.setHours(12)
                  if (releaseDate >= allocDate && allocDate <= currentDate && releaseDate >= currentDate) {
                    console.log("Added")
                    this.maximumallocation += item.percentage_allocation;

                  }
                  // this.maximumallocation+=item.percentage_allocation
                  this.request.total_percentage_allocation = this.Allocations[0].total_percentage_allocation

                });
                console.log("With Date", this.allocationWithReleaseDate)

                console.log("Validator Set")
                // this.DSForm.controls['percentageofallocation'].setValidators([Validators.required,Validators.max(100-this.maximumallocation),Validators.min(0.1)])
                this.DSForm.controls['percentageofallocation'].setValidators([Validators.required, Validators.max(100), Validators.min(0.1)])
                this.DSForm.controls['percentageofallocation'].updateValueAndValidity()


              });
          });


      }
      else {
        this.button = "Create"
        this.title = "Submit"
        this.EmployeeModel = new EmployeeSearch();
        this.Allocations = []
        this.hidden = false
        this.readonly = false
        this.loading = false
      }

    })

    // this.route.queryParams.subscribe(params => {
    //   this.id = params['id'];
    //   if (this.id == 0 || this.id == null) {

    //     this.title = "Create"
    //     return;
    //   }
    //   else {
    //     this.title = "Edit"
    //   }
    // })

    this.validator();
    this.getDropDowns()
  }

  AllocateProject() {
    this.hideGrid()
    // this.router.navigate(['/dashboard/Resource/Allocate'], { queryParams: { 'employee_id': this.employee_id, 'employee': this.EmployeeModel.name } })
    this.Projects = []
    document.getElementById("openModalButton1").click();
  }


  myControl = new FormControl();
  options: string[] = ['select', 'option 1', 'option 2'];
  uploadSingle(event) {

  }

  onSubmit() {
    var v = localStorage.getItem('LoggedInUser')
    this.loading = true
    if ((this.employee_id == "" || this.employee_id == null)) {
      var t = new Date()
      t.setHours(12)
      // this.EmployeeModel.id = t.getDate()*1000000+t.getHours()*10000+t.getMinutes()*100+t.getSeconds()
      this.EmployeeModel.modified_by_id = JSON.parse(v).user_id;
      this.EmployeeModel.created_by_id = JSON.parse(v).user_id;
      this.EmployeeModel.created_dtm = t
      this.EmployeeModel.modified_dtm = t

      // SAGAR DATE
      var d1 = this.EmployeeModel.doj;
      var d2 = this.EmployeeModel.dob;
      if (d1) {
        var dw = new Date(d1)
        dw.setHours(12)
        this.EmployeeModel.doj = dw
      }
      if (d2) {
        var dw = new Date(d2)
        dw.setHours(12)
        this.EmployeeModel.dob = dw
      }

      //  var currentDate = new Date()
      //  currentDate.setHours(12)
      //  this.EmployeeModel.modified_dtm = currentDate
      // SAGAR 




      this.EmployeeModel.status = 'A'

      this.httpClient.post(AppConstants.HOST + 'employee/create', this.EmployeeModel).subscribe(
        data => {
          console.log(data)
          this.loading = false
          var d = JSON.parse(JSON.stringify(data))
          if (d.code == 1) {
            swal(d.message, '', 'error').then((value) => {
              // this.ngOnInit();
            });
          }
          if (d.code == 0) {
            swal('Resource Created', '', 'success').then((value) => {

              this.uploadFile(d.data.id)
              this.router.navigate(['/dashboard'])
              // this.router.navigate(['/dashboard/Resource/Create'], { queryParams: { 'employee': JSON.parse(JSON.stringify(data)).data.id } })
            });
          }
          // console.log("Inserted Project Data")
        });
    }
    else {
      if (this.EmployeeModel.exit_date > this.currentDate || this.EmployeeModel.status == 'A') {
        if (this.DataForm.pristine) {

          this.loading = false
          swal("No Data Modified ", '', 'success').then((value) => {
            this.ngOnInit();
          })
          console.log("Not Modidfied")
        }
        else {
          var d1 = this.EmployeeModel.exit_date;

          if (d1) {
            var dw = new Date(d1)
            dw.setHours(12)
            this.EmployeeModel.exit_date = dw
          }
          // this.EmployeeModel.exit_date=null
          this.EmployeeModel.modified_by_id = JSON.parse(v).user_id;
          var t = new Date()
          this.EmployeeModel.modified_dtm = t
          this.httpClient.post(AppConstants.HOST + 'employee/update?id=' + this.employee_id, this.EmployeeModel).subscribe(
            data => {
              this.loading = false
              var d = JSON.parse(JSON.stringify(data))
              if (d.code == 1) {
                swal(d.message, '', 'error').then((value) => {
                  this.ngOnInit();
                });
              }
              if (d.code == 0) {
                swal('Resource Modified', '', 'success').then((value) => {
                  this.ngOnInit();
                });

              }

              // console.log("Inserted Project Data")
            });
        }
      }
      else {

        this.loading = false
        swal("Resource is Inactive", '', 'error').then((value) => {
          this.ngOnInit();
        });
      }
    }
  }

  getDropDowns() {
    this.httpClient.get(AppConstants.HOST + 'dropdown/getCity').subscribe(
      data => {
        // console.log("FETCHED City Data", data)
        this.CityList = JSON.parse(JSON.stringify(data))
      });

    this.httpClient.get(AppConstants.HOST + 'dropdown/getArea').subscribe(
      data => {
        // console.log("FETCHED Area Data", data)
        this.AreaList = JSON.parse(JSON.stringify(data))
      });

    this.httpClient.get(AppConstants.HOST + 'dropdown/getPrimarySkill').subscribe(
      data => {
        // console.log("FETCHED Primary Data", data)
        this.PrimarySkillList = JSON.parse(JSON.stringify(data))
      });
    this.httpClient.get(AppConstants.HOST + 'dropdown/getSecondarySkill').subscribe(
      data => {
        // console.log("FETCHED Secondary Data", data)
        this.SecondarySkillList = JSON.parse(JSON.stringify(data))
      });
    this.httpClient.get(AppConstants.HOST + 'dropdown/getDomain').subscribe(
      data => {
        // console.log("FETCHED Domain Data", data)
        this.DomainList = JSON.parse(JSON.stringify(data))
      });

    this.httpClient.get(AppConstants.HOST + 'dropdown/getHR').subscribe(
      data => {
        // console.log("FETCHED HR Data", data)
        this.HRList = JSON.parse(JSON.stringify(data))
      });
    this.httpClient.get(AppConstants.HOST + 'dropdown/getClient').subscribe(
      data => {
        // console.log("FETCHED Project Data", data)
        this.ClientList = JSON.parse(JSON.stringify(data))
      });
  }


  ITEM: any = { id: '', name: '' }
  release_project_code: string
  release_employee_code: string
  Release(item) {
    this.MAXdate=new Date(item.end_date)
    console.log("End_Date:",item.end_date)
    this.MINdate=new Date(item.start_date)
    this.release_employee_code = item.employee_code
    this.release_project_code = item.project_code
    document.getElementById('ReleaseResourceButton').click()
    this.ITEM = item

    // message = "Resource Release"
    // var vals = 'Releasing resource ' + this.EmployeeModel.name + ' from ' + item.name
    // swal(message, vals, 'warning', {
    //   buttons: ["Cancel", "Confirm"],
    // }).then(value => {
    //   console.log(value)
    //   if (value) {
    //     this.httpClient.put(AppConstants.HOST + 'resourceRequest/releaseAllotment?id=' + item.id, { date_submitted: new Date(), 'requestor': requestor, resource: this.EmployeeModel.name }).subscribe(
    //       data => {
    //         var id = JSON.parse(JSON.stringify(data)).id
    //         this.httpClient.get(AppConstants.HOST + 'resourceRequest/fetchAndLock?topic=release_resource_request&id='+id).subscribe(
    //           data => {
    //             swal("Release Requested ", '', "success")
    //           });
    //       })

    //   }
    //   // else
    //   //   swal("Rejected ",JSON.parse(JSON.stringify(data)).data,"success")
    // }
    // )
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
    this.httpClient.put(AppConstants.HOST + 'resourceRequest/releaseAllotment?id=' + this.ITEM.id, { date_submitted: new Date(), 'requestor': requestor, resource: this.EmployeeModel.name, dor: this.dor, old_date: this.ITEM.planned_release_date, rating: this.rating, feedback: this.feedback, 'project_code': this.release_project_code, 'employee_code': this.release_employee_code }).subscribe(
      data => {

        var id = JSON.parse(JSON.stringify(data)).processInstanceId
        this.httpClient.get(AppConstants.HOST + 'resourceRequest/fetchAndLock?topic=release_resource_request&id=' + id).subscribe(
          data => {
            swal("Resource Release Requested ", '', "success").then((value) => {

              this.ngOnInit();
              //this.router.navigate(['/dashboard/Resource/Create'], { queryParams: { 'employee': this.employee_id} });   
            })
          });
      });
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
    this.request.employee_code = this.EmployeeModel.code
    var date = new Date()
    this.request.date_submitted = new Date()
    this.request.created_by_id = JSON.parse(v).user_id
    this.request.id = date.getMonth() * 10000000 + date.getDate() * 1000000 + date.getHours() * 10000 + date.getMinutes() * 100 + date.getSeconds()
    if (this.role == 'rm') {
      this.httpClient.post(AppConstants.HOST + 'allocateNew', this.request).subscribe((data) => {
        var d = JSON.parse(JSON.stringify(data))
        if (d.code == 1 || d.code == 2) {
          swal(d.message, '', 'error').then((value) => {

            //document.getElementById("AllocationDismiss").click();
            //this.reload()
          });
        } else {
          document.getElementById("AllocationDismiss").click();
          swal('Resource Allocated', '', 'success').then((value) => {
            this.reload()
          })
        }
      })
    } else {
      this.httpClient.post(AppConstants.HOST + 'resourceRequest/startProcess?key=allocate_resource_process&type=insert', this.request).subscribe(
        data => {
          var d = JSON.parse(JSON.stringify(data))
          if (d.code == 1 || d.code == 2) {
            //document.getElementById("AllocationDismiss").click();
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
                  this.reload()

                });

              });
          }
        });
    }
  }

  onSearchP() {
    this.httpClient.post(AppConstants.HOST + 'project/search', this.searchData).subscribe(data => {
      this.Projects = data
    })
    this.showGrid = true;
  }

  hideGrid() {
    this.showGrid = false;
    this.ngOnInit()
  }
  MAXdate: Date
  MINdate: Date

  AllocateResourceProject(item) {
    this.DSForm.markAsPristine()
    this.DSForm.markAsUntouched()
    this.DSForm.updateValueAndValidity()
    this.MAXdate = new Date(item.end_date)
    this.MINdate = new Date(item.start_date)
    this.PrimarySkillListM = []
    this.SecondarySkillListM = []
    this.PrimarySkillListM.push(this.EmployeeModel.primary_skill)
    this.SecondarySkillListM.push(this.EmployeeModel.secondary_skill)
    this.rname = this.EmployeeModel.name
    console.log(this.EmployeeModel.name)
    this.DSForm.controls['resource'].setValue(this.EmployeeModel.name)
    this.request.employee_name = this.EmployeeModel.name
    this.request.project_name = item.project_name
    this.DSForm.controls['project'].setValue(item.project_name)
    this.request.project_code = item.project_code
    this.DSForm.controls['project_code'].setValue(item.project_code)
    //this.maximumallocation=item.percentage_allocation
    this.request.total_percentage_allocation = this.maximumallocation
    console.log("totalre:", item.percentage_allocation)
    this.DSForm.controls['toatalpercentageofallocation'].setValue(this.request.total_percentage_allocation)
    // this.request.project_name = this.pname
    console.log("Allocate")

    document.getElementById("openAllocateModalButton").click();
    //DATE SAGAR 

    var dw: Date = new Date(this.currentDate)
    dw.setDate(dw.getDate() + 1);
    dw.setHours(12)
    this.request.doa = dw;
    console.log("old ", d, " NEW", this.request.doa)
    if (item.end_date != "" && item.end_date != null) {
      var d = this.request.planned_release_date;
      var dw: Date = new Date(item.end_date)
      dw.setHours(12)
      this.request.planned_release_date = dw
      //DATE SAGAR
    }
    else { this.request.planned_release_date = null }
  }

  ////////////////////

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
    const req = new HttpRequest('POST', AppConstants.FILE_IP +'upload/'+ id, formdata, {
      reportProgress: true,
      responseType: 'text'
    }
    );
    return this.httpClient.request(req);
  }

  downloadFile() {

    if (this.fileName) {
      window.open(AppConstants.FILE_IP +'download/'+ this.fileName)
      console.log("Resume Downlaoded........!" + this.fileName);
    } else {
      this.httpClient.get(AppConstants.FILE_IP +'download/'+ this.fileName).subscribe(data => {
        swal('File Not Found', '', 'error')
      })
    }
  }

  //Check form validations
  validator() {
    this.DataForm = this.formBuilder.group({
      subCategory: ['', []],
      city: ['', [, Validators.maxLength(50), Validators.required]],
      area: ['', [, Validators.maxLength(50), Validators.required]],
      levelofexpertise: ['', []],
      secondarySkills: ['', []],
      primarySkills: ['', [Validators.required]],
      vertical: ['', []],
      empStatus: ['', [Validators.required]],
      gender: ['', [Validators.required, Validators.pattern('^[a-zA-Z]*$')]],
      domain: ['', []],
      mobileNumber: ['', [Validators.required, numberLength(12), numberminlength(10), Validators.pattern('^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$')]],
      resStatus: ['', []],
      nseitemail: ['', [Validators.required, Validators.pattern('^[A-Za-z0-9._\-]+@nseit.com$')]],
      relevantexperience: ['', [Validators.required, (control: AbstractControl) => Validators.max(this.EmployeeModel.total_experience)(control)]],
      totalexperience: ['', [Validators.required, (control: AbstractControl) => Validators.min(this.EmployeeModel.relevant_experience)(control)]],
      grade: ['', [Validators.required, Validators.maxLength(3), Validators.pattern('^[a-zA-Z0-9]*$')]],
      designation: ['', [Validators.required]],
      empName: ['', [Validators.required, Validators.minLength(3), Validators.pattern('^[a-zA-Z\- ._():]+$')]],
      empCode: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(7), Validators.pattern('^[a-zA-Z0-9 ]*$')]],
      currentResidentCity: ['', []],
      currentResidentArea: ['', []],
      stdbillingRate: ['', []],
      minbillingRate: ['', []],
      avgbillingRate: ['', []],
      recruiterName: ['', [Validators.required]],
      dob: ['', Validators.required],
      doj: ['', Validators.required],
      education: ['', Validators.required],
      certification: ['',],
      exitDate: ['']
    });

    this.DSForm = this.formBuilder.group({
      project: ['', [Validators.required, Validators.maxLength(100)]],
      //projectDescription: ['',[Validators.required,Validators.maxLength(300)]],
      //projectCode:['',[Validators.required,Validators.maxLength(10)]],
      onsiteOffshore: ['', [Validators.required, , Validators.required]],
      billingStatus: ['', [Validators.required,]],
      billingRate: ['', [Validators.required,]],
      percentageofallocation: ['', [Validators.required, Validators.min(0.1), Validators.max(100)]],
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
      toatalpercentageofallocation: [],
      planned_release_date: ['', Validators.required],
      doa: ['', Validators.required,],
      designation: ['', [Validators.maxLength(30)]],
      resource: ['', [Validators.required, Validators.minLength(3), Validators.pattern('^[a-zA-Z\- &$,.:=@#_]+$')]],
      empCode: ['', [Validators.maxLength(10)]],
      available_from_date: [],
      empStatus: [],
      startDate: [],
      endDate: [],
      allocation_type: [],
      domain: [],
      project_code: []

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


  DOAChange(event) {

    // console.log("DOA Changed ",this.request.doa)
    // var currentDate = new Date()
    // currentDate.setHours(12)
    // this.maximumallocation=0;

    // var ad = this.request.doa;
    // //console.log("RELEASE DATE ",ad.getDate() ,(ad.getMonth()+1) , ad.getFullYear())
    // this.allocationWithReleaseDate.forEach(item => {
    //   var rd = new Date(item.planned_release_date);

    // console.log("RELEASE DATE ",rd.getDate() ,(rd.getMonth()+1) , rd.getFullYear())

    // console.log("Allocation DATE ",ad.getDate() ,(ad.getMonth()+1) , ad.getFullYear())

    //   var releaseDate = new Date(rd.getFullYear(),rd.getMonth() , rd.getDate())

    //   var allocDate = new Date(ad.getFullYear(),ad.getMonth() , ad.getDate())
    //   console.log("release Date ",releaseDate ,"allocDate ",allocDate)
    //   if(releaseDate >= allocDate && allocDate<=currentDate  && releaseDate>=currentDate  ){
    //           console.log("Added")
    //           this.maximumallocation+=item.percentage_allocation;

    //   }
    //   else{

    //   }
    // }); 

    // console.log("Maximum Allocation NEW ",this.maximumallocation)
    this.DSForm.controls['percentageofallocation'].setValidators([Validators.required, Validators.max(100), Validators.min(0.1)])
    this.DSForm.controls['percentageofallocation'].updateValueAndValidity()
  }
  public reload() {
    location.reload();
  }
}

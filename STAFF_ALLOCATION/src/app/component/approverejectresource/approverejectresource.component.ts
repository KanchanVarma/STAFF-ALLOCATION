import { Component } from '@angular/core';
import {FormControl, FormBuilder, FormGroup} from '@angular/forms';

import { ResourceAllocation } from '../resourcesallocationlist/resourcesallocationlist.component';
import { HttpClient } from '@angular/common/http';
import swal from 'sweetalert'; 
import { AppConstants } from 'src/app/constants/app-constants';
import { PickDateAdapter, PICK_FORMATS } from 'src/app/constants/date-adaptor';
import { DateAdapter,MAT_DATE_FORMATS } from '@angular/material';

@Component({
  selector: 'app-approverejectresource',
  templateUrl: './approverejectresource.component.html',
  styleUrls: ['./approverejectresource.component.css'],
  providers : [{provide: DateAdapter, useClass: PickDateAdapter},
    {provide: MAT_DATE_FORMATS, useValue: PICK_FORMATS}]
})
export class ApproverejectresourceComponent  {

  myControl = new FormControl();
  show:boolean=false;
  requestId:string;
  emp:any
  options: string[] = ['select', '', ''];
  constructor(public formBuilder: FormBuilder, public httpClient: HttpClient) { }
  resourceList:any;
  requestList:any
  mRequest:ResourceAllocation = new ResourceAllocation();;
  uploadForm: FormGroup;
  ngOnInit() {
    this.uploadForm = this.formBuilder.group({

    });

    this.httpClient.get(AppConstants.HOST+'resourceRequest/getAllocationMast').subscribe(
      data => {
        // console.log(JSON.stringify(data));
        this.requestList = data;
        // console.log(this.requestList);
        // console.log(this.requestList[0])
        // console.log("Data : "+JSON.stringify(data));

      }
    )
    
    // console.log("Data : 1");
  }

  onGetRequest(request){
    document.getElementById("openModalButton").click();
    this.mRequest= request;
    this.mRequest.doa =new Date()
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
    var t = this.mRequest.id
    this.mRequest.approval_status=status
    // console.log("Data : "+t);
      this.httpClient.put(AppConstants.HOST+'resourceRequest/approveAllotment/'+Number(t), {approval_status:this.mRequest.approval_status, remark:this.mRequest.remark }).subscribe(
        data => {
          // console.log("Data" + data)
          
            swal(this.mRequest.approval_status,JSON.parse(JSON.stringify(data)).data,"success")
          // else
          //   swal("Rejected ",JSON.parse(JSON.stringify(data)).data,"success")
        }
      )
  }
}

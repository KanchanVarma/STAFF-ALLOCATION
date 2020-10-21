import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { PickDateAdapter, PICK_FORMATS } from 'src/app/constants/date-adaptor';
import { DateAdapter,MAT_DATE_FORMATS } from '@angular/material';
@Component({
  selector: 'app-exitresource',
  templateUrl: './exitresource.component.html',
  styleUrls: ['./exitresource.component.css'],
  providers : [{provide: DateAdapter, useClass: PickDateAdapter},
    {provide: MAT_DATE_FORMATS, useValue: PICK_FORMATS}]
})
export class ExitresourceComponent {
  myControl = new FormControl();
  options: string[] = ['select', 'option 1', 'option 2'];

  selectedFiles: FileList;
fileName: string;

fileInput(event) {
    this.selectedFiles = event.target.files;
    this.fileName = this.selectedFiles[0].name;
    console.log('selectedFiles: ' + this.fileName );
  }
}

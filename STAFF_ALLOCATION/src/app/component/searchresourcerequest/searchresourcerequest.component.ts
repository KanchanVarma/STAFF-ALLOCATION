import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-searchresourcerequest',
  templateUrl: './searchresourcerequest.component.html',
  styleUrls: ['./searchresourcerequest.component.css']
})
export class SearchresourcerequestComponent{
  myControl = new FormControl();
  options: string[] = ['select', 'option 1', 'option 2'];
}

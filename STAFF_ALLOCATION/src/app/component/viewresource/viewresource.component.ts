import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-viewresource',
  templateUrl: './viewresource.component.html',
  styleUrls: ['./viewresource.component.css']
})
export class ViewresourceComponent {
  myControl = new FormControl();
  options: string[] = ['select', 'option 1', 'option 2'];

}

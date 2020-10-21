import { Component, OnInit } from '@angular/core';
import { AuthService } from '../service/auth.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  current: any;
  mobile: boolean = false;
  role: any
  showDD: boolean = false;
  currentClass:any = 'home'
  constructor(private authService: AuthService) { }
  public activeClass: string = "home"
  public hideClass: boolean = false
  ngOnInit() {
    console.log("Width = ", window.screen.width)
    if (window.screen.width >= 800)
      this.mobile = true;
    else
      this.mobile = false;
    this.current = JSON.parse(localStorage.getItem("LoggedInUser"));
    this.role = this.authService.getRole()
  }
  onClick(v) {
    console.log("Clicked")
    this.activeClass = v;
    this.hideClass = true;
    if(this.activeClass=='home')
    this.currentClass='home'
    console.log("Current " + v)
    this.showDD = true;
  }

  dropdown(hide) {
    console.log("Clicked")
    this.hideClass = false;
    
    this.currentClass = hide;
    console.log("Current " + hide)

  }
  Reset(current) {
    if (this.activeClass == current) {
      this.activeClass = this.currentClass
      this.showDD = false;
    }
  }
}

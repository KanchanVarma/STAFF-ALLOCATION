import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { routerNgProbeToken } from '@angular/router/src/router_module';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  username:any;
  constructor(public router:Router) { }

  ngOnInit() {
    var v =localStorage.getItem('LoggedInUser')
    this.username = JSON.parse(v).user_name;
  }

  LogOut(){
    this.router.navigateByUrl('/');
  }

}

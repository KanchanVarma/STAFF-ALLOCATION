import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { routerNgProbeToken } from '@angular/router/src/router_module';

@Component({
  selector: 'app-component',
  templateUrl: './component.component.html',
  styleUrls: ['./component.component.css']
})
export class ComponentComponent implements OnInit {
  current:any
  constructor(public router:Router) { }

  ngOnInit() {
    this.current = JSON.parse(localStorage.getItem("LoggedInUser"));
    console.log(this.current)
    console.log(this.current.role)
    if(this.current.role=='rm'){
      this.router.navigateByUrl('/dashboard/ResourceManagerDashboard')
    }
    else if(this.current.role=='delivery'){
      this.router.navigateByUrl('/dashboard/ProjectManagerDashboard')
    }
    else if(this.current.role=='hr'){
      this.router.navigateByUrl('/dashboard/HRDashboard')
    }
    else if(this.current.role=='finance'){
      this.router.navigateByUrl('/dashboard/FinanceDashboard')
    }
  }

}

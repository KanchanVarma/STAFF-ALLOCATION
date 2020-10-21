import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../service/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private auth: AuthService) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    let roles = next.data["roles"] as Array<string>;
    console.log("NEXT Route", this.auth.getRole(), roles)
    if (roles.includes(this.auth.getRole())) {
      
      console.log("ALLOWED")
      return true;
    } else {
      console.log("Query Params",JSON.stringify(next.queryParams) ==="{}")
      
      console.log("Next ",next)
      if (next.data["update"]) {
        console.log("UPDATE",next.data["update"])
        let UpdateRoles = next.data["update"] as Array<string>;
        console.log(" ROLE ",this.auth.getRole())
        console.log(" Condition1 ",UpdateRoles.includes(this.auth.getRole()))
        console.log(JSON.stringify(next.queryParams))
        console.log(" Condition2 ",JSON.stringify(next.queryParams)!="{}")
        if (UpdateRoles.includes(this.auth.getRole()) && (JSON.stringify(next.queryParams)!="{}")) {
          console.log("ALLOWED")
          return true;
        }
        else{
          console.log("NOT ALLOWED")
          
        return false;
        }
      } else {
        console.log("NOT ALLOWED")
        swal("Not Allowed", "", "error");
        return false;
      }
    }
  }
}

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  MYRole: string
  constructor() { }


  sendToken(token: string, role: string) {
    localStorage.setItem("LoggedInUser", token)
    console.log("ROLE", role)
    this.MYRole = role;
  }

  public getRole() {
    if (this.MYRole == undefined || this.MYRole == null) {
      var v = localStorage.getItem("LoggedInUser")
      if (!v)
        return null
      console.log("ROLE", v)
      this.MYRole = JSON.parse(v).role;
    }
    return this.MYRole
  }
}

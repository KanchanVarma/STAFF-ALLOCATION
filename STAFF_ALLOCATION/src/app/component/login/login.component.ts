import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import swal from 'sweetalert';
import { AuthService } from 'src/app/service/auth.service';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'nseit'
  })
};
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user: User = new User();
  DataForm: FormGroup;
  constructor(public formBuilder: FormBuilder, public httpClient: HttpClient, private router: Router,private authService:AuthService) { }

  public loading = false;
  //loginIp:string ='http://172.25.8.56:8989/login'
   loginIp:string ='/login/icewarpauth'
  ngOnInit() {
 localStorage.clear();
  }

  Login() {
    var obj :User = new User();
    obj.userName = this.user.userName;
    obj.userPassword = this.user.userPassword;
    obj.userName=obj.userName
    this.loading=true
    this.httpClient.post(this.loginIp, obj, { headers: httpOptions.headers})
    .subscribe((data:any) => {
      console.log(data)
      if(data.code ==0){        
        console.log(data.data)
        this.authService.sendToken(JSON.stringify(data.data),data.data.role)
        
        this.loading=false
        this.router.navigateByUrl('/dashboard')

      }
      else{
        console.log("Login " )
        this.loading=false
        swal("Incorrect Credentials","", "error");
      }
    },
      error => {
        console.log("Login " + error)
        this.loading=false
        swal("Login Failed","", "error");
      });
  }
}

export class User {
  userName: string
  userPassword: string
}

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { EMPTY } from 'rxjs';
import { map, catchError } from 'rxjs/operators';


const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'my-auth-token'
  })
};

@Injectable({
  providedIn: 'root'
})
export class DataService {

  response:any;
  constructor(public httpClient:HttpClient) { }

  public get(URL:string,params?:HttpParams){
    return this.httpClient.get(URL,{headers:httpOptions.headers ,params:params}) 
    .pipe(
      map((response : Response) => {
      this.response = response;
      var errorCode = this.response.code;
      if(errorCode==1)
      {
        //alert("Error", this.response.message, "error");
        return;
      }
      else if (this.response.code == -1) {
        console.log("RESPONSE Code --" + this.response.code)
       // Swal(this.response.message, this.response.data, "info");
        return this.response;
      }
      else if(this.response.data==null)
      {
        //Swal("Error", this.response.message, "error");
        return
      }
      return this.response;
    }), catchError( err => {
      console.log("Error ",err)
        if(err.status==440)
        {//error 
          return EMPTY ;
        }
        else
        {
          return EMPTY ;
        }
      })
    );
  }

  public post(URL:string,data:any){
    return this.httpClient.post(URL,data,{headers:httpOptions.headers }) 
    .pipe(
      map((response : Response) => {
      this.response = response;
      var errorCode = this.response.code;
      if(errorCode==1)
      {
        //alert("Error", this.response.message, "error");
        return;
      }
      else if (this.response.code == -1) {
        console.log("RESPONSE Code --" + this.response.code)
       // Swal(this.response.message, this.response.data, "info");
        return this.response;
      }
      else if(this.response.data==null)
      {
        //Swal("Error", this.response.message, "error");
        return
      }
      return this.response;
    }), catchError( err => {
      console.log("Error ",err)
        if(err.status==440)
        {//error 
          return EMPTY ;
        }
        else
        {
          return EMPTY ;
        }
      })
    );
  }


}

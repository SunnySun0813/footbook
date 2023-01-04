import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from './data.model';
import { StateService } from './state.service';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  private token!: string;
  private tokenTimer: any;

  getToken() {
    return this.token;
  }

  constructor(private http:HttpClient, private state:StateService, private router:Router) {}

  addUser(email:string, first:string, last:string, avatar:string, password:string) {
    const user: User = {
      _id: "",
      first: first,
      last: last,
      email: email,
      avatar: avatar===""?"https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png":avatar,
      password: password,
      friendList: [],
      postList: [],
      request: [],
      response: []
    }
    return this.http.post<{message:boolean}>("http://localhost:3000/user", user);
  }


  getUser(email:string, password:string) {                          // problem?: how to pass password from frontend to backend
    this.http.get<{message:boolean,user:any,token:any, expiresIn:number}>("http://localhost:3000/user/" + email + '/' + password)
    .subscribe(
      (responseData)=> {
        if (responseData.user !== null) {
          this.state.getLogginUser(responseData.user);
          this.state.getIsLoggin(true);

          this.token = responseData.token;
          const expiresIn = responseData.expiresIn;
          const now = new Date();
          const expireDate = new Date(now.getTime() + expiresIn * 1000);
          console.log(expireDate);
          this.saveAuthData(responseData.token, expireDate, responseData.user);
          window.alert("login successful");
          this.router.navigate(['/feed/'+responseData.user._id]);
        }
        else {}
      },
      (error)=> {
        console.log("login failed");
      }
    );
  }

  private saveAuthData(token: string, expirationDate: Date, user: User) {
    localStorage.setItem("token", token);
    localStorage.setItem("expiration", expirationDate.toISOString());
    localStorage.setItem("userInfo", JSON.stringify(user));
  }

  getOther(email:string) {
    return this.http.get<{message:boolean, user:any}>("http://localhost:3000/user/" + email);
  }

  editUserInfo(user:any) {
    this.http.put<{message:boolean}>("http://localhost:3000/user/" + user._id + '/' + user.email, user).subscribe(
      (val)=>{
        if (val.message) {
          console.log("Successfully edited");
        }
        else {
          console.log("Successfully failed");
        }
      }
    );
  }

  editUser(user:any) {
    this.http.put<{message:boolean}>("http://localhost:3000/user/" + user._id, user).subscribe(
      (val)=>{
        if (val.message) {
          console.log("Successfully edited");
        }
        else {
          console.log("Successfully failed");
        }
      }
    );
  }

  getAllOther() {
    return this.http.get<{message:boolean,users:any}>("http://localhost:3000/user");
  }
}

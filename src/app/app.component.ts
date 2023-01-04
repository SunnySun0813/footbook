import { Component, OnInit } from '@angular/core';
import { HttpService } from './shared/http.service';
import { StateService } from './shared/state.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  isLoggin!:boolean;
  constructor(private state:StateService, private http:HttpService){}
  ngOnInit() {
    const token = localStorage.getItem("token");
    const expireIn = localStorage.getItem("expiration");
    const userInfo = JSON.parse(localStorage.getItem("userInfo")!);
    if (!token || !expireIn) {}
    else {
      const expire = new Date(expireIn).getTime();
      const current = new Date().getTime();
      if (current < expire) {
        this.state.getLogginUser(userInfo);
        this.state.getIsLoggin(true);
      }
    }

    this.state.setIsLoggin$.subscribe((val)=>{
      this.isLoggin = val;
    })

  }
}


import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/shared/data.model';
import { HttpService } from 'src/app/shared/http.service';
import { StateService } from 'src/app/shared/state.service';

@Component({
  selector: 'app-friend',
  templateUrl: './friend.component.html',
  styleUrls: ['./friend.component.css']
})
export class FriendComponent implements OnInit {
  constructor(private state:StateService, private http:HttpService, private router:Router) {}
  user!:User;
  friends:any[]=[];
  response:any[]=[];
  ngOnInit() {
    this.state.setLogginUser$.subscribe((val)=>{
      this.friends = [];
      this.response = [];
      this.user=val!;
      for (let i = 0; i < this.user.friendList.length; i++) {
        this.http.getOther(this.user.friendList[i]).subscribe(
          (val)=>{
            this.friends.push(val.user);
          }
        );
      }
      for (let i = 0; i < this.user.response.length; i++) {
        this.http.getOther(this.user.response[i]).subscribe(
          (val)=>{
            this.response.push(val.user);
          }
        );
      }
    });
  }

  accept(email:string) {
    this.user.response = this.user.response.filter((val)=>{return val !== email});
    this.user.friendList.push(email);
    this.state.getLogginUser(this.user);
    this.http.editUser(this.user);

    this.http.getOther(email).subscribe(
      (val)=> {
        let temp = val.user;
        temp.request = temp.request.filter((val:string)=>{return val !== this.user.email});
        temp.friendList.push(this.user.email);
        this.http.editUser(temp);
      }
    );

    window.alert("Successful accepted");
    this.router.navigate(['/friend',this.user._id]);
  }

  refuse(email:string) {
    this.user.response = this.user.response.filter((val)=>{return val !== email});
    this.state.getLogginUser(this.user);
    this.http.editUser(this.user);

    this.http.getOther(email).subscribe(
      (val)=> {
        let temp = val.user;
        temp.request = temp.request.filter((val:string)=>{return val !== this.user.email});
        this.http.editUser(temp);
      }
    );

    window.alert("Successful refused");
    this.router.navigate(['/friend',this.user._id]);
  }

  deleteFriend(email:string) {
    this.user.friendList = this.user.friendList.filter((val)=>{return val !== email});
    this.state.getLogginUser(this.user);
    this.http.editUser(this.user);

    this.http.getOther(email).subscribe(
      (val)=> {
        let temp = val.user;
        temp.friendList = temp.friendList.filter((val:string)=>{return val !== this.user.email});
        this.http.editUser(temp);
      }
    );

    window.alert("Successful deleted");
    this.router.navigate(['/friend',this.user._id]);
  }
 }



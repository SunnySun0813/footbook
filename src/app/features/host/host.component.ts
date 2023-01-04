import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/shared/data.model';
import { HttpService } from 'src/app/shared/http.service';
import { StateService } from 'src/app/shared/state.service';

@Component({
  selector: 'app-host',
  templateUrl: './host.component.html',
  styleUrls: ['./host.component.css']
})
export class HostComponent {
  constructor(private state:StateService, private http:HttpService, private router:Router) {}

  user!:User;
  editMode = true;
  comfirm = "";
  error = "";
  ngOnInit() {
    this.state.setLogginUser$.subscribe((val)=>{
      this.user = val!;
    });
  }

  startEdit() {
    this.editMode = !this.editMode;
    this.user.password = '';
  }

  validation() {
    if (!this.user.password.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+*!=]).*$/)) {
      this.error = "Invalid password format";
      return;
    }
    if (this.user.password !== this.comfirm) {
      this.error = "Comfirm password does not match";
      return;
    }
    this.error = '';
    for (let i = 0; i < this.user.postList.length; i++) {
      this.user.postList[i].first = this.user.first;
      this.user.postList[i].last = this.user.last;
      this.user.postList[i].avatar = this.user.avatar;
      for (let j = 0; j < this.user.postList[i].commentList.length; j++) {
        if (this.user.postList[i].commentList[j].commenter === this.user.email) {
          this.user.postList[i].commentList[j].first = this.user.first;
          this.user.postList[i].commentList[j].last = this.user.last;
          this.user.postList[i].commentList[j].avatar = this.user.avatar;
        }
      }
    }
    this.editMode = !this.editMode;
    this.state.getLogginUser(this.user);
    this.http.editUser(this.user);

    window.alert("Successful edited");
    this.router.navigate(['/host',this.user._id]);
  }

  deletePost(index:number) {
    this.user.postList.splice(index,1);
    this.state.getLogginUser(this.user);
    this.http.editUser(this.user);
    window.alert("Successful deleted");
    this.router.navigate(['/host',this.user._id]);
    //
  }
}

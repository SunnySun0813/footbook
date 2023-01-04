import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Post, User } from 'src/app/shared/data.model';
import { HttpService } from 'src/app/shared/http.service';
import { StateService } from 'src/app/shared/state.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  constructor(private state:StateService, private http:HttpService) {}
  user!:User;

  ngOnInit() {
    this.state.setLogginUser$.subscribe((val)=>{
      this.user=val!;
    });
  }

  onAddPost(form:NgForm) {
    const post = new Post(this.user.email,this.user.first, this.user.last,this.user.avatar,form.value.content, form.value.image, new Date().getTime(), []);
    this.user.postList.push(post);
    this.state.getLogginUser(this.user);
    this.http.editUser(this.user);
    form.resetForm();
  }
}


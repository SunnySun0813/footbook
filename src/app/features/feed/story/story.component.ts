import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpService } from 'src/app/shared/http.service';
import { StateService } from 'src/app/shared/state.service';
import { User, Comment, Post } from '../../../shared/data.model';

@Component({
  selector: 'app-story',
  templateUrl: './story.component.html',
  styleUrls: ['./story.component.css']
})
export class StoryComponent implements OnInit {

  constructor(private route:ActivatedRoute, private state:StateService, private router:Router, private http:HttpService) {}
  user!:any;
  friends:any[] = [];
  posts:any[] = [];

  ngOnInit() {
    this.state.setLogginUser$.subscribe((val)=>{
      this.posts = [];
      this.friends = [];
      this.user=val!;
      for (let i = 0; i < this.user.postList.length; i++) {
        let post = [];
        let holder = '';
        post.push(holder);
        post.push(this.user.postList[i]);
        this.posts.push(post);
      }
      for (let i = 0; i < this.user.friendList.length; i++) {
        this.http.getOther(this.user.friendList[i]).subscribe(
          (val)=>{
            this.friends.push(val.user);
            for (let i = 0; i < val.user.postList.length; i++) {
              let post = [];
              let holder = '';
              post.push(holder);
              post.push(val.user.postList[i]);
              this.posts.push(post);
            }
          }
        );
      }
      let now = new Date().getTime();
      // problem? sort problem
      /*
      this.posts = this.posts.sort((a,b)=> a[1].date - b[1].date);
      this.posts = this.posts.filter((val)=> val[1].date > (now-7200000));
      */
    });
  }

  addComment(index:any) {
    const comment = new Comment(this.user.email,this.user.first,this.user.last,this.user.avatar,this.posts[index][0]);
    this.posts[index][0] = '';
    if (this.user.email !== this.posts[index][1].poster) {
      for (let i = 0; i < this.friends.length; i++) {
        if (this.posts[index][1].poster === this.friends[i].email) {
          for (let j = 0; j < this.friends[i].postList.length; j++) {
            if (this.posts[index][1]._id === this.friends[i].postList[j]._id) {
                this.friends[i].postList[j].commentList.push(comment);
                this.http.editUser(this.friends[i]);
              break;
            }
          }
          break;
        }
      }
    }
    else {
      for (let i = 0; i < this.user.postList.length; i++) {
        if (this.posts[index][1]._id === this.user.postList[i]._id) {
            this.user.postList[i].commentList.push(comment);
            this.http.editUser(this.user);
          break;
        }
      }
    }
  }

  deleteComment(index:any,jndex:any) {
    if (this.user.email !== this.posts[index][1].poster) {
      for (let i = 0; i < this.friends.length; i++) {
        if (this.posts[index][1].poster === this.friends[i].email) {
          for (let j = 0; j < this.friends[i].postList.length; j++) {
            if (this.posts[index][1]._id === this.friends[i].postList[j]._id) {
               this.friends[i].postList[j].commentList.splice(jndex,1);
               this.http.editUser(this.friends[i]);
              break;
            }
          }
          break;
        }
      }
    }
    else {
      for (let i = 0; i < this.user.postList.length; i++) {
        if (this.posts[index][1]._id === this.user.postList[i]._id) {
            this.user.postList[i].commentList.splice(jndex,1);
            this.http.editUser(this.user);
          break;
        }
      }
    }
  }
}



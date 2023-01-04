import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/shared/data.model';
import { HttpService } from 'src/app/shared/http.service';
import { StateService } from 'src/app/shared/state.service';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  constructor(private route:ActivatedRoute, private state:StateService, private router:Router, private http:HttpService) {}
  keyword!:string|null;
  list:any[] = [];
  user!:User;

  ngOnInit() {
    this.keyword = this.route.snapshot.paramMap.get('keyword');
    this.state.setLogginUser$.subscribe((val)=>{
      this.user = val!;
    });
    this.http.getAllOther().subscribe(
      (val)=>{
        this.list = val.users.filter((item:any)=>{
          return (item.first.includes(this.keyword!) || item.last.includes(this.keyword!))
          && !this.user.friendList.includes(item.email) && !this.user.response.includes(item.email) && item.email !== this.user.email
        });
      }
    );
  }

  onRequest(email:string) {
    this.user.request.push(email);
    this.state.getLogginUser(this.user);
    this.http.editUser(this.user);

    let temp:any;
    this.http.getOther(email).subscribe(
      (val)=>{
        temp = val.user;
        temp.response.push(this.user.email);
        this.http.editUser(temp);
      }
    );

    window.alert("Request sent");
    this.router.navigate(['/search',this.user._id,this.keyword]);
  }
}

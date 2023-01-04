import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../shared/data.model';
import { StateService } from '../shared/state.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private router:Router, private state:StateService) {}

  keyword:string = '';
  user!:User;

  ngOnInit() {
    this.state.setLogginUser$.subscribe((val)=>{
      this.user = val!;
    });
  }

  search() {
    if (this.keyword !== '') {
      this.router.navigate(['/search/'+this.user._id+'/'+this.keyword]);
    }
  }

  logout() {
    this.state.getIsLoggin(false);
    localStorage.removeItem("token");
    localStorage.removeItem("expiration");
    localStorage.removeItem("userInfo");
    this.router.navigate(['/login']);
  }
}

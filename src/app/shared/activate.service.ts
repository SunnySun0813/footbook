import { Injectable } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, Router } from '@angular/router';
import { StateService } from './state.service';

@Injectable({
  providedIn: 'root'
})
export class ActivateService {

  constructor(private router:Router, private state:StateService){}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    let activate = true;
    this.state.setIsLoggin$.subscribe(
      (data)=>{
        if (!data) {
          activate = false;
        }
      }
    );
    this.state.setLogginUser$.subscribe(
      (data)=> {
        if (data!._id !== route.params["id"]) {
          activate = false;
        }
      }
    );

    if (activate) {
      return true;
    }
    else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}

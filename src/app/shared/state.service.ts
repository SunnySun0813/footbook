import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from './data.model';

@Injectable({
  providedIn: 'root'
})
export class StateService {

  constructor() { }

  private isLoggin = new BehaviorSubject<boolean>(false);
  setIsLoggin$ = this.isLoggin.asObservable();
  getIsLoggin(isLoggin:boolean) {
    this.isLoggin.next(isLoggin);
  }

  private logginUser = new BehaviorSubject<User|null>(null);
  setLogginUser$ = this.logginUser.asObservable();
  getLogginUser(user:User) {
    this.logginUser.next(user);
  }
}

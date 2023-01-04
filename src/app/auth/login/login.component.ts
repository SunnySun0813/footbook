import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpService } from 'src/app/shared/http.service';
import { StateService } from 'src/app/shared/state.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  constructor(private router:Router, private http:HttpService, private state:StateService){}
  error:string = "";

  signupForm!: FormGroup;
  ngOnInit() {
    this.state.setIsLoggin$.subscribe((val)=>{
      if (val) {
        this.state.setLogginUser$.subscribe((val)=>{
          this.router.navigate(['/feed', val!._id]);
        })
      }
      this.signupForm = new FormGroup({
        'email': new FormControl('', [Validators.required, Validators.email]),
        'password': new FormControl('', [Validators.required])
      });
    });
  }

  onRegister() {
    this.router.navigate(['/register']);
  }

  onSubmit() {
    this.http.getUser(this.signupForm.value.email, this.signupForm.value.password);
    this.state.setIsLoggin$.subscribe((val)=>{
      if (!val) {
        this.error = "Incorrect email or password";
        setTimeout(()=>{this.error=""},2000);
        this.signupForm.reset();
      }
    });
  }
}


import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpService } from 'src/app/shared/http.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private router:Router, private http:HttpService){}

  error:string = "";
  imageBrowser:string = "";
  signupForm!: FormGroup;
  ngOnInit() {
    this.signupForm = new FormGroup({
      'email': new FormControl('', [Validators.required, Validators.email]),
      'first': new FormControl('', [Validators.required]),
      'last': new FormControl('', [Validators.required]),
      'password1': new FormControl('', [Validators.required, this.forbiddenPassword.bind(this)]),
      'password2': new FormControl('', [Validators.required])
    });
  }

  forbiddenPassword(control: FormControl) {
    if (!control.value.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+*!=]).*$/))
    {
      return {'passwordIsForbidden': true};
    }
    return null;
  }

  onSubmit() {
    if (this.signupForm.value.password1 !== this.signupForm.value.password2) {
      this.error = "comfirm password does not match";
      setTimeout(()=>{this.error = ''},2000);
      this.signupForm.reset();
    }
    else {
      this.http.addUser(this.signupForm.value.email, this.signupForm.value.first,
        this.signupForm.value.last, this.imageBrowser, this.signupForm.value.password1)
      .subscribe(
        (res)=>{
          this.router.navigate(['/login']);
          window.alert('Registeration Successful');
        },
        (err)=>{
          this.error = "Email already used";
          setTimeout(()=>{this.error = ''},2000);
          this.signupForm.reset();
        }
      );
    }
  }

  onLogin() {
    this.router.navigate(['/login']);
  }
}






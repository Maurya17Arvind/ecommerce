import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthAuthenticationService } from 'src/app/auth-authentication.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  public myForm!: FormGroup;
  public email!: string;
  public password!: string;
  public signUpEmail!: string;
  public signUpPassword!: string;


  constructor(private authenticationService: AuthAuthenticationService, private fb: FormBuilder, private router: Router) {
    this.myForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    })
  }

  ngOnInit(): void {
  }



  public signUp():void {
    this.signUpEmail = this.myForm.value.email;
    this.signUpPassword = this.myForm.value.password;
    this.authenticationService.signUp(this.signUpEmail, this.signUpPassword);
    this.router.navigate(['login']);
  }

  get fControl() {
    return this.myForm.controls;
  }
}

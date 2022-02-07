import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthAuthenticationService } from 'src/app/auth-authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public myForm!: FormGroup;
  public email!: string;
  public password!: string;

  constructor(private fb: FormBuilder, private authenticationService: AuthAuthenticationService) {
    this.myForm = this.fb.group({
      email: ['arvindadmin@gmail.com', [Validators.required, Validators.email]],
      password: ['123456', [Validators.required, Validators.minLength(6)]]
    })
  }

  ngOnInit(): void {
  }


  public signIn(): void {
    this.email = this.myForm.value.email;
    this.password = this.myForm.value.password;
    this.authenticationService.logIn(this.email, this.password);
  }

  get fControl() {
    return this.myForm.controls;
  }
}


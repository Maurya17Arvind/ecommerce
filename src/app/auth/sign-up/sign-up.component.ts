import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
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
  public password!: string;
  public signUpEmail!: string;
  public signUpPassword!: string;
  public area!: string;
  public address!: string;
  public mobileNo!: string;
  public pinCode!: string;
  public name!: string;


  constructor(
    private authenticationService: AuthAuthenticationService,
    private fb: FormBuilder,
    private router: Router,
  ) {
    this.myForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      area: [''],
      address: [''],
      pinCode: [''],
      mobileNo: [''],
      name: ['']
    });


  }

  ngOnInit(): void {
  }



  public signUp(): void {
    this.signUpEmail = this.myForm.value.email;
    this.signUpPassword = this.myForm.value.password;
    this.address = this.myForm.value.address;
    this.area = this.myForm.value.area;
    this.pinCode = this.myForm.value.pinCode;
    this.mobileNo = this.myForm.value.mobileNo;
    this.name = this.myForm.value.name;
    this.authenticationService.signUp(this.signUpEmail, this.signUpPassword, this.address, this.area, this.mobileNo, this.name, this.pinCode);
    this.router.navigate(['login']);
  }

  get fControl() {
    return this.myForm.controls;
  }
}

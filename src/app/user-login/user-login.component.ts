// import { Component, OnInit } from '@angular/core';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { AuthAuthenticationService } from '../auth-authentication.service';

// @Component({
//   selector: 'app-user-login',
//   templateUrl: './user-login.component.html',
//   styleUrls: ['./user-login.component.scss']
// })
// export class UserLoginComponent implements OnInit {

//   public myForm!: FormGroup;
//   public email!: string;
//   public password!: string;

//   constructor(private fb: FormBuilder, private authenticationService: AuthAuthenticationService ) {
//     this.myForm = this.fb.group({
//       email: ['', [Validators.required, Validators.email]],
//       password: ['', [Validators.required, Validators.minLength(6)]]
//     })
//   }

//   ngOnInit(): void {
//   }

//   signIn() {
//     this.authenticationService.signIn(this.email, this.password);
//   }

//   get fControl() {
//     return this.myForm.controls;
//   }
// }

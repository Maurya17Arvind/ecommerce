import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AuthAuthenticationService } from '../auth-authentication.service';

@Component({
  selector: 'app-user-signup',
  templateUrl: './user-signup.component.html',
  styleUrls: ['./user-signup.component.scss']
})
export class UserSignupComponent implements OnInit {

  public myForm!: FormGroup;
  public email!: string;
  public password!: string;

  constructor(private authenticationService: AuthAuthenticationService) { }




  ngOnInit(): void {

  }


  public signUp() {
    this.email = 'arvind@gmail.com';
    this.password = '1123455';
    this.authenticationService.signUp(this.email, this.password);
  }

}

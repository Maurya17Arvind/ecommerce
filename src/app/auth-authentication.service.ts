import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFireAuth } from "@angular/fire/compat/auth";

@Injectable({
  providedIn: 'root'
})
export class AuthAuthenticationService {

  // public userData!: Observable<firebase.User>;
  public userData: any;

  constructor(private angularFireAuth: AngularFireAuth) {
    this.userData = angularFireAuth.authState;
  }

  public signUp(email: string, password: string) {
    this.angularFireAuth.createUserWithEmailAndPassword(email, password).then((res) => {
      console.log('res', res);
    })
      .catch((error) => {
        console.log('error.message', error.message);
      });
  }


}

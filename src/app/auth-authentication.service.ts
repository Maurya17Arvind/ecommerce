import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthAuthenticationService {

  // public userData!: Observable<firebase.User>;
  public userData: Observable<any>;
  public data1: any;
  public item: string[] = [];

  constructor(private angularFireAuth: AngularFireAuth, private db: AngularFireDatabase, private toaster: ToastrService, private router: Router) {
    this.userData = angularFireAuth.authState;
  }

  public signUp(email: string, password: string, address: string, area: string, mobileNo: string, name: string, pinCode: string): void {
    this.angularFireAuth.createUserWithEmailAndPassword(email, password).then((res: any) => {
      if (res.operationType == 'signIn') {
        if (res.additionalUserInfo) {
          const usersPath = this.db.database.ref('/users');
          const data = {
            email: res.user?.multiFactor?.user?.email,
            role: 'admin'
          }
          localStorage.setItem('emailId', email)
          const formData = {
            ...data,
            name: name,
            area: area,
            pinCode: pinCode,
            mobileNo: mobileNo,
            address: address,
          }
          usersPath.push(formData);
        }
      }
    })
      .catch((error) => {
        console.log('error.message', error.message);
      });
  }


  public logIn(email: string, password: string): void {
    this.angularFireAuth.signInWithEmailAndPassword(email, password).then(res => {
      let basePath = this.db.database.ref('/users');
      basePath.on('value', (data: any) => {
        this.data1 = Object.keys(data.val()).map(key => {
          return {
            ...data.val()[key],
            push_key: key
          }
        });
        const data2 = this.data1.find((e: any) => e.email == email);
        if (data2.role === 'customer') {
          this.router.navigate(['customer']);
          // console.log('data2.push_key', data2.push_key)
          localStorage.setItem('customerId', data2.push_key);
          // this.toaster.success('Login Successfully');
        }
        else {
          this.router.navigate(['admin']);
          localStorage.setItem('customerId', data2.push_key);
          // this.toaster.success('Login Successfully');
        }
      });
    })

      .catch(err => {
        console.log('Something went wrong:', err.message);
      });
  }

}

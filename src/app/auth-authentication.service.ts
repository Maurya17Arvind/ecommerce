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

  public signUp(email: string, password: string): void {
    this.angularFireAuth.createUserWithEmailAndPassword(email, password).then((res: any) => {
      if (res.operationType == 'signIn') {
        if (res.additionalUserInfo) {
          const tremPath = this.db.database.ref('/users');
          const data = {
            email: res.user?.multiFactor?.user?.email,
            role: 'admin'
          }
          tremPath.push(data);
        }
      }
    })
      .catch((error) => {
        console.log('error.message', error.message);
      });
  }


  public logIn(email: string, password: string): void {
    this.angularFireAuth.signInWithEmailAndPassword(email, password).then(res => {
      let allData = this.db.database.ref('/users');
      allData.on('value', (data: any) => {
        this.data1 = Object.keys(data.val()).map(key => {
          return {
            ...data.val()[key],
            push_key: key
          }
        });
        // console.log('data1', this.data1);
        const data2 = this.data1.find((e: any) => e.email == email);
        localStorage.setItem('customerId', data2.push_key);
        if (data2.role === 'customer') {
          this.router.navigate(['customer']);
          // this.toaster.success('Login Successfully');
        }
        else {
          this.router.navigate(['admin']);
          // this.toaster.success('Login Successfully');
        }
      });
    })
      .catch(err => {
        console.log('Something went wrong:', err.message);
      });
  }


  // public addItems(itemName: string,price: string,returnTime:string): void {
  //   let items = this.db.database.ref('/products/');
  //   const item = {
  //     itemName: '',
  //     price: '',
  //     returnTime: ''
  //   }
  //   items.push(item);
  // }


  // public updateProduct(product: any) {

  // }


  // public addToCart(): void {
  //   let allData = this.db.database.ref('/users');
  //   allData.on('value', (data: any) => {
  //     this.data1 = Object.keys(data.val()).map(key => {
  //       return {
  //         ...data.val()[key],
  //         push_key: key,

  //       }
  //     });
  //     const data2 = this.data1.find((e: any) => e.push_key);
  //     console.log('data2', data2.push_key);
  //     console.log('data1 :>> ', this.data1);
  //   });
  // }
}

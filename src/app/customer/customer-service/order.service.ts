import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { AsyncSubject, Observable, ReplaySubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  public cartData1: any;
  public orders: any;
  public filterOrder: any;
  public productDetails: any;
  public header = new Subject<boolean>();
  //without time limited
  // public inputData = new ReplaySubject<string>(2);
  //with time limit 
  public inputData = new ReplaySubject<string>(2, 4000);
  public asyncData = new AsyncSubject<string>();
  public url: any;




  constructor(private db: AngularFireDatabase) {
    this.cartData1 = this.db.database.ref('/orders');
  }
  public cartData(): void {
    this.cartData1.on('value', (data: any) => {
      Object.keys(data?.val() || '').map(key => {
        return {
          ...data.val()[key],
          orderId: key
        }
      });
      // this.filterOrder = this.orders.filter((e: any) => e.userId == localStorage.getItem('customerId'))
      // this.filterOrder.filter((e: any) => {
      //   this.productDetails = e.cartValue;
      // });
    });
  }

  //code for RxJs testing start
  public print(val: any, id: any) {
    let element = document.createElement('li');
    element.innerText = val;
    document.getElementById(id)?.appendChild(element);
  }
  public printprepand(val: any, id: any) {
    let element = document.createElement('li');
    element.innerText = val;
    document.getElementById(id)?.prepend(element);
  }
  //code for RxJs testing start

}

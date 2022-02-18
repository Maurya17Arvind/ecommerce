import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthgaurdService {

  public customerId: any;

  constructor() {
    this.customerId = localStorage.getItem('customerId')
  }


  public getCustomerId(): boolean {
    if (this.customerId) {
      return true;
    } else {
      return false;
    }
  }
}

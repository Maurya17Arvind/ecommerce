import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  products: any;

  constructor(private db: AngularFireDatabase) {
    let allProducts = this.db.database.ref('/products/');
    allProducts.on('value', (data: any) => {
      // console.log('data.val()', data.val()); 
      this.products = Object.keys(data.val()).map(key => {
        return {
          ...data.val()[key],
          push_key: key
        }
      });
    });
  }

  ngOnInit(): void {
  }

}

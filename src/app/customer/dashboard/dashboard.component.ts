import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { ProductService } from '../customer-service/product.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  products: any;

  constructor(private productService: ProductService) {
    this.products = this.productService.getAllProducts();
  }

  ngOnInit(): void {
  }

}

import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {

  public key!: string;
  product: any;
  productsData: any;

  constructor(private db: AngularFireDatabase, private activatedRoute: ActivatedRoute) {
    this.key = this.activatedRoute.snapshot.params['id'];
    this.product = this.db.database.ref('/products/' + this.key);
    this.product.on('value', (data: any) => {
      this.productsData = data.val();
      console.log('updateData', this.productsData);
    });
  }

  ngOnInit(): void {
  }

}

import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-view-items',
  templateUrl: './view-items.component.html',
  styleUrls: ['./view-items.component.scss']
})
export class ViewItemsComponent implements OnInit {

  public products: any;
  public detProduct: any;

  constructor(private db: AngularFireDatabase, private toastr: ToastrService) {
    let allProducts = this.db.database.ref('/products');
    allProducts.on('value', (data: any) => {
      this.products = Object.keys(data.val()).map(key => {
        return {
          ...data.val()[key],
          push_key: key
        }
      });
      this.toastr.success("Show All Products");
    });
  }

  ngOnInit(): void {
  }


  public deleteProduct(key: string) {
    this.detProduct = this.db.database.ref('/products/' + key);
    this.detProduct.remove();
    this.toastr.success("Delete Product");
  }
}

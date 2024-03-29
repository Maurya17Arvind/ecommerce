import { Component, DoCheck, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ToastrService } from 'ngx-toastr';
import { CartService } from '../customer-service/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit, DoCheck {

  public carts: any;
  public filterCart: any;
  public detProduct: any;
  public changedCartData: any;
  public fullBillAmount!: number;
  public totalCart!: number;
  public orderForm!: FormGroup;
  public orders: any;
  public userPath: any;
  public userData: any;

  constructor(
    private db: AngularFireDatabase,
    private fb: FormBuilder,
    private cartService: CartService,
    private toastr: ToastrService,
    private titleService:Title
  ) {

    // this.userPath = this.db.database.ref('/users/' + localStorage.getItem('customerId'));
    // this.userPath.on('value', (userData: any) => {
    //   this.userData = userData.val();
    // });

    // this.orderForm = this.fb.group({
    //   area: [this.userData?.area || ''],
    //   address: [this.userData?.address || ''],
    //   pinCode: [this.userData?.pinCode || ''],
    //   mobileNo: [this.userData?.mobileNo || ''],
    //   name: [this.userData?.name || '']
    // });
    this.addressData();


    const cartData = this.db.database.ref('/carts');
    cartData.on('value', (data: any) => {
      this.carts = Object.keys(data?.val() || '').map(key => {
        return {
          ...data.val()[key],
          cartId: key
        }
      });
      this.filterCart = this.carts.filter((e: any) => e.customerID == localStorage.getItem('customerId'));
      this.totalCart = this.filterCart.length;
      // this.toastr.success("View Cart Product");
      this.getOrderPrice();
    });

    this.orders = this.cartService.getOrdersDetail();
  }

  ngOnInit(): void {
    this.titleService.setTitle("Your Cart Product.")
    this.getOrderPrice();
  }

  ngDoCheck(): void {
    this.addressData();
  }
  public addressData(): void {
    this.userPath = this.db.database.ref('/users/' + localStorage.getItem('customerId'));
    this.userPath.on('value', (userData: any) => {
      this.userData = userData.val();
    });

    this.orderForm = this.fb.group({
      area: [this.userData?.area || ''],
      address: [this.userData?.address || ''],
      pinCode: [this.userData?.pinCode || ''],
      mobileNo: [this.userData?.mobileNo || ''],
      name: [this.userData?.name || '']
    });
  }

  public getOrderPrice(): void {
    let orderPrice: any[] = [];
    this.filterCart?.filter((e: any) => {
      orderPrice.push(e.finalPrice);
    });
    const grandTotal = orderPrice.join('+')
    this.fullBillAmount = eval(grandTotal);
  }

  public deleteCart(key: string) {
    this.detProduct = this.db.database.ref('/carts/' + key);
    this.detProduct.remove();
    this.toastr.success("Delete Cart Item Successfully");
  }


  public changeQty(cartId: string, operation: string): void {
    this.changedCartData = this.filterCart.find(
      (e: any) => e.cartId == cartId
    );
    this.getOrderPrice();

    const refPath = this.db.database.ref('/carts/' + cartId);

    const commonData = {
      cartId: this.changedCartData.cartId,
      customerID: this.changedCartData.customerID,
      itemName: this.changedCartData.itemName,
      price: this.changedCartData.price,
      product_id: this.changedCartData.product_id,
      returnTime: this.changedCartData.returnTime
    }
    if (operation === 'add') {
      const dataObject = {
        ...commonData,
        finalPrice: this.changedCartData.price * (this.changedCartData.qty + 1),
        qty: this.changedCartData.qty + 1,
      }
      refPath.update(dataObject);
      this.toastr.success('Added Product Quantity Successfully');
    }
    else {
      const dataObject = {
        ...commonData,
        finalPrice: this.changedCartData.price * (this.changedCartData.qty - 1),
        qty: this.changedCartData.qty - 1
      }
      refPath.update(dataObject);
      this.toastr.success('Remove Product Quantity Successfully');
    }
  }



  public placeOrder(): void {
    let address = this.db.database.ref('/orders');
    const orderData = {
      ...this.orderForm.value,
      cartValue: this.filterCart,
      userId: localStorage.getItem('customerId')
    }
    address.push(orderData);
    this.cartService.clearCart();
    this.toastr.success("Order Successfully");
  }
}

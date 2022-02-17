import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CartService } from '../customer-service/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  public carts: any;
  public filterCart: any;
  public detProduct: any;
  public changedCartData: any;
  public fullBillAmount!: number;
  public totalCart!: number;
  public orderForm!: FormGroup;
  public orders: any;
  public filterOrder: any;
  public address!: string;
  public area!: string;
  public pinCode!: string;
  public filterCustomer: any;

  constructor(private db: AngularFireDatabase, private fb: FormBuilder, private cartService: CartService) {

    this.orderForm = this.fb.group({
      area: '',
      address: '',
      pinCode: '',
      mobileNo: '',
      name: ''
    })

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
      this.getOrderPrice();
    });

    this.orders = this.cartService.getOrdersDetail();
    // this.filterOrder = this.orders.filter((orderFilter: any) => orderFilter.userId == localStorage.getItem('customerId'))
    //   this.filterOrder.filter((address: any) => {
    //     this.address = address.address;
    //     this.area = address.area;
    //     this.pinCode = address.pinCode;
    //   });
  }

  ngOnInit(): void {
    this.getOrderPrice();
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
    }
    else {
      const dataObject = {
        ...commonData,
        finalPrice: this.changedCartData.price * (this.changedCartData.qty - 1),
        qty: this.changedCartData.qty - 1
      }
      refPath.update(dataObject);
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
  }
}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomerRoutingModule } from './customer-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CartComponent } from './cart/cart.component';
import { PaymentComponent } from './payment/payment.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { CustomerHeaderComponent } from '../core/customer-header/customer-header.component';
import { CoreModule } from '../core/core.module';
import { CustomerComponent } from './customer.component';
import { ProfileComponent } from './profile/profile.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OrderComponent } from './order/order.component';


@NgModule({
  declarations: [
    DashboardComponent,
    CartComponent,
    PaymentComponent,
    ProductDetailsComponent,
    CustomerComponent,
    ProfileComponent,
    OrderComponent,
  ],
  imports: [
    CommonModule,
    CustomerRoutingModule,
    CoreModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class CustomerModule { }

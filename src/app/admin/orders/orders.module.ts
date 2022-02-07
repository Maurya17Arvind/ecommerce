import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrdersRoutingModule } from './orders-routing.module';
import { CompleteOrdersComponent } from './complete-orders/complete-orders.component';
import { PendingOrdersComponent } from './pending-orders/pending-orders.component';
import { ReturnOrdersComponent } from './return-orders/return-orders.component';


@NgModule({
  declarations: [
    CompleteOrdersComponent,
    PendingOrdersComponent,
    ReturnOrdersComponent
  ],
  imports: [
    CommonModule,
    OrdersRoutingModule
  ]
})
export class OrdersModule { }

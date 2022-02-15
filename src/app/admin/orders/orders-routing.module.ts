import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CompleteOrdersComponent } from './complete-orders/complete-orders.component';
import { PendingOrdersComponent } from './pending-orders/pending-orders.component';
import { ReturnOrdersComponent } from './return-orders/return-orders.component';

const routes: Routes = [
  {
    path: 'complete-orders',
    component: CompleteOrdersComponent
  },
  {
    path: 'pending-orders',
    component: PendingOrdersComponent
  },
  {
    path: 'return-orders',
    component: ReturnOrdersComponent
  },
  {
    path: '**',
    redirectTo: 'pending-orders'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrdersRoutingModule { }

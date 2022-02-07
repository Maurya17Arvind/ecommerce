import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddItemsComponent } from './add-items/add-items.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UpdateItemComponent } from './update-item/update-item.component';
import { ViewItemsComponent } from './view-items/view-items.component';

const routes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent
  },
  // {
  //   path: 'login',
  //   component: LoginComponent
  // },
  {
    path: 'add-items',
    component: AddItemsComponent
  },
  {
    path: 'view-items',
    component: ViewItemsComponent
  },
  {
    path: 'update-item',
    component: UpdateItemComponent
  },
  {
    path: 'update-item/:id',
    component: UpdateItemComponent
  },
  {
    path: 'orders',
    loadChildren: () => import('./orders/orders.module').then((m) => m.OrdersModule)
  },
  {
    path: '**',
    redirectTo: 'dashboard'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }

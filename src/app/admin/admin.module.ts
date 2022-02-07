import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { AddItemsComponent } from './add-items/add-items.component';
import { ViewItemsComponent } from './view-items/view-items.component';
import { UpdateItemComponent } from './update-item/update-item.component';


@NgModule({
  declarations: [
    DashboardComponent,
    LoginComponent,
    AddItemsComponent,
    ViewItemsComponent,
    UpdateItemComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule
  ]
})
export class AdminModule { }

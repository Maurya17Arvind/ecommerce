import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AddItemsComponent } from './add-items/add-items.component';
import { ViewItemsComponent } from './view-items/view-items.component';
import { UpdateItemComponent } from './update-item/update-item.component';
import { CoreModule } from '../core/core.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';


@NgModule({
  declarations: [
    DashboardComponent,
    AddItemsComponent,
    ViewItemsComponent,
    UpdateItemComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    CoreModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class AdminModule { }

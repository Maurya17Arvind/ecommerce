import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { RouterModule } from '@angular/router';
import { CustomerHeaderComponent } from './customer-header/customer-header.component';


@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    CustomerHeaderComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [HeaderComponent, CustomerHeaderComponent]
})
export class CoreModule { }

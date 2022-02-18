import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// import { UserLoginComponent } from './user-login/user-login.component';
// import { UserSignupComponent } from './user-signup/user-signup.component';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule)
  },
  // {
  //   path: 'admin',
  //   loadChildren: () => import('./admin/admin.module').then((m) => m.AdminModule)
  // },
  // {
  //   path: 'customer',
  //   loadChildren: () => import('./customer/customer.module').then((m) => m.CustomerModule)
  // },
  {
    path: '**',
    redirectTo: ''
  }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../AuthGard/auth.guard';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';


const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'signup',
    component: SignUpComponent
  },
  {
    path: 'admin',
    canActivate: [AuthGuard],
    loadChildren: () => import('../admin/admin.module').then((m) => m.AdminModule)
  },
  {
    path: 'customer',
    canActivate: [AuthGuard],
    loadChildren: () => import('../customer/customer.module').then((m) => m.CustomerModule)
  },
  {
    path: '**',
    redirectTo: 'login'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }

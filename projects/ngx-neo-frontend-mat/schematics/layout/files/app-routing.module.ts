import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard, LoginGuard } from '@neocomplexx/ngx-neo-frontend';

const routes: Routes = [
  {
    path: '',
    loadChildren: './layout/layout.module#LayoutModule',
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
  },
  {
    path: 'login',
    loadChildren: './login/login.module#LoginModule',
    canActivate: [LoginGuard],
  },
  /**
   * Esto es necesario ya que no es posible hacer un parseUrl('/').
   * Por eso en role y userType hacemos parseUrl('/home') que es capturado por ese redirect
   *
   */
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

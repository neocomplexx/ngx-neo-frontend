import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserComponent } from './user.component';

const routes: Routes = [
    {
        path: '', component: UserComponent,
        children:
            [
                { path: '', loadChildren: () => import('./user-dashboard/user-dashboard.module').then(m => m.UserDashboardModule) }
            ]
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class UserRoutingModule { }

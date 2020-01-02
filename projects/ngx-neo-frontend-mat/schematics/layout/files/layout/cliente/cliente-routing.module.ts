import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClienteComponent } from './cliente.component';

const routes: Routes = [
    {
        path: '', component: ClienteComponent, // Este tiene que ser vacio, si no tengo que poner en la url /user/user para que funcione
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ClienteRoutingModule { }

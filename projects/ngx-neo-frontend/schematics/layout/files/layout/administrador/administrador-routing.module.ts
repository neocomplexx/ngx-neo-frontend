import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdministradorComponent } from './administrador.component';

const routes: Routes = [
    {
        path: '', component: AdministradorComponent, // Este tiene que ser vacio, si no tengo que poner en la url /user/user para que funcione
        children: [
            { path: 'configuracion', loadChildren: './configuracion/configuracion.module#ConfiguracionModule'},
        ]
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AdministradorRoutingModule { }

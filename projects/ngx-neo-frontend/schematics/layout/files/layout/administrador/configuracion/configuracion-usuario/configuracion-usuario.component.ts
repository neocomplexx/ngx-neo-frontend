import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { BreadcrumbService } from 'ng5-breadcrumb';
import { Header<%=classify(projectName)%>Service } from 'src/app/core/header-<%=dasherize(projectName)%>/header-<%=dasherize(projectName)%>.service';

@Component({
    selector: 'app-configuracion-usuario',
    templateUrl: './configuracion-usuario.component.html'
})
export class ConfiguracionUsuarioComponent implements OnInit {

    /** @author bdilschneider */

    public tabSelected: BehaviorSubject<string> = new BehaviorSubject<string>('');
    public idUsuario: BehaviorSubject<number> = new BehaviorSubject<number> (0);

    constructor(private breadCrumbService: BreadcrumbService, public headerService: Header<%=classify(projectName)%>Service) {
        this.breadCrumbService.addFriendlyNameForRoute('/admin/configuracion/configuracion-usuario', 'Usuarios');
    }

    ngOnInit(): void {
    }
}


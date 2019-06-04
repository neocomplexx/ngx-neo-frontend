import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { BreadcrumbService } from 'ng5-breadcrumb';
import { Header<%=classify(projectName)%>Service } from 'src/app/core/header-<%=dasherize(projectName)%>/header-<%=dasherize(projectName)%>.service';

/** @author bdilschneider */

@Component({
    selector: 'app-configuracion-rol',
    templateUrl: './configuracion-rol.component.html'
})
export class ConfiguracionRolComponent implements OnInit {

    public tabSelected: BehaviorSubject<string> = new BehaviorSubject<string>('');
    public idRol: BehaviorSubject<number>  = new BehaviorSubject<number> (0);

    constructor(private breadCrumbService: BreadcrumbService, public headerService: Header<%=classify(projectName)%>Service) {
        this.breadCrumbService.addFriendlyNameForRoute('/admin/configuracion/configuracion-rol', 'Roles');
    }

    ngOnInit(): void {
    }
}

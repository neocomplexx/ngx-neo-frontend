import { Component, OnInit, ElementRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import data from 'src/app/layout/administrador/configuracion/configuracion-menu.json';
import { NeoMenuComponent } from 'ngx-neo-frontend/neocomplexx-ngx-neo-frontend';

@Component({
    selector: 'app-configuracion',
    templateUrl: './configuracion.component.html'
})
export class ConfiguracionComponent extends NeoMenuComponent implements OnInit {

    public configDeshab: BehaviorSubject<boolean> = new BehaviorSubject(false);

    constructor(protected router: Router, protected activatedRoute: ActivatedRoute,
                protected _elementRef: ElementRef) {
        super(activatedRoute, router, _elementRef);
        this.jsonMenuData = data;
    }

    ngOnInit() {
        // Armo el menú
        this.armarMenu();
    }
}

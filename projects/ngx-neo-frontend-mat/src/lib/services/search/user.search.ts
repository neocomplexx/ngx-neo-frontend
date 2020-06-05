import { Injectable, Inject } from '@angular/core';
import { CompleterItem } from '@neocomplexx/ngx-neo-completer-mat';
import { BaseEntitiesSearch } from './base-entitites.search';

import { UserEntityService } from '../entity';
import { FrontEndConfigService, FrontEndConfig } from '../../FrontendConfig';

@Injectable({
    providedIn: 'root'
})
export class UserSearch extends BaseEntitiesSearch {

    constructor(@Inject(FrontEndConfigService) Constants: FrontEndConfig, private userEntityService: UserEntityService) {
        super(Constants);
    }


    public async getEntitiesSearch(startWith: string): Promise<void> {
        const res = await this.userEntityService.getEntitiesByNombre(startWith);
        // Convert the result to CompleterItem[]
        const matches: CompleterItem[] = new Array<CompleterItem>(res.length);
        res.forEach((item, index) => matches[index] = { title: item.userName, originalObject: item } as CompleterItem);
        this.next(matches);
    }

}

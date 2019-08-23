import { Injectable } from '@angular/core';
import { EntityCacheService } from './entity-cache.service';
import { UserDTO } from '../../models';
import { UsersServiceBackend } from '../backend';

@Injectable({
    providedIn: 'root'
})
export class UserEntityService  extends EntityCacheService {

    constructor(public usersServiceBackend: UsersServiceBackend) {
        super();
    }

    public async getEntities(): Promise<Array<UserDTO>> {
      const res = await this.usersServiceBackend.getUsers(true);
      return res;
    }

  public async getEntitiesByNombre(search: string) {
      const res = await this.usersServiceBackend.getUsersAutoComplete(search, 20);
      return res;
  }
}

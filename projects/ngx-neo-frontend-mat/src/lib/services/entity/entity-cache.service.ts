import { Injectable } from '@angular/core';

@Injectable()
export abstract class EntityCacheService {

  public abstract async getEntities(): Promise<any[]>;

}

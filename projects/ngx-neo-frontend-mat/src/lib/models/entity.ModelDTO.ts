import { BehaviorSubject } from 'rxjs';
import { IEntityDTO } from './';
import { DatePipe } from '@angular/common';

export interface IEntityModelDTO {
    changed: BehaviorSubject<boolean>;
}

export abstract class EntityModelDTO<TDTO extends IEntityDTO> implements IEntityModelDTO {

    public changed: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

    protected entityDTO: TDTO;

    constructor(entityDTO: TDTO) {
        this.setEntityDTO(entityDTO);
    }

    protected notifyChangeDTO(property: string, value: any): void {
        this.entityDTO[property] = value;
        this.changed.next(true);
    }
    protected notifyChange(property: () => void): void {
        property();
        this.changed.next(true);
    }

    public getEntityDTO(): TDTO { return this.entityDTO; }

    public setEntityDTO(entityDTO: TDTO): void {
        if (this.entityDTO) {
            this.dispose();
        }
        this.entityDTO = entityDTO;
        this.changed.next(false);
    }
    public abstract dispose(): void;

    protected static getEnumArray(e: any): string[] {
        const objValues = Object.keys(e).map(k => e[k]);
        return objValues.filter(v => typeof v === 'string') as string[];
    }

    protected isNumber(value: string): boolean {
            return /^\d+$/.test(value);
    }

    protected stringToDate(value: string): Date {
        if (value.length === 10) { value += 'T03:00:00Z'; }
        const date = new Date(value);
        if (date && date.getUTCFullYear() > 1900 && date.getUTCFullYear() < 3000) {
            return date;
        }
        return null;
    }

    protected dateToString(value: Date): string { 
        if (value) {
            return value.toISOString().substring(0, 10); 
        } else {
            return undefined;
        }
    }

    private datePipe = new DatePipe('en-US');
    protected formatDate(value: Date): string {
        return this.datePipe.transform(value, 'dd/MM/yyyy')
    }

    protected formatDateTime(value: Date): string {
        return this.datePipe.transform(value, 'dd/MM/yyyy HH:mm')
    }
}

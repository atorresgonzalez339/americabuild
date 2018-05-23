import {Injectable} from '@angular/core';
import {Headers, Http, RequestOptions, Response} from '@angular/http';
import {CompanyFees } from '../_models/index';
import { BaseService } from '../../../../../_services/base.service';

@Injectable()
export class CompanyFeesService extends BaseService {

    constructor(public http: Http) {
        super(http);
    }


    getAll() {
        return this.http.get(this.urlService + 'companyfees', {headers: this.getHeaders()});
    }

    getById(id: number) {
        return this.http.get(this.urlService + 'companyfees/' + id,{headers: this.getHeaders()});
    }

    create(companyfees: CompanyFees) {
        return this.http.post(this.urlService + 'companyfees', JSON.stringify(companyfees), {headers: this.getHeaders()});
    }

    update(companyfees: CompanyFees) {
        return this.http.put(this.urlService + 'companyfees',JSON.stringify(companyfees),{headers: this.getHeaders()});
    }

    delete(id: number) {
        return this.http.delete(this.urlService + 'companyfees/' + id, {headers: this.getHeaders()});
    }
}

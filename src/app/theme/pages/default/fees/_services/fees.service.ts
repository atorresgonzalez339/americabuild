import {Injectable} from '@angular/core';
import {Headers, Http, RequestOptions, Response} from '@angular/http';
import {Fees} from '../_models/index';
import { BaseService } from '../../../../../_services/base.service';

@Injectable()
export class FeesService extends BaseService {

  constructor(public http: Http) {
  super(http);
  }


    getAll() {
        return this.http.get(this.urlService+ 'feesitem', {headers: this.getHeaders()});
    }

    getById(id: number) {
        return this.http.get(this.urlService+'feesitem/' + id,{headers: this.getHeaders()});
    }

    create(fees: Fees) {
        return this.http.post(this.urlService+'feesitem', JSON.stringify(fees),{headers: this.getHeaders()});
    }

    update(fees: Fees) {
        return this.http.put(this.urlService+'feesitem', JSON.stringify(fees),{headers: this.getHeaders()});
    }

    delete(id: number) {
        return this.http.delete(this.urlService+'feesitem/' + id,{headers: this.getHeaders()});
    }
}

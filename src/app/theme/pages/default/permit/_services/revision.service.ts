import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {PermitUserProfile} from '../_models/index';
import {BaseService} from '../../../../../_services/base.service';

@Injectable()
export class RevisionService extends BaseService {

  constructor(public http: Http) {
    super(http);
  }

  getByPermit(id: number) {
    return this.http.get(this.urlService + 'revision/permit/' + id, {headers: this.getHeaders()});
  }

  create(revision: any[], idpermit: number, deleted: any[]) {
    let data = {
      idpermit: idpermit,
      permitrevision: revision,
      todelete: deleted
    };

    return this.http.post(this.urlService + 'revision', JSON.stringify(data), {headers: this.getHeaders()});
  }
}

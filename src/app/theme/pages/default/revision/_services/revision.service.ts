import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {BaseService} from '../../../../../_services/base.service';

@Injectable()
export class RevisionService extends BaseService {

  constructor(public http: Http) {
    super(http);
  }

  getPermitRevisionByPermit(idpermit) {
    return this.http.get(this.urlService + 'permitrevision/' + idpermit, {headers: this.getHeaders()});
  }

  getPermitRevision(id: number) {
    return this.http.get(this.urlService + 'get-permitrevision/' + id, {headers: this.getHeaders()});
  }

  getByPermitType(id: number, idpermit) {
    return this.http.get(this.urlService + 'revision/permittype/' + id + '/' + idpermit, {headers: this.getHeaders()});
  }

  create(data) {
    return this.http.post(this.urlService + 'revision', JSON.stringify(data), {headers: this.getHeaders()});
  }

  update(id, data) {
    return this.http.put(this.urlService + 'revision/' + id, JSON.stringify(data), {headers: this.getHeaders()});
  }

  delete(id: number) {
    return this.http.delete(this.urlService + 'permitrevision/' + id, {headers: this.getHeaders()});
  }
}

import {Injectable} from "@angular/core";
import {Headers, Http, RequestOptions, Response} from "@angular/http";
import { BaseService } from "../../../../../_services/base.service";

@Injectable()
export class StateService extends BaseService{

  constructor(public http: Http) {
	super(http)
	}

	getAll() {
		return this.http.get(this.urlService+ 'states', {headers: this.getHeaders()});
	}

	getById(id: number) {
		return this.http.get(this.urlService+'states/' + id,{headers: this.getHeaders()});
	}
}

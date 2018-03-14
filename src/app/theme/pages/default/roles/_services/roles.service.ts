import {Injectable} from "@angular/core";
import {Headers, Http, RequestOptions, Response} from "@angular/http";
import { BaseService } from "../../../../../_services/base.service";

@Injectable()
export class RolesService extends BaseService{

  constructor(public http: Http) {
	super(http)
	}


	getAll() {
		return this.http.get(this.urlService+'roles', {headers: this.getHeaders()});
	}

	getById(id: number) {
		return this.http.get(this.urlService+'roles/' + id,{headers: this.getHeaders()});
	}

	delete(id: number) {
		return this.http.delete(this.urlService+'roles/' + id);
	}
}

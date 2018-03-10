import {Injectable} from "@angular/core";
import {Headers, Http, RequestOptions, Response} from "@angular/http";
import { BaseService } from "../../../../../_services/base.service";

@Injectable()
export class RolesService extends BaseService{

  constructor(public http: Http) {
	super(http)
	}


	getAll() {
		return this.http.get('http://apiservices.lh/api/roles', {headers: this.getHeaders()});
	}

	getById(id: number) {
		return this.http.get(this.urlService+'http://apiservices.lh/api/roles/' + id,{headers: this.getHeaders()});
	}

	/*create(company: Company) {
		return this.http.post(this.urlService+'roles', JSON.stringify({ companyName:company.companyName, subdomain:company.subdomain }),
							 {headers: this.getHeaders()});
	}

	update(company: Company) {
		return this.http.put(this.urlService+'roles', {companyName:company.companyName, subdomain:company.subdomain});
	}*/

	delete(id: number) {
		return this.http.delete(this.urlService+'roles/' + id);
	}
}

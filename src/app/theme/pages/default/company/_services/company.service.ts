import {Injectable} from "@angular/core";
import {Headers, Http, RequestOptions, Response} from "@angular/http";
import {Company} from "../_models/index";
import { BaseService } from "../../../../../_services/base.service";

@Injectable()
export class CompanyService extends BaseService{

  constructor(public http: Http) {
	super(http)
	}


	getAll() {
		return this.http.get(this.urlService+ 'companies', {headers: this.getHeaders()});
	}

	getById(id: number) {
		return this.http.get(this.urlService+'companies/' + id,{headers: this.getHeaders()});
	}

	create(company: Company) {
		return this.http.post(this.urlService+'companies', JSON.stringify({ companyName:company.companyName, subdomain:company.subdomain }),
							 {headers: this.getHeaders()});
	}

	update(company: Company) {
		return this.http.put(this.urlService+'companies', {companyName:company.companyName, subdomain:company.subdomain});
	}

	delete(id: number) {
		return this.http.delete(this.urlService+'companies/' + id);
	}
}

import {Injectable} from "@angular/core";
import {Headers, Http, RequestOptions, Response} from "@angular/http";
import {PermitUserProfile} from "../_models/index";
import { BaseService } from "../../../../../_services/base.service";

@Injectable()
export class PermitService extends BaseService{

	constructor(public http: Http) {
		super(http)
	}


	getAll() {
		return this.http.get(this.urlService+ 'permits', {headers: this.getHeaders()});
	}

	getById(id: number) {
		return this.http.get(this.urlService+'permittypes/' + id,{headers: this.getHeaders()});
	}

	create(contractorUserProfile: PermitUserProfile, permitUserProfile:PermitUserProfile) {
		return this.http.post(this.urlService+'permits', JSON.stringify({ contractorUserProfile:contractorUserProfile, ownerTenantUserProfile:permitUserProfile, permitType:1 }),
			{headers: this.getHeaders()});
	}

	update(contractorUserProfile: PermitUserProfile, permitUserProfile:PermitUserProfile) {
		return this.http.put(this.urlService+'permits', {contractorUserProfile:contractorUserProfile, ownerTenantUserProfile:permitUserProfile, permitType:1 });
	}

	delete(id: number) {
		return this.http.delete(this.urlService+'permittypes' + id);
	}
}

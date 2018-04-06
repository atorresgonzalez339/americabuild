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

	create(ownerTenantUserProfile:PermitUserProfile, contractorUserProfile: PermitUserProfile, architectUserProfile:PermitUserProfile) {
		return this.http.post(this.urlService+'permits', JSON.stringify({ ownerTenantUserProfile:ownerTenantUserProfile, contractorUserProfile:contractorUserProfile,  architectUserProfile:architectUserProfile,  permitType:1 }),
			{headers: this.getHeaders()});
	}

	update(ownerTenantUserProfile:PermitUserProfile, contractorUserProfile: PermitUserProfile, architectUserProfile:PermitUserProfile) {
		return this.http.put(this.urlService+'permits', {ownerTenantUserProfile:ownerTenantUserProfile, contractorUserProfile:contractorUserProfile,  architectUserProfile:architectUserProfile, permitType:1 });
	}

	delete(id: number) {
		return this.http.delete(this.urlService+'permittypes' + id);
	}
}

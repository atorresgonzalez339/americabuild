import {Injectable} from "@angular/core";
import { Http } from "@angular/http";
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

	create(ownerUserProfile:PermitUserProfile, tenantUserProfile: PermitUserProfile, contractorUserProfile: PermitUserProfile, architectUserProfile:PermitUserProfile, permitProfile) {
		return this.http.post(this.urlService+'permits', JSON.stringify({ ownerUserProfile:ownerUserProfile, tenantUserProfile: tenantUserProfile, contractorUserProfile:contractorUserProfile,  architectUserProfile:architectUserProfile,
				folioNumber:permitProfile.folioNumber,
				numberOfUnits:permitProfile.numberOfUnits,
				lot:permitProfile.lot,
				block:permitProfile.block,
				subdivision:permitProfile.subdivision,
				pbpg:permitProfile.pbpg,
				currentUseOfProperty:permitProfile.currentUseOfProperty,
				descriptionOfWork:permitProfile.descriptionOfWork,
				estimateValue:permitProfile.estimateValue,
				area:permitProfile.area,
				length:permitProfile.length,
				gallons:permitProfile.gallons,
				typeOfImprovement:permitProfile.typeOfImprovement,
				permitType:permitProfile.type,
				ownerBuilder:permitProfile.ownerBuilder
			}),
			{headers: this.getHeaders()});
	}

	update(ownerTenantUserProfile:PermitUserProfile, contractorUserProfile: PermitUserProfile, architectUserProfile:PermitUserProfile) {
		return this.http.put(this.urlService+'permits', {ownerTenantUserProfile:ownerTenantUserProfile, contractorUserProfile:contractorUserProfile,  architectUserProfile:architectUserProfile, permitType:1 },{headers: this.getHeaders()});
	}

	delete(id: number) {
		return this.http.delete(this.urlService+'permittypes' + id);
	}
}

import {Injectable} from "@angular/core";
import {Headers, Http, RequestOptions, Response} from "@angular/http";
import { BaseService } from "../../../../../_services/base.service";

@Injectable()
export class PermitTypeService extends BaseService{

  constructor(public http: Http) {
	super(http)
	}


	getAll() {
		return this.http.get(this.urlService+ 'permittypes', {headers: this.getHeaders()});
	}

	getById(id: number) {
		return this.http.get(this.urlService+'permittypes/' + id,{headers: this.getHeaders()});
	}

	getByPermit(id: number) {
		return this.http.get(this.urlService+'permittypes/permit/' + id,{headers: this.getHeaders()});
	}

	/*create(PermitType: PermitType) {
		return this.http.post(this.urlService+'permits', JSON.stringify({ name:PermitType.name, description:PermitType.description, type:PermitType.type }),
							 {headers: this.getHeaders()});
	}

	update(PermitType: PermitType) {
		return this.http.put(this.urlService+'permits', {id:PermitType.id, name:PermitType.name, description:PermitType.description, type:PermitType.type });
	}

	delete(id: number) {
		return this.http.delete(this.urlService+'permittypes' + id);
	}*/
}

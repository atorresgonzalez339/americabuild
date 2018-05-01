import {Injectable} from "@angular/core";
import {Headers, Http, RequestOptions, Response} from "@angular/http";

import {User} from "../_models/index";
import { BaseService } from '../../_services/base.service';

@Injectable()
export class UserService extends BaseService{

	constructor(public http: Http) {
		super(http);
	}

	userInformation(){
		return this.http.get(this.urlService+'users/info', {headers: this.getHeaders()});
	}

	userVerifyToken(token: string){
		return this.http.post(this.urlService+'passwords/reset', JSON.stringify({token:token}), {headers: this.getHeaders()});
	}

	userRecover(token: string, password:string, rpassword:string) {
		return this.http.post(this.urlService+'passwords/reset', JSON.stringify({token:token, password:password, repassword:rpassword}), {headers: this.getHeaders()});
	}

	userActivation(token: string) {
		return this.http.put(this.urlService+'users/register/activation', JSON.stringify({token:token}), {headers: this.getHeaders()});
	}

	forgotPassword(email: string) {
		return this.http.post(this.urlService+'passwords/forgot', JSON.stringify({email:email}), {headers: this.getHeaders()});
	}

	getAll() {
		return this.http.get(this.urlService+'users', {headers: this.getHeaders()});
	}

	create(user: User) {
		return this.http.post(this.urlService+'users/register', JSON.stringify({
			username:user.email,
			password:user.password,
			repassword: user.rpassword,
			fullname:user.fullname,
			userType: user.userType.id
			}), {headers: this.getHeaders()});
	}

	update(user: User) {
		return this.http.put(this.urlService+'users/', {username:user.email, id:user.id});
	}

	delete(id: number) {
		return this.http.delete(this.urlService+'users/' + id);
	}

	getUserTypes() {
		return this.http.get(this.urlService+'users/usertypes', {headers: this.getHeaders()});
	}
}

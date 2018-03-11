import {Injectable} from "@angular/core";
import {Headers, Http, RequestOptions, Response} from "@angular/http";

import {User} from "../_models/index";
import { BaseService } from '../../_services/base.service';

@Injectable()
export class UserService extends BaseService{

  constructor(public http: Http) {
    super(http);
  }

	verify() {
		return this.http.get('http://apiservices.lh/api/login', this.jwt()).map((response: Response) => response.json());
	}

	forgotPassword(email: string) {
		return this.http.post('http://apiservices.lh/api/passwords/forgot', JSON.stringify({email:email}), {headers: this.getHeaders()});
	}

	getAll() {
		return this.http.get('http://apiservices.lh/api/users', {headers: this.getHeaders()});
	}

	getById(id: number) {
		return this.http.get('http://apiservices.lh/api/users/' + id, this.jwt()).map((response: Response) => response.json());
	}

	create(user: User) {
		return this.http.post(this.urlService+'users/register', JSON.stringify({ username:user.email, password:user.password, repassword: user.rpassword, fullname:user.fullname, company:"gmail.com" }),
							 {headers: this.getHeaders()});
	}

	update(user: User) {
		return this.http.put('http://apiservices.lh/api/users/', {username:user.email, id:user.id});
	}

	delete(id: number) {
		return this.http.delete('http://apiservices.lh/api/users/' + id);
	}

	// private helper methods

	private jwt() {
		// create authorization header with jwt token
		let currentUser = JSON.parse(sessionStorage.getItem('user'));
		if (currentUser && currentUser.token) {
			let headers = new Headers({'apiKey': currentUser.token});
			return new RequestOptions({headers: headers});
		}
	}
}

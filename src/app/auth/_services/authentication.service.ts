import {Injectable} from "@angular/core";
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import "rxjs/add/operator/map";
import {BaseService} from "./base.service";

@Injectable()
export class AuthenticationService extends BaseService{

  constructor(public http: Http) {
      super(http);
  }

    login(email: string, password: string) {
        return this.http.post(this.urlService+'login',
            JSON.stringify({ username: email, password: password }),{headers: this.getHeaders()});
    }

	logout()
    {
        return this.http.post(this.urlService+'logout',JSON.stringify({}),{headers: this.getHeaders()});
	}
}

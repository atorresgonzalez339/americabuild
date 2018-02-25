import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'

@Injectable()
export class AuthenticationService {
    constructor(private http: HttpClient) { }

    login(username: string, password: string) {
        return this.http.post<any>('http://apiservices.lh/api/login', { username: username, password: password })
            .map(user => {
                // login successful if there's a jwt token in the response
                if (user && user.token) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    sessionStorage.apiKey=user.token;
                    sessionStorage.user=user;
                }                
                return user;                
            });
    }

    logout() {
        // remove user from local storage to log user out
        sessionStorage.removeItem('apiKey');
        sessionStorage.removeItem('user');
    }
}
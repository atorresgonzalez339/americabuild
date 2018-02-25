import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { User } from '../_models/index';

@Injectable()
export class UserService {
    constructor(private http: HttpClient) { }

    getAll() {
        return this.http.get<User[]>('http://apiservices.lh/api/users');
    }

    getById(id: number) {
        return this.http.get('http://apiservices.lh/api/users' + id);
    }

    create(user: User) {
        return this.http.post('http://apiservices.lh/api/users/register', {username:user.username, password:user.password, name:user.firstName+" " +user.lastName});
    }

    update(user: User) {
        return this.http.put('http://apiservices.lh/api/users', {id:user.id, username:user});
    }

    delete(id: number) {
        return this.http.delete('http://apiservices.lh/api/users/' + id);
    }    

    logout(){
        const token = sessionStorage.getItem("apiKey");        
        const headers = new HttpHeaders();
        headers.append('Content-Type', 'application/json');
        headers.append('apiKey', token);      
        sessionStorage.removeItem('apiKey');
        sessionStorage.removeItem('user');
        this.http.post("http://apiservices.lh/api/logout",{},{headers: headers});
    }
}
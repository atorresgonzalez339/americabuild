
import {Headers, Http} from '@angular/http';
import {Router} from "@angular/router";
import {Observable} from "rxjs";
import {Injectable} from "@angular/core";
declare var configuration: any;

@Injectable()
export class BaseService{
  private   router: Router=null;
  protected baseService:string;
  protected urlService:string;

  public constructor(public http: Http){
    this.baseService = configuration.apiUrl;
    this.urlService = this.baseService + configuration.apiPath;
  }

  public getHeaders(){
    let headers = new Headers();
    headers.append('Accept', 'application/json');
    headers.append('Content-Type', 'application/json');
    if( sessionStorage.getItem( 'apiKey' ) != null && sessionStorage.getItem('apiKey') != undefined )
    {
      headers.append('apiKey',sessionStorage.getItem('apiKey'));
    }
    return headers;
  }

  get(url:string){
    return this.http.get(url,{headers: this.getHeaders()});
  }
  post(url:string,object:Object){
    return this.http.post(url,JSON.stringify(object),{headers: this.getHeaders()}).catch((error:any) => Observable.throw( 'Ocurrió un error en el servidor'));
  }
  put(url:string,object:Object){
    return this.http.put(url,JSON.stringify(object),{headers: this.getHeaders()}).catch((error:any) => Observable.throw( 'Ocurrió un error en el servidor'));
  }
  delete(url){
    return this.http.delete(url,{headers: this.getHeaders()}).catch((error:any) => Observable.throw( 'Ocurrió un error en el servidor'));
  }

  getConfiguration()
  {
    return configuration;
  }
}

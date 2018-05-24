import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from "@angular/router";
import {UserService} from "../_services/user.service";
import {Observable} from "rxjs/Rx";
import {Helpers} from "../../helpers";
import {Response} from "@angular/http";
import {NgxPermissionsService} from "ngx-permissions";

@Injectable()
export class AuthGuard implements CanActivate {

	constructor(private _router: Router, private _userService: UserService, private _permissionsService: NgxPermissionsService) {
	}

	canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
		let currentToken = sessionStorage.getItem('apiKey');
		let user = sessionStorage.getItem('user');

		if (currentToken != null)
		{
			if ( user == null )
			{
				return this._userService.userInformation().map(
					(data:Response) =>{
						let response = data.json();
						if (response.success) {
							sessionStorage.setItem('user',JSON.stringify(response.data));
							let user = JSON.parse(sessionStorage.getItem("user"));
							const perm = [user.role.name];
							this._permissionsService.loadPermissions(perm);
							return true;
						}
						else
						{
							Helpers.setLoading(false);
							this._router.navigate(['/login'] , { queryParams: { error: response.error, returnUrl: state.url } });
							return false;
						}
					},
					error => {
						Helpers.setLoading(false);
						this._router.navigate(['/login'] , { queryParams: { error:error, returnUrl: state.url} });
						return false;
					});
			}
			else {
				let user = JSON.parse(sessionStorage.getItem("user"));
				const perm = [user.role.name];
				this._permissionsService.loadPermissions(perm);
				return true;
			}
		}
		else {
			this._router.navigate(['/login'], {queryParams: {returnUrl: state.url}});
			return false;
		}
	}
}

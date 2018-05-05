import {Component, OnInit, ViewEncapsulation} from "@angular/core";
import {Router} from "@angular/router";
import {AuthenticationService} from "../_services/authentication.service";
import {Helpers} from "../../helpers";
import {Response} from "@angular/http";

@Component({
	selector: 'app-logout',
	templateUrl: './logout.component.html',
	encapsulation: ViewEncapsulation.None,
})

export class LogoutComponent implements OnInit {

	constructor(private _router: Router,
				private _authService: AuthenticationService) {
	}

	ngOnInit(): void {
		Helpers.setLoading(true);
		this._authService.logout().subscribe(
			(data:Response) =>
			{
				sessionStorage.removeItem("apiKey");
				sessionStorage.removeItem("user");
				Helpers.setLoading(false,true);
				this._router.navigate(['/login']);
			},
			error => {
				sessionStorage.removeItem("apiKey");
				sessionStorage.removeItem("user");
				Helpers.setLoading(false,true);
				this._router.navigate(['/login']);
			}
		);
	}
}
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router, NavigationStart, NavigationEnd } from '@angular/router';
import { Helpers } from '../helpers';
import { ScriptLoaderService } from '../_services/script-loader.service';
import {UserService} from "../auth/_services/index";
import {Response} from "@angular/http";
import {BaseComponent} from "./pages/default/base/base.component";

declare let mApp: any;
declare let mUtil: any;
declare let mLayout: any;
@Component({
	selector: ".m-grid.m-grid--hor.m-grid--root.m-page",
	templateUrl: "./theme.component.html",
	encapsulation: ViewEncapsulation.None,
})
export class ThemeComponent extends  BaseComponent implements OnInit {


	constructor(private _script: ScriptLoaderService, protected _router: Router, private _userService: UserService)  {
		super(_router);
	}

	ngOnInit()  {
		Helpers.setLoading(true);
		this._userService.userInformation().subscribe(
			(data:Response) =>{
				let response = data.json();
				if (response.success) {
					sessionStorage.setItem('user',JSON.stringify(response.data));
					Helpers.setLoading(false);
				}else{
					Helpers.setLoading(false);
					this._router.navigate(['/login'] , { queryParams: { error: response.error } });
				}
			},
			error => {
				Helpers.setLoading(false);
				this._router.navigate(['/login'] , { queryParams: { error:error } });
			}
		);

		this._script.loadScripts('body', ['assets/vendors/base/vendors.bundle.js','assets/demo/demo3/base/scripts.bundle.js','assets/js/components/bootstrap-select.js'], true)
            .then(result => {
				// optional js to be loaded once
				this._script.loadScripts('head', ['assets/vendors/custom/fullcalendar/fullcalendar.bundle.js'], true);
			});
		this._router.events.subscribe((route) => {
			if (route instanceof NavigationStart) {
				Helpers.setLoading(true);
				(<any>mLayout).closeMobileAsideMenuOffcanvas();
				(<any>mLayout).closeMobileHorMenuOffcanvas();
				(<any>mApp).scrollTop();
				// hide visible popover
				(<any>$('[data-toggle="m-popover"]')).popover('hide');
			}
			if (route instanceof NavigationEnd) {
				// init required js
				(<any>mApp).init();
				(<any>mUtil).init();
				Helpers.setLoading(false);
				// content m-wrapper animation
				let animation = 'm-animate-fade-in-up';
				$('.m-wrapper').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function (e) {
					$('.m-wrapper').removeClass(animation);
				}).removeClass(animation).addClass(animation);
			}
		});
	}

}
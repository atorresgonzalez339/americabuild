import {OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Response} from "@angular/http";
import {Helpers} from "../../../.././helpers";
declare var toastr: any;
declare var mApp: any;

export class BaseComponent implements OnInit {

	constructor(protected _router: Router) {

	}

	ngOnInit() {

	}

	onError( response: Response)
	{
		if ( response.ok )
		{
			let data = response.json();
			if ( data.code === 403 )
			{
				this.showError(data.error);
				this.block(false, true);
				this._router.navigate(['logout']);
			}
			else
			{
				this.showError(data.error);
			}
		}
		else {
			this.showError("An error occurred on the server.");
		}

	}

	showError(message)
	{
		this.getToastr().error(message);
	}

	showSuccess(message)
	{
		this.getToastr().success(message);
	}

	showInfo(message)
	{
		this.getToastr().info(message);
	}

	showWarning(message)
	{
		this.getToastr().warning(message);
	}

	getToastr()
	{
		toastr.options = {
			"closeButton": false,
			"debug": false,
			"newestOnTop": false,
			"progressBar": true,
			"positionClass": "toast-top-right",
			"preventDuplicates": true,
			"onclick": null,
			"showDuration": "300",
			"hideDuration": "1000",
			"timeOut": "5000",
			"extendedTimeOut": "1000",
			"showEasing": "swing",
			"hideEasing": "linear",
			"showMethod": "fadeIn",
			"hideMethod": "fadeOut"
		};

		return toastr;
	}

	block(enable, forceUnblock = false)
	{
		Helpers.setLoading(enable,forceUnblock)
	}
}

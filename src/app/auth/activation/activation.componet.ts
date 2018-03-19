import {Component, ComponentFactoryResolver, OnInit, ViewEncapsulation} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import {Helpers} from "../../helpers";
import {Response} from "@angular/http";
import {UserService} from "../_services";
import {AlertService} from '../_services/alert.service';
import {AlertComponent} from "../_directives/alert.component";

@Component({
  selector: 'app-activate',
  templateUrl: './activation.component.html',
  encapsulation: ViewEncapsulation.None,
})

export class ActivationComponet implements OnInit {
  model: any = {};
  loading = false;
  token: string;

  constructor(private _router: Router,
              private _route: ActivatedRoute,
              private _userService: UserService,
              private _alertService: AlertService,
              private cfr: ComponentFactoryResolver) {
    this._route.queryParams.subscribe(params => {
      this.token = params['token'];
    });
  }

  ngOnInit(): void {
    Helpers.setLoading(true);
    this._userService.userActivation(this.token).subscribe(
      (data:Response) =>{
        let response = data.json();
        if (response.success===false) {
          this._router.navigate(['/login'] , { queryParams: { error: response.error } });
        } else {
          this._router.navigate(['/login'], { queryParams: { success: "The user has been successfully activated" } });
        }
        Helpers.setLoading(false);
      },
      error => {
        console.log(error);
      }
    );
  }

}

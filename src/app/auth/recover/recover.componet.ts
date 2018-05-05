import {
  Component, ComponentFactoryResolver, OnInit, ViewChild, ViewContainerRef,
  ViewEncapsulation
} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import {Helpers} from "../../helpers";
import {Response} from "@angular/http";
import {UserService} from "../_services";
import {AlertComponent} from "../_directives/alert.component";
import {AlertService} from '../_services/alert.service';
import {RecoverCustom} from "./_helpers/recover-custom";
import {ScriptLoaderService} from "../../_services/script-loader.service";
import {LoginCustom} from "../_helpers/login-custom";

@Component({
  selector: 'app-recover-password',
  templateUrl: './recover.component.html',
  encapsulation: ViewEncapsulation.None,
})

export class RecoverComponet implements OnInit {
  model: any = {};
  loading = false;
  token: string;

  @ViewChild('alertSignin',
    {read: ViewContainerRef}) alertSignin: ViewContainerRef;

  constructor(private _router: Router,
              private _route: ActivatedRoute,
              private _userService: UserService,
              private _alertService: AlertService,
              private cfr: ComponentFactoryResolver,
              private _script: ScriptLoaderService) {
    this._route.queryParams.subscribe(params => {
      this.token = params['token'];
    });

  }

  ngOnInit(): void {
    Helpers.setLoading(true);
    this._userService.userVerifyToken(this.token).subscribe(
      (data:Response) =>{
        let response = data.json();
        if (response.success) {
          Helpers.setLoading(false, true);
          this._router.navigate(['/user/recover'], { queryParams: { token: this.token } });
        } else {
          Helpers.setLoading(false, true);
          this._router.navigate(['/login'] , { queryParams: { error: response.error } });
        }
      },
      error => {
        this.showAlert('alertSignin');
        Helpers.setLoading(false, true);
        this._alertService.error(error);
        this.loading = false;
      }
    );
    this._script.loadScripts('body', [
      'assets/vendors/base/vendors.bundle.js',
      'assets/demo/demo3/base/scripts.bundle.js'
    ], true).then(() => {
      RecoverCustom.init();
    });
  }

  ngAfterViewInit(): void {
  }

  setRecoverPassword(){
    Helpers.setLoading(true);
    this._userService.userRecover(this.token, this.model.password, this.model.rpassword).subscribe(
      (data:Response) =>{
        let response = data.json();
        Helpers.setLoading(false,true);
        if (response.success) {
          this._router.navigate(['/login'], { queryParams: { success:"The password has been successfully recovered" }});
        } else {
          this.showAlert('alertSignin');
          this._alertService.error(response.error);
          this.loading = false;
        }
      },
      error => {
        this.showAlert('alertSignin');
        this._alertService.error(error);
        this.loading = false;
        Helpers.setLoading(false, true);
      }
    );
  }

  showAlert(target) {
    this[target].clear();
    let factory = this.cfr.resolveComponentFactory(AlertComponent);
    let ref = this[target].createComponent(factory);
    ref.changeDetectorRef.detectChanges();
  }

}

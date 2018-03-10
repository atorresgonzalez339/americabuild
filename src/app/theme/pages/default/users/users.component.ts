import {
  Component, OnInit, ViewEncapsulation, AfterViewInit, ViewChild, ViewContainerRef,
  ComponentFactoryResolver
} from '@angular/core';
import { ScriptLoaderService } from "../../../../_services/script-loader.service";
import { UserService } from "./_services";
import {Response} from "@angular/http";
import {LoginCustom} from "../../../../auth/_helpers/login-custom";
import {AlertComponent} from "../../../../auth/_directives";
import {AlertService} from "../../../../auth/_services/alert.service";
import {Helpers} from "../../../../helpers";


@Component({
  selector: "app-users",
  templateUrl: "./users.component.html",
  encapsulation: ViewEncapsulation.None,
})
export class UsersComponent implements OnInit, AfterViewInit {
  public data: any [];
  model: any = {};
  loading = false;

  @ViewChild('alertSignin',
    {read: ViewContainerRef}) alertSignin: ViewContainerRef;

  constructor(private _script: ScriptLoaderService,
              private _usersService:UserService,
              private _alertService: AlertService,
              private cfr: ComponentFactoryResolver)  {

  }
  ngOnInit() {
    this.model.remember = true;
    this._usersService.getAll()
      .subscribe((data) => {
        setTimeout(() => {
          this.data = data.json().data;
        }, 2000);
      });
    this._script.loadScripts('body', [
      'assets/vendors/base/vendors.bundle.js',
      'assets/demo/demo3/base/scripts.bundle.js'], true).then(() => {
      Helpers.setLoading(false);

    })
  }

  ngAfterViewInit()  {
    this._script.loadScripts('app-users',
      ['assets/app/js/dashboard.js']);

  }

  signup() {
    this.loading = true;
    this._usersService.create(this.model).subscribe(
      (data: Response) => {
        let response = data.json();
        if (response.success) {
          this.showAlert('alertSignin');
          this._alertService.success(
            'Thank you. To complete your registration please check your email.',
            true);
          this.loading = false;
          this.model = {};
        }
        else {
          this.showAlert('alertSignup');
          this._alertService.error(response.error);
          this.loading = false;
        }
      },
      error => {
        this.showAlert('alertSignup');
        this._alertService.error(error);
        this.loading = false;
      });
  }

  showAlert(target) {
    this[target].clear();
    let factory = this.cfr.resolveComponentFactory(AlertComponent);
    let ref = this[target].createComponent(factory);
    ref.changeDetectorRef.detectChanges();
  }

}

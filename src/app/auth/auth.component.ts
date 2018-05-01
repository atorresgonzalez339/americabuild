import {
  Component,
  ComponentFactoryResolver,
  OnInit,
  ViewChild,
  AfterViewInit,
  ViewContainerRef,
  ViewEncapsulation,
} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ScriptLoaderService} from '../_services/script-loader.service';
import {AuthenticationService} from './_services/authentication.service';
import {AlertService} from './_services/alert.service';
import {UserService} from './_services/user.service';
import {AlertComponent} from './_directives/alert.component';
import {LoginCustom} from './_helpers/login-custom';
import {Helpers} from '../helpers';
import {Response} from "@angular/http";
declare let bootstrapSelectpicker: any;

@Component({
  selector: '.m-grid.m-grid--hor.m-grid--root.m-page',
  templateUrl: './templates/login-1.component.html',
  encapsulation: ViewEncapsulation.None,
})

export class AuthComponent implements OnInit , AfterViewInit{
  model: any = {};
  loading = false;
  returnUrl: string;
  message:string;
  error=false;
  parameters=false;
  userTypes: any[];

  @ViewChild('alertSignin',
      {read: ViewContainerRef}) alertSignin: ViewContainerRef;
  @ViewChild('alertSignup',
      {read: ViewContainerRef}) alertSignup: ViewContainerRef;
  @ViewChild('alertForgotPass',
      {read: ViewContainerRef}) alertForgotPass: ViewContainerRef;

  constructor(
      private _router: Router,
      private _script: ScriptLoaderService,
      private _userService: UserService,
      private _route: ActivatedRoute,
      private _authService: AuthenticationService,
      private _alertService: AlertService,
      private cfr: ComponentFactoryResolver) {

    this._route.queryParams.subscribe(params => {
      if(params['error']){
        this.parameters=true;
        this.error=true;
        this. message=params['error'];
      }else if(params['success']){
        this.parameters=true;
        this. message=params['success'];
      }
    });
  }

  ngOnInit() {
    this.model.remember = true;
    this.returnUrl = this._route.snapshot.queryParams['returnUrl'] || '/';
    if(this.parameters){
      if(this.error){
        this.showAlert('alertSignin');
        this._alertService.error(this.message);
        this.loading = false;
      }else{
        this.showAlert('alertSignin');
        this._alertService.success(this.message);
        this.loading = false;
      }
    }else this._router.navigate([this.returnUrl]);
    // get return url from route parameters or default to '/'

    this._script.loadScripts('body', [
      'assets/vendors/base/vendors.bundle.js',
      'assets/demo/demo3/base/scripts.bundle.js',
      'assets/js/components/bootstrap-select.js'
    ], true).then(() => {
      LoginCustom.init();
      this._userService.getUserTypes().subscribe(
          (data: Response) =>
          {
            let response = data.json();
            if (response.success) {
              this.userTypes = response.data;
              setTimeout(()=> {
                bootstrapSelectpicker.initSelects('#userType');
              }, 500);
            }
            else {
              this.showAlert('alertSignup');
              this._alertService.error(response.error);
            }
          },
          error => {
            this.showAlert('alertSignup');
            this._alertService.error(error);
          }
      );
      Helpers.setLoading(false);
    });

  }

  ngAfterViewInit(): void {
  }

  signin() {
    this.loading = true;
    this._authService.login(this.model.email, this.model.password).subscribe(
        (data: Response) => {
          this.loading = false;
          let response = data.json();
          if (response.success) {
            sessionStorage.setItem('apiKey', response.token);
            this._router.navigate([this.returnUrl]);
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
        });

  }

  signup() {
    this.loading = true;
    this._userService.create(this.model).subscribe(
        (data: Response) => {
          let response = data.json();
          if (response.success) {
            this.showAlert('alertSignin');
            this._alertService.success(
                'Thank you. To complete your registration please check your email.',
                true);
            this.loading = false;
            LoginCustom.displaySignInForm();
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


  forgotPass() {
    this.loading = true;
    this._userService.forgotPassword(this.model.email).subscribe(
        (data: Response) => {
          let response=data.json();
          if(response.success){
            this.showAlert('alertSignin');
            this._alertService.success(
                'Cool! Password recovery instruction has been sent to your email.',
                true);
            this.loading = false;
            LoginCustom.displaySignInForm();
            this.model = {};
          }
          else{
            this.showAlert('alertForgotPass');
            this._alertService.error(response.error);
            this.loading = false;
          }
        },
        error => {
          this.showAlert('alertForgotPass');
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

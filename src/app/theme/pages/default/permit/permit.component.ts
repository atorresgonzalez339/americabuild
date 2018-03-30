import { Component, OnInit, ViewEncapsulation, AfterViewInit} from '@angular/core';
import { ScriptLoaderService } from '../../../../_services/script-loader.service';
import {PermitService } from './_services';
import {Response} from "@angular/http";
import {UserService} from "../../../../auth/_services";
import { Helpers } from "../../../../helpers"
import {Router} from '@angular/router';

declare var mApp: any;

@Component({
    selector: "app-permit",
    templateUrl: "./permit.component.html",
    encapsulation: ViewEncapsulation.None,
})
export class PermitComponent implements OnInit, AfterViewInit {
    public ownerTenantUserProfile: any = {};
    public contractorUserProfile: any = {};

    constructor(private _script: ScriptLoaderService,
                private _permitService: PermitService,
                private _usersService:UserService,
                private _router: Router
    )  { }

    ngOnInit()  {
        this._usersService.userInformation().subscribe(
            (data: Response) => {
                let response = data.json();
                if (response.success) {
                    this.ownerTenantUserProfile.firstname =response.data.fullname.split(/\s(.+)/)[0];
                    this.ownerTenantUserProfile.lastname =response.data.fullname.split(/\s(.+)/)[1];
                }else {
                    //show error message
                }
            },
            error => {
                // show error message
            });
    }
    ngAfterViewInit()  {
        this._script.loadScripts('app-permit', ['assets/demo/custom/components/forms/wizard/wizard.js']);
    }

    showProfile(e) {
        if(e.target.checked){
            this._usersService.userInformation().subscribe(
                (data: Response) => {
                    let response = data.json();
                    if (response.success) {
                        this.ownerTenantUserProfile.firstname =response.data.fullname.split(/\s(.+)/)[0];
                        this.ownerTenantUserProfile.lastname =response.data.fullname.split(/\s(.+)/)[1];
                    }else {
                        //show error message
                    }
                },
                error => {
                   // show error message
                });
        }else{
            this.ownerTenantUserProfile.firstname ="";
            this.ownerTenantUserProfile.lastname ="";
        }
    }

    saveWizard(){
        Helpers.setLoading(true);
        this.ownerTenantUserProfile.email = "test@example.com";
        this.contractorUserProfile.email = "test@example.com";
        this.ownerTenantUserProfile.name = this.ownerTenantUserProfile.firstname + ' ' + this.ownerTenantUserProfile.lastname;
        this.contractorUserProfile.name = this.contractorUserProfile.firstname + ' ' + this.contractorUserProfile.lastname;

        this._permitService.create(this.ownerTenantUserProfile, this.contractorUserProfile).subscribe(
         (data: Response) => {
             let response = data.json();
                 if (response.success) {
                     this.ownerTenantUserProfile={};
                     this.contractorUserProfile={};
                     Helpers.setLoading(false);
                     this._router.navigate(['index']);
                }
                 else {
                 // show error message
                     Helpers.setLoading(false);
                     //mApp.unblock("body");
             }
             },
             error => {
                 //show error message
                 Helpers.setLoading(false);
                 //mApp.unblock("body");
             });
    }
}
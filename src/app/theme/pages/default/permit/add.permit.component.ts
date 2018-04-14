import { Component, OnInit, ViewEncapsulation, AfterViewInit} from '@angular/core';
import { ScriptLoaderService } from '../../../../_services/script-loader.service';
import {PermitImprovementTypesService, PermitTypeService, PermitService } from './_services';
import {Response} from "@angular/http";
import {UserService} from "../../../../auth/_services";
import {Router} from '@angular/router';
import { BaseComponent } from '../base/base.component';
declare var addPermitWizard: any;

@Component({
    selector: "add-app-permit",
    templateUrl: "template/add.permit.component.html",
    encapsulation: ViewEncapsulation.None,
})
export class AddPermitComponent extends BaseComponent implements AfterViewInit {
    public ownerTenantUserProfile: any = {};
    public contractorUserProfile: any = {};
    public architectUserProfile: any = {};
    public permitProfile: any = {};
    public agree: boolean = false;
    public user: any = {};
    public myStep_disabled = false;
    public listPermitType: any [];
    public listPermitImprovementType: any [];
    public selectedPermitType: any = {};
    public selectedPermitImprovementType: any = {};

    constructor(private _script: ScriptLoaderService,
                private _permitService: PermitService,
                private _permitTypeService: PermitTypeService,
                private _permitImprovementTypesServices: PermitImprovementTypesService,
                private _usersService:UserService,
                public _router: Router
    )  {
        super(_router);
    }

    ngOnInit()  {
        this.block(true);
        this._permitTypeService.getAll()
            .subscribe((data)=> {
                    this.listPermitType = data.json().data;
                    setTimeout(()=> {
                        addPermitWizard.initSelects('#type');
                    }, 2000);
                },
                error =>
                {
                    this.block(false);
                    this.onError(error);
                }
            );
        this._permitImprovementTypesServices.getAll()
            .subscribe((data)=> {
                    this.listPermitImprovementType = data.json().data;
                    setTimeout(()=> {
                        this.listPermitImprovementType = data.json().data;
                        addPermitWizard.initSelects('#typeOfImprovement');
                    }, 2000);
                },
                error =>
                {
                    this.block(false);
                    this.onError(error);
                }
            );
        this.block(false);
    }

    ngAfterViewInit()  {
        this._script.loadScripts('add-app-permit', ['assets/js/components/permit/addPermitWizard.js']);
    }

    showProfile(e) {
        if(e.target.checked){
            this.user = JSON.parse(sessionStorage.getItem("user"));

            if ( e.target.name == "applyinf")
            {
                this.ownerTenantUserProfile.firstname =this.user.fullname.split(/\s(.+)/)[0];
                this.ownerTenantUserProfile.lastname =this.user.fullname.split(/\s(.+)/)[1];
                this.ownerTenantUserProfile.email =this.user.username;
            }
            else if (e.target.name == "applyinf2")
            {
                this.contractorUserProfile.firstname =this.user.fullname.split(/\s(.+)/)[0];
                this.contractorUserProfile.lastname =this.user.fullname.split(/\s(.+)/)[1];
                this.contractorUserProfile.email =this.user.username;
            }
            else if (e.target.name == "applyinf3")
            {
                this.architectUserProfile.firstname =this.user.fullname.split(/\s(.+)/)[0];
                this.architectUserProfile.lastname =this.user.fullname.split(/\s(.+)/)[1];
                this.architectUserProfile.email =this.user.username;
            }
        }else
        {
            if ( e.target.name == "applyinf")
            {
                this.ownerTenantUserProfile.firstname ="";
                this.ownerTenantUserProfile.lastname ="";
                this.ownerTenantUserProfile.email ="";
            }
            else if (e.target.name == "applyinf2")
            {
                this.contractorUserProfile.firstname ="";
                this.contractorUserProfile.lastname ="";
                this.contractorUserProfile.email ="";
            }
            else if (e.target.name == "applyinf3")
            {
                this.architectUserProfile.firstname ="";
                this.architectUserProfile.lastname ="";
                this.architectUserProfile.email ="";
            }
        }
    }

    changeOwner(e) {
        if(e.target.checked){
            this.contractorUserProfile = this.ownerTenantUserProfile;
            this.myStep_disabled = true;
        }else
        {
            this.contractorUserProfile = {};
            this.myStep_disabled = false;
        }
    }

    saveWizard(){
        if ( this.agree ) {
            this.block(true);
            this.ownerTenantUserProfile.name = this.ownerTenantUserProfile.firstname + ' ' + this.ownerTenantUserProfile.lastname;
            this.contractorUserProfile.name = this.contractorUserProfile.firstname + ' ' + this.contractorUserProfile.lastname;
            this.architectUserProfile.name = this.architectUserProfile.firstname + ' ' + this.architectUserProfile.lastname;
            this.permitProfile.type = this.selectedPermitType.id;
            this.permitProfile.typeOfImprovement = this.selectedPermitImprovementType.id;
            this._permitService.create(this.ownerTenantUserProfile, this.contractorUserProfile, this.architectUserProfile, this.permitProfile).subscribe(
                (data: Response) => {
                    let response = data.json();
                    if (response.success) {
                        this.ownerTenantUserProfile = {};
                        this.contractorUserProfile = {};
                        this.block(false);
                        this.showInfo("The permit has been created successfull");
                        this._router.navigate(['index']);
                    }
                    else {
                        this.onError(data);
                        this.block(false);
                    }
                },
                error => {
                    this.onError(error);
                    this.block(false);
                });
        }
    }
}
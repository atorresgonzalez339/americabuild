import { ElementRef, NgZone, Component, OnInit, ViewEncapsulation, AfterViewInit, ViewChild} from '@angular/core';
import { ScriptLoaderService } from '../../../../_services/script-loader.service';
import {PermitImprovementTypesService, PermitTypeService, PermitService, StateService } from './_services';
import {Response} from "@angular/http";
import {UserService} from "../../../../auth/_services";
import {Router} from '@angular/router';
import { BaseComponent } from '../base/base.component';
import { FormControl } from '@angular/forms';
import { } from 'googlemaps';
import { MapsAPILoader } from '@agm/core';
declare var addPermitWizard: any;

@Component({
    selector: "add-app-permit",
    templateUrl: "template/add.permit.component.html",
    encapsulation: ViewEncapsulation.None,
})
export class AddPermitComponent extends BaseComponent implements AfterViewInit {
    public ownerTenantUserProfile: any = {countryState:{}};
    public contractorUserProfile: any = {countryState:{}};
    public architectUserProfile: any = {countryState:{}};
    public permitProfile: any = {};
    public agree: boolean = false;
    public user: any = {};
    public myStep_disabled = false;
    public listPermitType: any [];
    public listPermitImprovementType: any [];
    public listStates: any [];
    public selectedPermitType: any = {};
    public selectedPermitImprovementType: any = {};
    public ownerAddress: any = { valid: false};
    public ownerTenantSearchControl: FormControl = new FormControl();
    public contractorSearchControl: FormControl = new FormControl();
    public architectSearchControl: FormControl = new FormControl();

    @ViewChild("addressOwnerTenant")
    public addressOwnerTenantElementRef: ElementRef;
    @ViewChild("addressContractorUser")
    public addressContractorUserElementRef: ElementRef;
    @ViewChild("addressArchitectUser")
    public addressArchitectUserElementRef: ElementRef;

    constructor(private _script: ScriptLoaderService,
                private _permitService: PermitService,
                private _permitTypeService: PermitTypeService,
                private _permitImprovementTypesServices: PermitImprovementTypesService,
                public _router: Router,
                public _stateService: StateService,
                private mapsAPILoader: MapsAPILoader,
    )  {
        super(_router);
        this.permitProfile.ownerBuilder = false;
    }

    ngOnInit()  {
        this.block(true);

        //load Places Autocomplete
        this.mapsAPILoader.load().then(() => {

            let autocompleteOwnerTenant = new google.maps.places.Autocomplete(this.addressOwnerTenantElementRef.nativeElement, {  types: ["address"], componentRestrictions: {country: 'US'} });
            autocompleteOwnerTenant.addListener("place_changed", () => {
                let placeOwnerTenant: google.maps.places.PlaceResult = autocompleteOwnerTenant.getPlace();
                this.ownerTenantUserProfile.address1 = placeOwnerTenant.formatted_address;
                this.ownerTenantSearchControl.setValue( this.ownerTenantUserProfile.address1);
                addPermitWizard.changeAttr("#address1","validAddress", "true");
            });

            let autocompleteContractorUser = new google.maps.places.Autocomplete(this.addressContractorUserElementRef.nativeElement, { types: ["address"], componentRestrictions: {country: 'US'} });
            autocompleteContractorUser.addListener("place_changed", () => {
                let placeContractorUser: google.maps.places.PlaceResult = autocompleteContractorUser.getPlace();
                this.contractorUserProfile.address1 = placeContractorUser.formatted_address;
                this.contractorSearchControl.setValue( this.contractorUserProfile.address1);
                addPermitWizard.changeAttr("#address1_contractor","validAddress", "true");
                });

            let autocompleteArchitectUser = new google.maps.places.Autocomplete(this.addressArchitectUserElementRef.nativeElement, { types: ["address"], componentRestrictions: {country: 'US'} });
            autocompleteArchitectUser.addListener("place_changed", () => {
                let placeArchitectUser: google.maps.places.PlaceResult = autocompleteArchitectUser.getPlace();
                this.architectUserProfile.address1=placeArchitectUser.formatted_address;
                this.architectSearchControl.setValue( this.architectUserProfile.address1);
                addPermitWizard.changeAttr("#address1_architect","validAddress", "true");
            });
        });

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
                        addPermitWizard.initSelects('#typeOfImprovement');
                    }, 2000);
                },
                error =>
                {
                    this.block(false);
                    this.onError(error);
                }
            );
        this._stateService.getAll()
            .subscribe((data)=> {
                    this.listStates = data.json().data;
                    setTimeout(()=> {
                        addPermitWizard.initSelects('#ownerTenantState');
                        addPermitWizard.initSelects('#contractorState');
                        addPermitWizard.initSelects('#architectState');
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

    onAddressBlur(e)
    {
        if (e.target.name == "address1") {
            if (e.target.value == this.ownerTenantUserProfile.address1) {
                addPermitWizard.changeAttr("#address1", "validAddress", "true");
            }
            else {
                addPermitWizard.changeAttr("#address1", "validAddress", "false");
            }
        }
        else if (e.target.name == "addres1_contractor")
        {
            if (e.target.value == this.contractorUserProfile.address1) {
                addPermitWizard.changeAttr("#address1_contractor", "validAddress", "true");
            }
            else {
                addPermitWizard.changeAttr("#address1_contractor", "validAddress", "false");
            }
        }
        else {
            if (e.target.value == this.architectUserProfile.address1) {
                addPermitWizard.changeAttr("#address1_architect", "validAddress", "true");
            }
            else {
                addPermitWizard.changeAttr("#address1_architect", "validAddress", "false");
            }
        }
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
            this.contractorUserProfile = {countryState:{}};
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
            this.ownerTenantUserProfile.state = this.ownerTenantUserProfile.countryState.id;
            this.contractorUserProfile.state = this.contractorUserProfile.countryState.id;
            this.architectUserProfile.state = this.architectUserProfile.countryState.id;
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
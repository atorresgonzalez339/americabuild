import { ElementRef, Component, OnInit, ViewEncapsulation, AfterViewInit, ViewChild} from '@angular/core';
import { ScriptLoaderService } from '../../../../_services/script-loader.service';
import {PermitImprovementTypesService, PermitTypeService, PermitService, StateService } from './_services';
import {Response} from "@angular/http";
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
    public ownerTenantUserProfile: any = {countryState:{}, addressLocation: {}};
    public contractorUserProfile: any = {countryState:{}, addressLocation: {}};
    public architectUserProfile: any = {countryState:{}, addressLocation: {}};
    public permitProfile: any = {};
    public agree: boolean = false;
    public user: any = {};
    public myStep_disabled = false;
    public listPermitType: any [];
    public listPermitImprovementType: any [];
    public listStates: any [];
    public selectedPermitType: any = {};
    public selectedPermitImprovementType: any = {};
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

        //Initialize lat, lgt and zoom to maps
        this.ownerTenantUserProfile.addressLocation.latitude = 39.8282;
        this.ownerTenantUserProfile.addressLocation.longitude = -98.5795;
        this.ownerTenantUserProfile.addressLocation.zoom = 4;

        this.contractorUserProfile.addressLocation.latitude = 39.8282;
        this.contractorUserProfile.addressLocation.longitude = -98.5795;
        this.contractorUserProfile.addressLocation.zoom = 4;

        this.architectUserProfile.addressLocation.latitude = 39.8282;
        this.architectUserProfile.addressLocation.longitude = -98.5795;
        this.architectUserProfile.addressLocation.zoom = 4;
    }

    ngOnInit()  {
        this.block(true);

        //load Places Autocomplete
        this.setCurrentPositionOwnerTenant();
        this.setCurrentPositionContractorUser();
        this.setCurrentPositionArchitectUser();

        this.mapsAPILoader.load().then(() => {

            let autocompleteOwnerTenant = new google.maps.places.Autocomplete(this.addressOwnerTenantElementRef.nativeElement, {  types: ["address"], componentRestrictions: {country: 'US'} });
            autocompleteOwnerTenant.addListener("place_changed", () => {
                let placeOwnerTenant: google.maps.places.PlaceResult = autocompleteOwnerTenant.getPlace();
                //set latitude, longitude and zoom
                this.ownerTenantUserProfile.addressLocation.latitude = placeOwnerTenant.geometry.location.lat();
                this.ownerTenantUserProfile.addressLocation.longitude = placeOwnerTenant.geometry.location.lng();
                this.ownerTenantUserProfile.addressLocation.zoom = 12;

                //Autocomplete address1, city, status and zip code
                let route =  this.getAddressComponents(placeOwnerTenant.address_components, "route")
                let street =  this.getAddressComponents(placeOwnerTenant.address_components, "street_number");
                let premise =  this.getAddressComponents(placeOwnerTenant.address_components, "premise");
                let city = this.getAddressComponents(placeOwnerTenant.address_components, "locality");
                let state = this.getAddressComponents(placeOwnerTenant.address_components, "administrative_area_level_1");
                let zip = this.getAddressComponents(placeOwnerTenant.address_components, "postal_code");

                let addressName = "";
                if ( street !== undefined && street !== null )
                {
                    addressName = street + ", ";
                }

                if (route !== undefined && route !== null)
                {
                    addressName += route;
                }

                if (premise !== undefined && premise !== null)
                {
                    addressName += addressName !== "" ? ", " + premise : premise;
                }

                this.ownerTenantUserProfile.address1 = addressName !== "" ? addressName : "";
                this.ownerTenantSearchControl.setValue(addressName !== "" ? addressName : "");
                this.ownerTenantUserProfile.city = city !== undefined && city !== null ? city : "";
                this.ownerTenantUserProfile.countryState = state !== undefined && state !== null ? this.getStateByName(state) : {};
                this.ownerTenantUserProfile.zip = zip !== undefined && zip !== null ? zip : "";

                addPermitWizard.changeAttr("#address1","validAddress", "true");
                setTimeout(()=> {
                    addPermitWizard.refreshSelectpicker("#ownerTenantState");
                }, 200);
            });

            let autocompleteContractorUser = new google.maps.places.Autocomplete(this.addressContractorUserElementRef.nativeElement, { types: ["address"], componentRestrictions: {country: 'US'} });
            autocompleteContractorUser.addListener("place_changed", () => {
                let placeContractorUser: google.maps.places.PlaceResult = autocompleteContractorUser.getPlace();

                //set latitude, longitude and zoom
                this.contractorUserProfile.addressLocation.latitude = placeContractorUser.geometry.location.lat();
                this.contractorUserProfile.addressLocation.longitude = placeContractorUser.geometry.location.lng();
                this.contractorUserProfile.addressLocation.zoom = 12;

                //Autocomplete address1, city, status and zip code
                let route =  this.getAddressComponents(placeContractorUser.address_components, "route")
                let street =  this.getAddressComponents(placeContractorUser.address_components, "street_number");
                let premise =  this.getAddressComponents(placeContractorUser.address_components, "premise");
                let city = this.getAddressComponents(placeContractorUser.address_components, "locality");
                let state = this.getAddressComponents(placeContractorUser.address_components, "administrative_area_level_1");
                let zip = this.getAddressComponents(placeContractorUser.address_components, "postal_code");

                let addressName = "";
                if ( street !== undefined && street !== null )
                {
                    addressName = street + ", ";
                }

                if (route !== undefined && route !== null)
                {
                    addressName += route;
                }

                if (premise !== undefined && premise !== null)
                {
                    addressName += addressName !== "" ? ", " + premise : premise;
                }

                this.contractorUserProfile.address1 = addressName !== "" ? addressName : "";
                this.contractorSearchControl.setValue(addressName !== "" ? addressName : "");
                this.contractorUserProfile.city = city !== undefined && city !== null ? city : "";
                this.contractorUserProfile.countryState = state !== undefined && state !== null ? this.getStateByName(state) : {};
                this.contractorUserProfile.zip = zip !== undefined && zip !== null ? zip : "";

                addPermitWizard.changeAttr("#address1_contractor","validAddress", "true");
                setTimeout(()=> {
                    addPermitWizard.refreshSelectpicker("#contractorState");
                }, 200);
            });

            let autocompleteArchitectUser = new google.maps.places.Autocomplete(this.addressArchitectUserElementRef.nativeElement, { types: ["address"], componentRestrictions: {country: 'US'} });
            autocompleteArchitectUser.addListener("place_changed", () => {
                let placeArchitectUser: google.maps.places.PlaceResult = autocompleteArchitectUser.getPlace();

                //set latitude, longitude and zoom
                this.architectUserProfile.addressLocation.latitude= placeArchitectUser.geometry.location.lat();
                this.architectUserProfile.addressLocation.longitude = placeArchitectUser.geometry.location.lng();
                this.architectUserProfile.addressLocation.zoom = 12;

                //Autocomplete address1, city, status and zip code
                let route =  this.getAddressComponents(placeArchitectUser.address_components, "route")
                let street =  this.getAddressComponents(placeArchitectUser.address_components, "street_number");
                let premise =  this.getAddressComponents(placeArchitectUser.address_components, "premise");
                let city = this.getAddressComponents(placeArchitectUser.address_components, "locality");
                let state = this.getAddressComponents(placeArchitectUser.address_components, "administrative_area_level_1");
                let zip = this.getAddressComponents(placeArchitectUser.address_components, "postal_code");

                let addressName = "";
                if ( street !== undefined && street !== null )
                {
                    addressName = street + ", ";
                }

                if (route !== undefined && route !== null)
                {
                    addressName += route;
                }

                if (premise !== undefined && premise !== null)
                {
                    addressName += addressName !== "" ? ", " + premise : premise;
                }

                this.architectUserProfile.address1 = addressName !== "" ? addressName : "";
                this.architectSearchControl.setValue(addressName !== "" ? addressName : "");
                this.architectUserProfile.city = city !== undefined && city !== null ? city : "";
                this.architectUserProfile.countryState = state !== undefined && state !== null ? this.getStateByName(state) : {};
                this.architectUserProfile.zip = zip !== undefined && zip !== null ? zip : "";

                addPermitWizard.changeAttr("#address1_architect","validAddress", "true");
                setTimeout(()=> {
                    addPermitWizard.refreshSelectpicker("#architectState");
                }, 500);
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
        else if (e.target.name == "address1_contractor")
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
            this.contractorUserProfile = {countryState:{}, addressLocation: {}};
            this.myStep_disabled = false;
            //Initialize latitude, longitude and zoom maps
            this.contractorUserProfile.addressLocation.latitude = 39.8282;
            this.contractorUserProfile.addressLocation.longitude = -98.5795;
            this.contractorUserProfile.addressLocation.zoom = 4;
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

    private setCurrentPositionOwnerTenant() {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition((position) => {
                this.ownerTenantUserProfile.addressLocation.latitude = position.coords.latitude;
                this.ownerTenantUserProfile.addressLocation.longitude = position.coords.longitude;
                this.ownerTenantUserProfile.addressLocation.zoom = 12;
            });
        }
    }

    private setCurrentPositionContractorUser() {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition((position) => {
                this.contractorUserProfile.addressLocation.latitude = position.coords.latitude;
                this.contractorUserProfile.addressLocation.longitude = position.coords.longitude;
                this.contractorUserProfile.addressLocation.zoom = 12;
            });
        }
    }

    private setCurrentPositionArchitectUser() {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition((position) => {
                this.architectUserProfile.addressLocation.latitude = position.coords.latitude;
                this.architectUserProfile.addressLocation.longitude = position.coords.longitude;
                this.architectUserProfile.addressLocation.zoom = 12;
            });
        }
    }

    private getStateByName(name){
        for(let i =0; i<this.listStates.length; i++)
        {
            if(this.listStates[i].name === name){
                return this.listStates[i];
            }
        }
        return null;
    }

    private getAddressComponents(components, type) {
        //gets "premise","street_number", "route", "locality", "country", "postal_code", "administrative_area_level_1"  regionName, "administrative_area_level_2" provName
        for (var key in components) {
            if (components.hasOwnProperty(key)) {

                if (type === components[key].types[0]) {
                    return components[key].long_name;
                }
            }
        }
    }
}
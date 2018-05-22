import {Component, ViewEncapsulation, AfterViewInit, ViewChild} from '@angular/core';
import { ScriptLoaderService } from "../../../../_services/script-loader.service";
import { FeesService} from "./_services";
import {PermitTypeService } from '../permit/_services';
import {Response} from "@angular/http";
import {ActivatedRoute, Router} from '@angular/router';
import {BaseComponent} from '../base/base.component';
import { FeesHelper } from './_helpers/fees.helper';
declare let bootstrapSelectpicker:any;

@Component({
    selector: "add-fees",
    templateUrl: "./templates/add.fees.component.html",
    encapsulation: ViewEncapsulation.None,
})
export class AddFeesComponent extends BaseComponent implements AfterViewInit {

    public fees: any = {};
    public listPermitType: any [];
    public selectedPermitType: any = {};
    public isAdd: boolean = true;

    constructor(private _script: ScriptLoaderService,
                private _feesService: FeesService,
                public _router: Router,
                private _activatedRute: ActivatedRoute,
                private _permitTypeService: PermitTypeService,
    ) {
        super(_router);
        this.isAdd = _router.url.indexOf("/fees/edit") != 0;
    }

    ngOnInit() {
        this.block(true);
        FeesHelper.handleSubmit();
        this._permitTypeService.getAll().subscribe(
                (data: Response) => {
                    let response = data.json();
                    if (response.success) {
                        this.listPermitType = response.data;
                        this.initForm();
                        setTimeout(()=> {
                            bootstrapSelectpicker.refreshSelectpicker('#type');
                            this.block(false, true);
                        }, 2000);
                    }
                    else {
                        this.onError(data);
                        this.block(false, true);
                    }
                },
            error => {
                this.onError(error);
                this.block(false, true);
            });
    }

    ngAfterViewInit()  {
        bootstrapSelectpicker.initSelects('#type');
    }

    submitFees() {
        this.block(true);
        this.fees.permitType = this.selectedPermitType.id;
        if ( this.isAdd ) {
            this._feesService.create(this.fees).subscribe(
                (data: Response) => {
                    let response = data.json();
                    if (response.success) {
                        this.fees = {id:null};
                        FeesHelper.selectedItem = this.fees;
                        this.block(false, true);
                        this.showInfo("The fees item has been created successfull");
                        this._router.navigate(['fees']);
                    }
                    else {
                        this.onError(data);
                        this.block(false, true);
                    }
                },
                error => {
                    this.onError(error);
                    this.block(false, true);
                });
        }
        else {
            this._feesService.update(this.fees).subscribe(
                (data: Response) => {
                    let response = data.json();
                    if (response.success) {
                        this.fees = {id:null};
                        FeesHelper.selectedItem = this.fees;
                        this.block(false, true);
                        this.showInfo("The fees item has been updated successfull");
                        this._router.navigate(['fees']);
                    }
                    else {
                        this.onError(data);
                        this.block(false, true);
                    }
                },
                error => {
                    this.onError(error);
                    this.block(false, true);
                });
        }
    }

    private initForm()
    {
        if (FeesHelper.selectedItem.id != null) {
            this.fees.id = FeesHelper.selectedItem.id;
            this.fees.description = FeesHelper.selectedItem.description;
            this.selectedPermitType = this.getPermitTypeById(FeesHelper.selectedItem.permitType.id);
        }
    }

    private getPermitTypeById(id){
        for(let i =0; i<this.listPermitType.length; i++)
        {
            if(this.listPermitType[i].id === id){
                return this.listPermitType[i];
            }
        }
        return null;
    }

}

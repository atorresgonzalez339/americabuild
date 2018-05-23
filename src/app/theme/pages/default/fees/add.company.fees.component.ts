import {Component, ViewEncapsulation, AfterViewInit, ViewChild} from '@angular/core';
import { ScriptLoaderService } from '../../../../_services/script-loader.service';
import { FeesService} from './_services';
import { CompanyFeesService } from './_services';
import {CompanyService } from '../company/_services';
import {Response} from '@angular/http';
import {Router} from '@angular/router';
import {BaseComponent} from '../base/base.component';
import { FeesHelper} from './_helpers/fees.helper';

declare let bootstrapSelectpicker:any;

@Component({
    selector: 'app-add-company-fees',
    templateUrl: './templates/add.company.fees.html',
    encapsulation: ViewEncapsulation.None,
})
export class AddCompanyFeesComponent extends BaseComponent implements AfterViewInit {

    public companyFees: any = {};
    public listCompany: any [];
    public listFeesCategory: any [];
    public selectedCompany: any = {};
    public selectedFeesCategory: any = {};
    public isAdd: boolean = true;

    constructor(private _script: ScriptLoaderService,
                private _feesService: FeesService,
                private _companyFeesService: CompanyFeesService,
                public _router: Router,
                private _companyService: CompanyService ) {
        super(_router);
        this.isAdd = _router.url.indexOf("/fees/company-fees/edit") != 0;
    }

    ngOnInit() {
        this.block(true);
        this.initForm();
        FeesHelper.handleCompanyFeesSubmit();
        this._companyService.getAll().subscribe(
            (data: Response) => {
                let response = data.json();
                if (response.success) {
                    this.listCompany = response.data;
                    if (FeesHelper.selectedItem.id != null) {
                        this.selectedCompany = this.getCompanyById(FeesHelper.selectedItem.company.id);
                    }
                    setTimeout(() => {
                        bootstrapSelectpicker.refreshSelectpicker('#company');
                        this.block(false);
                    }, 2000);
                } else {
                    this.onError(data);
                    this.block(false);
                }
            },
            error => {
                this.onError(error);
                this.block(false);
            });

        this.block(true);
        this._feesService.getAll().subscribe(
            (data: Response) => {
                let response = data.json();
                if (response.success) {
                    this.listFeesCategory = response.data;
                    if (FeesHelper.selectedItem.id != null) {
                        this.selectedFeesCategory = this.getFeesCategoryById(FeesHelper.selectedItem.feesCategory.id);
                    }
                    setTimeout(() => {
                        bootstrapSelectpicker.refreshSelectpicker('#fees_category');
                        this.block(false);
                    }, 2000);

                } else {
                    this.onError(data);
                    this.block(false);
                }
            },
            error => {
                this.onError(error);
                this.block(false);
            });
    }

    ngAfterViewInit() {
        bootstrapSelectpicker.initSelects('#company');
        bootstrapSelectpicker.initSelects('#fees_category');
    }

    addCompanyFees() {
        this.block(true);
        this.companyFees.company = this.selectedCompany.id;
        this.companyFees.feesCategory = this.selectedFeesCategory.id;
        if ( this.isAdd ) {
            this._companyFeesService.create(this.companyFees).subscribe(
                (data: Response) => {
                    let response = data.json();
                    if (response.success) {
                        this.companyFees = {id:null};
                        FeesHelper.selectedItem = this.companyFees;
                        this.block(false, true);
                        this.showInfo("The company fees has been created successfull");
                        this._router.navigate(['fees/company-fees']);
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
            this._companyFeesService.update(this.companyFees).subscribe(
                (data: Response) => {
                    let response = data.json();
                    if (response.success) {
                        this.companyFees = {id:null};
                        FeesHelper.selectedItem = this.companyFees;
                        this.block(false, true);
                        this.showInfo("The company fees item has been updated successfull");
                        this._router.navigate(['fees/company-fees']);
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
            this.companyFees.id = FeesHelper.selectedItem.id;
            this.companyFees.value = FeesHelper.selectedItem.value;
        }
    }

    private getCompanyById(id){
        for(let i =0; i<this.listCompany.length; i++)
        {
            if(this.listCompany[i].id === id){
                return this.listCompany[i];
            }
        }
        return null;
    }

    private getFeesCategoryById(id){
        for(let i =0; i<this.listFeesCategory.length; i++)
        {
            if(this.listFeesCategory[i].id === id){
                return this.listFeesCategory[i];
            }
        }
        return {};
    }
}
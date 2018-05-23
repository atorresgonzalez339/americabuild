import { ElementRef, ViewChild, Component, ViewEncapsulation } from '@angular/core';
import { ScriptLoaderService } from '../../../../_services/script-loader.service';
import { CompanyFeesService } from './_services';
import {BaseComponent} from "../base/base.component";
import {Router} from '@angular/router';
import {Response} from "@angular/http";
import { FeesHelper} from './_helpers/fees.helper';

@Component({
    selector: 'app-company-fees',
    templateUrl: './templates/company.fees.component.html',
    encapsulation: ViewEncapsulation.None,
})
export class CompanyFeesComponent extends BaseComponent {
    public companyFees: any [];

    @ViewChild('confirmModal')
    public confirmModal: ElementRef;

    constructor(private _script: ScriptLoaderService, private _companyFeesService: CompanyFeesService, protected _router: Router)  {
        super(_router);
        FeesHelper.selectedItem = {id:null};
    }

    ngOnInit()  {
        this.listAll();
    }

    confirmDelete(row)
    {
        this.confirmModal.nativeElement.setAttribute("data-id",row.id);
    }

    delete()
    {
        let id = this.confirmModal.nativeElement.getAttribute("data-id");
        this.confirmModal.nativeElement.click();
        this.block(true);
        this._companyFeesService.delete(id).subscribe(
            (data: Response) => {
                let response = data.json();
                if (response.success) {
                    this.showInfo("The company fees has been deleted successfull");
                    this.listAll();
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

    update(row) {
        FeesHelper.selectedItem = row;
        this._router.navigate(['/fees/company-fees/edit']);
    }

    private listAll()
    {
        this.block(true);
        this._companyFeesService.getAll().subscribe(
            (data: Response) => {
                let response = data.json();
                if (response.success) {
                    this.companyFees = response.data;
                }
                else {
                    this.onError(data);
                }
                this.block(false, true);
            },
            error => {
                this.onError(error);
                this.block(false, true);
            });
    }
}

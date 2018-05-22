import { ElementRef, ViewChild, Component, ViewEncapsulation } from '@angular/core';
import { FeesService} from './_services';
import {BaseComponent} from "../base/base.component";
import {Router} from '@angular/router';
import {Response} from "@angular/http";
import { FeesHelper } from './_helpers/fees.helper';
declare let bootstrapSelectpicker:any;

@Component({
    selector: 'app-fees',
    templateUrl: './templates/fees.component.html',
    encapsulation: ViewEncapsulation.None,
})
export class FeesComponent extends BaseComponent{
  public feesItems: any [];

    @ViewChild('confirmModal')
    public confirmModal: ElementRef;

    constructor(private _feesService: FeesService, protected _router: Router )  {
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
        this._feesService.delete(id).subscribe(
            (data: Response) => {
                let response = data.json();
                if (response.success) {
                    this.showInfo("The fees item has been deleted successfull");
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
        this._router.navigate(['fees/edit']);
    }

    private listAll()
    {
        this.block(true);
        this._feesService.getAll().subscribe(
            (data: Response) => {
                let response = data.json();
                if (response.success) {
                    this.feesItems = response.data;
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

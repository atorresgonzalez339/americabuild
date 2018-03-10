import { Component, OnInit, ViewEncapsulation, AfterViewInit } from '@angular/core';
import { Helpers } from "../../../../helpers";
import { ScriptLoaderService } from "../../../../_services/script-loader.service";
import { CompanyService} from "./_services";
import {Response} from "@angular/http";
import {Router} from '@angular/router';

@Component({
selector: "add-company",
templateUrl: "./add.component.html",
encapsulation: ViewEncapsulation.None,
})
export class AddCompanyComponent implements OnInit, AfterViewInit {

    public company: any = {};

    constructor(private _script: ScriptLoaderService,
                private _companyService: CompanyService,
                private _router: Router,
    ) {

    }

    ngOnInit() {

    }

    addCompany() {
        this._companyService.create(this.company).subscribe(
            (data: Response) => {
                let response = data.json();
                if (response.success) {
                    //redirect to /company
                    this.company = {};
                    this._router.navigate(['company']);
                }
                else {
                }
            },
            error => {
                //show error message and stop loading
            });
    }

    cancelAdd()
    {
        this.company = {};
        this._router.navigate(['company']);
    }

}

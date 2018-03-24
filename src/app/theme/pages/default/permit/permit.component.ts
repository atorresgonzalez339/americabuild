import { Component, OnInit, ViewEncapsulation, AfterViewInit } from '@angular/core';
import { ScriptLoaderService } from '../../../../_services/script-loader.service';


@Component({
    selector: "app-permit",
    templateUrl: "./permit.component.html",
    encapsulation: ViewEncapsulation.None,
})
export class PermitComponent implements OnInit, AfterViewInit {


    constructor(private _script: ScriptLoaderService)  {

    }
    ngOnInit()  {

    }
    ngAfterViewInit()  {
        this._script.loadScripts('app-permit', ['assets/demo/custom/components/forms/wizard/wizard.js']);
    }

}
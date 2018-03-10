import { Component, OnInit, ViewEncapsulation, AfterViewInit } from '@angular/core';
import { Helpers } from "../../../../helpers";
import { ScriptLoaderService } from "../../../../_services/script-loader.service";
import { CompanyService} from "./_services";


@Component({
selector: "app-company",
templateUrl: "./company.component.html",
encapsulation: ViewEncapsulation.None,
})
export class CompanyComponent implements OnInit, AfterViewInit {
  public data: any [];


constructor(private _script: ScriptLoaderService, private _companyService:CompanyService)  {

}
ngOnInit()  {
  this._companyService.getAll()
    .subscribe((data)=> {
      setTimeout(()=> {
        this.data = data.json().data;
      }, 2000);
    });
}
ngAfterViewInit()  {
this._script.loadScripts('app-company',
['assets/app/js/dashboard.js']);

}

}

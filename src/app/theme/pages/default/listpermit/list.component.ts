import { Component, OnInit, ViewEncapsulation, AfterViewInit } from '@angular/core';
import { Helpers } from "../../../../helpers";
import { ScriptLoaderService } from "../../../../_services/script-loader.service";
import { PermitService } from "./_services";


@Component({
  selector: "app-list-permit",
  templateUrl: "./list.component.html",
  encapsulation: ViewEncapsulation.None,
})
export class ListComponent implements OnInit, AfterViewInit {
  public data: any [];


  constructor(private _script: ScriptLoaderService, private _permitService:PermitService)  {

  }
  ngOnInit()  {
    Helpers.setLoading(true);
    this._permitService.getAll()
      .subscribe((data)=> {
        setTimeout(()=> {
          this.data = data.json().data;
          Helpers.setLoading(false);
        }, 2000);
      });
  }
  ngAfterViewInit()  {
    this._script.loadScripts('app-list-permit',
      ['assets/app/js/dashboard.js']);

  }

}


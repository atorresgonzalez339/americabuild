import { Component, OnInit, ViewEncapsulation, AfterViewInit } from '@angular/core';
import { Helpers } from "../../../../helpers";
import { ScriptLoaderService } from "../../../../_services/script-loader.service";
import { RolesService } from "./_services";


@Component({
  selector: "app-roles",
  templateUrl: "./roles.component.html",
  encapsulation: ViewEncapsulation.None,
})
export class RolesComponent implements OnInit, AfterViewInit {
  public data: any [];


  constructor(private _script: ScriptLoaderService, private _rolesService:RolesService)  {

  }
  ngOnInit()  {
    this._rolesService.getAll()
      .subscribe((data)=> {
        setTimeout(()=> {
          this.data = data.json().data;
        }, 2000);
      });
  }
  ngAfterViewInit()  {
    this._script.loadScripts('app-roles',
      ['assets/app/js/dashboard.js']);

  }

}


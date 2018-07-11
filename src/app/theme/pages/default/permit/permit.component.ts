import {Component, OnInit, ViewEncapsulation, AfterViewInit} from '@angular/core';
import {ScriptLoaderService} from '../../../../_services/script-loader.service';
import {PermitService} from './_services';
import {BaseComponent} from '../base/base.component';
import {Router} from '@angular/router';
import {PermitHelper} from './_helpers/permit.helper';

@Component({
  selector: 'app-permit',
  templateUrl: 'template/permit.component.html',
  encapsulation: ViewEncapsulation.None,
})

export class PermitComponent extends BaseComponent implements AfterViewInit {
  public data: any [];

  constructor(private _script: ScriptLoaderService, private _permitService: PermitService, public _router: Router
  ) {
    super(_router);
    PermitHelper.selectedItem = {id:null};
  }

  ngOnInit() {
    this.block(true);
    this._permitService.getAll()
      .subscribe((data) => {
          setTimeout(() => {
            this.data = data.json().data;
            this.block(false);
          }, 2000);
        },
        error => {
          this.onError(error);
          this.block(false);
        }
      );
  }

  ngAfterViewInit() {
    this._script.loadScripts('app-permit',
      ['assets/app/js/dashboard.js']);
  }

  revision(row) {
    PermitHelper.selectedItem.id = row.id;
    this._router.navigate(['/revision/list', row.id]);
  }
}


import {Component, ViewEncapsulation, AfterViewInit, ViewChild} from '@angular/core';
import {ScriptLoaderService} from '../../../../_services/script-loader.service';
import {PermitTypeService} from '../permit/_services';
import {Response} from '@angular/http';
import {ActivatedRoute, Router} from '@angular/router';
import {BaseComponent} from '../base/base.component';
import {RevisionHelper} from './_helpers/revision.helper';
import {RevisionService} from './_services/revision.service';
import {init} from 'protractor/built/launcher';

declare let bootstrapSelectpicker: any;

@Component({
  selector: 'add-fees',
  templateUrl: './template/add.revision.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class AddRevisionComponent extends BaseComponent implements AfterViewInit {

  public revision: any = {};
  public listPermitType: any [];
  public listRevision: any [];
  public selectedPermitType: any = {};
  public isAdd: boolean = true;

  public idpermit;
  public idPermitRevision;
  public init = 0;

  constructor(private _script: ScriptLoaderService,
              public _router: Router,
              private _activatedRute: ActivatedRoute,
              private _permitTypeService: PermitTypeService,
              private _revisionSrv: RevisionService
  ) {
    super(_router);
    this.isAdd = _router.url.indexOf('/revision/edit') != 0;

    this._activatedRute.params.subscribe((params: any) => {
      if (params['id']) {
        this.idpermit = params['id'];
      }
      if (params['idPermitRevision']) {
        this.idPermitRevision = params['idPermitRevision'];
      }
    });
  }

  ngOnInit() {
    this.block(true);
    RevisionHelper.handleSubmit();

    this._permitTypeService.getByPermit(this.idpermit)
      .subscribe(
        (data: Response) => {
          let response = data.json();
          if (response.success) {
            this.listPermitType = response.data;

            //si estoy editando
            if (this.idPermitRevision) {
              this.block(true);
              this._revisionSrv.getPermitRevision(this.idPermitRevision)
                .subscribe(value => {
                  let response = value.json();
                  this.revision = response.data;
                  this.updateSelectType(response.data.permitType.id);
                  this.block(false, true);

                  this.onChangePermitType();
                }, error1 => {
                  this.onError(error1);
                  this.block(false, true);
                });
            } else {
              this.refreshSelect('type');
            }
          } else {
            this.onError(data);
          }
          this.block(false, true);
        },
        error => {
          this.onError(error);
          this.block(false, true);
        });
  }

  ngAfterViewInit() {
    bootstrapSelectpicker.initSelects('#type');
    bootstrapSelectpicker.initSelects('#revision');
  }

  onChangePermitType() {
    this.block(true);
    this._revisionSrv.getByPermitType(this.revision.permitType.id, this.idpermit)
      .subscribe((value: any) => {
        this.listRevision = value.json().data;

        //si estoy editando
        if (this.idPermitRevision && !this.init) {
          this.listRevision.push(this.revision.revision);
          this.updateSelectRevision(this.revision.revision.id);
          this.init = 1;
        }

        this.refreshSelect('revision');
        this.block(false, true);
      }, error1 => {
        this.block(false, true);
      });
  }

  submitFees() {
    console.log(this.revision);
    this.revision.idpermit = this.idpermit;
    this.block(true);
    if (this.isAdd) {
      this._revisionSrv.create(this.revision).subscribe(
        (data: Response) => {
          let response = data.json();
          if (response.success) {
            this.block(false, true);
            this.showInfo('The Revision has been created successfull');
            this._router.navigate(['/revision/list', this.idpermit]);
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
    } else {
      this._revisionSrv.update(this.idPermitRevision, this.revision)
        .subscribe((data: Response) => {
            let response = data.json();
            if (response.success) {
              this.block(false, true);
              this.showInfo('The Revision has been updated successfull');
              this._router.navigate(['/revision/list', this.idpermit]);
            } else {
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

  decline() {
    this._router.navigate(['/revision/list', this.idpermit]);
  }

  private updateSelectType(id) {
    for (let i = 0; i < this.listPermitType.length; i++) {
      if (this.listPermitType[i].id === id) {
        this.revision.permitType = this.listPermitType[i];
        this.refreshSelect('type');
        return;
      }
    }
    return null;
  }

  private updateSelectRevision(id) {
    for (let i = 0; i < this.listRevision.length; i++) {
      if (this.listRevision[i].id === id) {
        this.revision.revision = this.listRevision[i];
        this.refreshSelect('revision');
        return;
      }
    }
    return null;
  }

  private refreshSelect(id) {
    setTimeout(() => {
      bootstrapSelectpicker.refreshSelectpicker('#' + id);
    }, 1);
  }
}

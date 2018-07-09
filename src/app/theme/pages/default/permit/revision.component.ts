import {AfterViewInit, ChangeDetectorRef, Component, ViewEncapsulation} from '@angular/core';
import {ScriptLoaderService} from '../../../../_services/script-loader.service';
import {PermitTypeService} from '../permit/_services';
import {ActivatedRoute, Router} from '@angular/router';
import {BaseComponent} from '../base/base.component';
import {PermitHelper} from './_helpers/permit.helper';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {RevisionService} from './_services/revision.service';
import {isNull} from 'util';

@Component({
  selector: 'add-revision',
  templateUrl: './template/revision.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class RevisionComponent extends BaseComponent implements AfterViewInit {

  public invoiceForm: FormGroup;

  public idpermit: number;
  public revisions: any[];
  public listPermitType: any [];
  public todelete: any [];

  constructor(private _script: ScriptLoaderService,
              public _router: Router,
              private _fb: FormBuilder,
              private ref: ChangeDetectorRef,
              private _activatedRute: ActivatedRoute,
              private _permitTypeService: PermitTypeService,
              private _revisionService: RevisionService,
  ) {
    super(_router);

    this.listPermitType = [];
    this.revisions = [];
    this.todelete = [];

    this.idpermit = PermitHelper.selectedItem.id;
    if(!this.idpermit){
      this._router.navigate(['permit']);
    }
  }

  ngOnInit() {
    this.createForm();

    this.block(true);

    this._permitTypeService.getByPermit(this.idpermit)
      .subscribe(data => {
          let response = data.json();
          if (response.success) {
            this.listPermitType = response.data;

            this.block(true);
            this._revisionService.getByPermit(this.idpermit)
              .subscribe(data => {
                  let response = data.json();

                  if (response.success) {
                    if (response.data.length > 0) {
                      this.revisions = response.data;
                      this.loadDataEdit();
                    } else {
                      this.addRevision();
                    }
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

  ngAfterViewInit() {

  }

  loadDataEdit() {
    const control = <FormArray>this.invoiceForm.controls['itemRows'];
    this.revisions.map(value => {
      control.push(this._fb.group({
        // list all your form controls here, which belongs to your form array
        name: new FormControl(value.name, Validators.required),
        description: new FormControl(value.description, Validators.required),
      }));
    });

    this.listPermitType = this.listPermitType.filter(value => {
      return this.revisions.every(value1 => {
        return value1.permitType.id != value.id;
      })
    })
  }

  createForm() {
    this.invoiceForm = this._fb.group({
      itemRows: this._fb.array([])
    });
    this.invoiceForm.setControl('itemRows', this._fb.array([]));
  }

  addRevision(permiteType = null) {
    let permitT = isNull(permiteType) ? this.listPermitType[0] : permiteType;
    this.revisions.push(
      {
        permitType: permitT,
      }
    );

    const control = <FormArray>this.invoiceForm.controls['itemRows'];
    control.push(this.initItemRows());

    this.listPermitType = this.listPermitType.filter(value => {
      return value.id !== permitT.id;
    })
  }

  initItemRows() {
    return this._fb.group({
      // list all your form controls here, which belongs to your form array
      name: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
    });
  }

  deleteRevision(index: number) {
    if (this.revisions[index].id) {
      this.todelete.push(this.revisions[index].id);
    }

    this.listPermitType.push(this.revisions[index].permitType);

    this.revisions.splice(index, 1);
    // control refers to your formarray
    const control = <FormArray>this.invoiceForm.controls['itemRows'];
    control.removeAt(index);
  }


  getRevisions() {
    let array: any[] = [];
    const ctrl = <FormArray>this.invoiceForm.controls['itemRows'];
    // iterate each object in the form array
    ctrl.controls.forEach((x, index) => {
      array.push({
        permitType: this.revisions[index].permitType.id,
        id: this.revisions[index].id,
        name: x.get('name').value,
        description: x.get('description').value
      });
    });

    return array;
  }

  submitRevision() {
    this.block(true);

    this._revisionService.create(this.getRevisions(), this.idpermit, this.todelete)
      .subscribe(data => {
          let response = data.json();
          if (response.success) {
            this.showInfo('The revision has been created successfull');
            this._router.navigate(['permit']);
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

import {Component, OnInit, ViewEncapsulation, AfterViewInit, ViewChild, ElementRef} from '@angular/core';
import {ScriptLoaderService} from '../../../../_services/script-loader.service';
import {BaseComponent} from '../base/base.component';
import {ActivatedRoute, Router} from '@angular/router';
import {RevisionService} from './_services/revision.service';
import {Response} from '@angular/http';

@Component({
  selector: 'app-list-revision',
  templateUrl: 'template/listrevision.component.html',
  encapsulation: ViewEncapsulation.None,
})

export class ListrevisionComponent extends BaseComponent implements AfterViewInit {

  public listRevision: any [];
  public idPermit: number;

  @ViewChild('confirmModal')
  public confirmModal: ElementRef;

  constructor(private _script: ScriptLoaderService,
              private _revisionService: RevisionService,
              private _activatedRute: ActivatedRoute,
              public _router: Router
  ) {
    super(_router);

    this._activatedRute.params.subscribe((params: any) => {
      if (params['id']) {
        this.idPermit = params['id'];
        // this.servicePersona.get(params['id'])
        //   .subscribe(response => {
        //     this.persona = response.data;
        //   });
      }
    });
  }

  ngOnInit() {
    this.listAll();
  }

  addRevision() {
    this._router.navigate(['revision/add', this.idPermit]);
  }

  update(row) {
    this._router.navigate(['revision/edit/' + this.idPermit + '/' + row.id]);
  }

  confirmDelete(row) {
    this.confirmModal.nativeElement.setAttribute('data-id', row.id);
  }

  delete() {
    let id = this.confirmModal.nativeElement.getAttribute('data-id');
    this.confirmModal.nativeElement.click();
    this.block(true);
    this._revisionService.delete(id)
      .subscribe((data: any) => {
          let response = data.json();
          if (response.success) {
            this.showInfo('The Revision has been deleted successfull');
            this.listAll();
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

  listAll() {
    this.block(true);
    this._revisionService.getPermitRevisionByPermit(this.idPermit)
      .subscribe((data: any) => {
          let response = data.json();
          if (response.success) {
            this.listRevision = response.data;
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
    this._script.loadScripts('app-list-revision',
      ['assets/app/js/dashboard.js']);
  }
}


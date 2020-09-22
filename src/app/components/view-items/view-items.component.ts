import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {ConfirmationService, LazyLoadEvent, MessageService, PrimeNGConfig} from 'primeng/api';
import {ApirestService} from '../../services/apirest/apirest.service';
import {DataModel, Item} from '../../models/model';
import {DialogService} from 'primeng/dynamicdialog';
import {EditAddItemComponent} from '../edit-add-item/edit-add-item.component';
import {Table} from 'primeng/table';
import {HttpHeaders} from '@angular/common/http';


@Component({
  selector: 'app-view-items',
  templateUrl: './view-items.component.html',
  styleUrls: ['./view-items.component.scss']
})
export class ViewItemsComponent implements OnInit, AfterViewInit {

  @ViewChild('table', {static: false})
  private dataTable: Table;

  datasource: Item[] = [];

  customers: Item[] = [];

  totalRecords = 0;


  loading = false;

  checked = false;


  constructor(
    private apirestService: ApirestService,
    private primengConfig: PrimeNGConfig,
    public dialogService: DialogService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {
  }

  ngAfterViewInit(): void {
    this.getApiRest(this.checked);
  }

  ngOnInit(): void {
    this.primengConfig.ripple = true;
    this.loading = true;
  }

  getApiRest(val: boolean): void {
    let headers;
    if (val) {
      headers = new HttpHeaders({
        Accept: 'application/json',
      });
    } else {
      headers = new HttpHeaders({});
    }
    this.apirestService.getItems(headers).subscribe((data) => {
      const d = data as DataModel;
      if (data) {
        this.datasource = d.result.items;
        this.totalRecords = d.result?.items.length;
        this.dataTable.clear();
      }
    }, error => {
      this.showErrorheader();
    });
  }


  loadCustomers(event: LazyLoadEvent): void {
    this.loading = true;
    setTimeout(() => {
      if (this.datasource) {
        this.customers = this.datasource.slice(event.first, (event.first + event.rows));
        this.loading = false;
      }
    }, 1000);
  }

  editList(item: Item): void {
    let key;
    if (item) {
      key = this.datasource.indexOf(item);
    }
    const ref = this.dialogService.open(EditAddItemComponent, {
      header: item ? 'Editar item' : 'Añadir item',
      width: '70%',
      data: {
        item,
      }
    });

    ref.onClose.subscribe((result) => {
      if (result) {
        if (key !== undefined) {
          this.datasource[key] = result;
        } else {
          this.datasource.push(result);
        }
        this.totalRecords = this.datasource.length;
        this.dataTable.clear();
      }
    }, error => {
      console.log(error);
    });
  }

  private showErrorheader(): void {
    this.messageService.add(
      {
        severity: 'error',
        summary: 'Accept',
        detail: 'La petición no posee la cabecera'
      }
    );
    this.datasource = [];
    this.totalRecords = 0;
    this.dataTable.clear();
  }

  deleteItem(item: any): void {
    this.confirmationService.confirm({
      message: '¿Esta seguro de eliminar item?',
      accept: () => {
        this.datasource.splice(this.datasource.indexOf(item), 1);
        this.totalRecords = this.datasource.length;
        this.dataTable.clear();
      }
    });
  }
}

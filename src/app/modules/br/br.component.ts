import { animate, keyframes, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { BusinessRequestService } from 'src/app/services/business-request.service';
import { MessageService } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { AddEditBrComponent } from './add-edit-br/add-edit-br.component';
import { Table } from 'primeng/table';
import { FileExporterService } from 'src/app/services/file-exporter.service'

@Component({
  selector: 'app-br',
  templateUrl: './br.component.html',
  animations: [
    trigger('showHide', [
      state('true', style({
        height: 0,
        opacity: 0,
        marginTop: 0
      })),
      state('false', style({
        height: 'fit-content',
        opacity: 1,
        marginTop: 12
      })),
      transition('true => false', [
        animate('300ms ease-out', keyframes([
          style({ height: 'fit-content' }),
          style({ opacity: 1, marginTop: 12 })
        ]))
      ]),
      transition('false => true', [
        animate('300ms  ease-in', keyframes([
          style({ opacity: 0, height: '0', marginTop: 0 })
        ]))
      ]),
    ])
  ]
})
export class BrComponent implements OnInit {

  advancedSearch: any = {
    requestNumber: '',
    status: [],
    frameworkContract: [],
    dtRfReceived: new Date()
  };
  isCollapsed: any = {
    advancedSearch: false,
    list: true
  };
  frameworkContracts = [];
  listBR: any[] = [];
  selectedBR: any = {};
  tableOptions: any = {
    visibleCols: [],
    cols: [
      { id: 'requestNumber', label: 'Request Number' },
      { id: 'statusId', label: 'Status' },
    ],
    loading: false,
    exportLoading: false
  };

  constructor(
    private brService: BusinessRequestService,
    private toast: MessageService,
    private modalService: DialogService,
    private modalAddEdit: DynamicDialogRef,
    private fileExporter: FileExporterService) { }

  ngOnInit(): void {
    this.tableOptions.visibleCols = this.tableOptions.cols;
  }

  search(): void {
    this.isCollapsed.advancedSearch = true;
    this.isCollapsed.list = false;
    this.tableOptions.loading = true;
    this.brService.getAll().subscribe({
      next: res => {
        this.listBR = res;
        this.tableOptions.loading = false;
      },
      error: () => {
        this.toast.add({ severity: 'error', summary: 'Search error', detail: 'An error on the server' });
        this.tableOptions.loading = false;
        this.isCollapsed.advancedSearch = false;
      }
    })
  }

  addEdit(action: string): void {
    if(action == 'add'){
      this.modalAddEdit = this.modalService.open(AddEditBrComponent, {
        header: `Add Business Request`,
        width: '80%',
        height: '95%',
        data: {
          businessRequest: {}
        }
      });
      this.modalAddEdit.onClose.subscribe(res => {
        console.log(res);
      });
    }
    else if(this.selectedBR?.id){
      this.modalAddEdit = this.modalService.open(AddEditBrComponent, {
        header: `Edit Business Request`,
        width: '80%',
        height: '95%',
        data: {
          businessRequest: this.selectedBR
        }
      });
      this.modalAddEdit.onClose.subscribe(res => {
        console.log(res);
      });
    }
    else{
      this.toast.add({ severity:'warn', summary: 'No row selected', detail: 'You have to select a row.' })
    }
    
  }

  get globalFilterFields(): string[] {
    return this.tableOptions.visibleCols.map((col: any) => col.id);
  }

  onGlobalFilter(table: Table, event: Event): void {
    console.log(table);

    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }

  clearFilter(table: Table): void {
    table.clear();
  }

  exportExcel(): void {
    this.tableOptions.exportLoading = true;
    // let data = this.listBR.filter(br => br)
    setTimeout(()=>{
      this.fileExporter.exportExcel(this.listBR,'BusinessRequest').finally(()=> this.tableOptions.exportLoading = false);
    },50);
  }

}

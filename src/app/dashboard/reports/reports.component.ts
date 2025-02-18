import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { ToastrManager } from 'ng6-toastr-notifications';
import { ExcelGenService } from 'src/app/services/excelgeneration/excel-gen.service';
import { GenericService } from 'src/app/services/generic.service';
import { Toaster } from 'src/app/utilities/common';
import { LeadStatus } from '../leadlist/leads-status.model';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {
  public leadList: any = [];
  public searchText: any;
  public selectedText: any;
  public static currentToUpdateStatus: any;
  public toaster: Toaster;
  p: number = 1;

  filterForm: FormGroup;

  leadsControl = new FormControl();



  constructor(
    public excelService: ExcelGenService,
    public genericService: GenericService,
    public toastr: ToastrManager,
    public dialog: MatDialog,
    public activateRoute: ActivatedRoute,
    public fb: FormBuilder) {
    this.toaster = new Toaster(toastr);
  }


  areFiltersApplied: boolean = false;

  LeadsStatus = [];

  ngOnInit() {

    this.filterForm = this.fb.group({
      company_name: [null],
      customer_name: [null],
      technician_name: [null],
      status: [null],
      fromDate: [null],
      toDate: [null]
    })

    Object.keys(LeadStatus).map(m => {
      this.LeadsStatus.push({ status: m, value: LeadStatus[m] })
    })

  }

  // The function used to reset the form with all fields and errors 
  resetForm() {
    this.filterForm.reset();
  }

  getFilterResults() {
    let obj = this.filterForm.value;

    // get all complaints
    this.genericService.action("admin/get-report-filter", 'POST', obj).subscribe(
      RespData => {
        if (RespData.statusCode == 200) {
          let d = RespData.respData;
          d.sort((a, b) => (a.complaint_id < b.complaint_id) ? 1 : -1)

          this.leadList = d;

          console.log(this.leadList)
        } else {
          alert(RespData.statusMessage);
        }
      }
    );

  }

  generateReport() {

    this.excelService.generateExcel(this.leadList, this.filterForm.value)
    // let printContents = document.getElementById('lead-list-table').innerHTML;
    // let originalContents = document.body.innerHTML;

    // document.body.innerHTML = printContents;

    // window.print();

    // document.body.innerHTML = originalContents;


  }




}


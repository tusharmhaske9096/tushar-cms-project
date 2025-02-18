
import { Injectable } from '@angular/core';
import { Workbook } from 'exceljs';
import * as fs from 'file-saver';
import * as logoFile from './imagepath';


@Injectable({
  providedIn: 'root'
})
export class ExcelGenService {

  constructor() {
  }
  generateExcel(obj, requestedFilteres) {

    //Excel Title, Header, Data
    const title = 'Leads Report';

    const header = ["Sr. No.", "Customer Name", "Company Name", "Customer Mobile", "Customer Email", "Address", "Complaint Id", "Complaint Description", "Complaint Date", "Complaint Status", "Solution"];

    const data = obj;

    //Create workbook and worksheet
    let workbook = new Workbook();
    let worksheet = workbook.addWorksheet('Report', { views: [{ showGridLines: true }] });
    // worksheet.getColumn(1).width = 20;
    // worksheet.getColumn(2).width = 20;
    // worksheet.getColumn(3).width = 20;
    // worksheet.getColumn(4).width = 20;

    // // merge
    // for (let i = 1; i <= 3; i++)
    //   worksheet.mergeCells('A' + i + ':' + 'C' + i);


    // add image logo
    // let logo = workbook.addImage({
    //   base64: logoFile.logoImage,
    //   extension: 'png',
    // });
    // worksheet.addImage(logo,
    //   {
    //     tl: { col: 1, row: 0 },
    //     ext: { width: 100, height: 70 }
    //   });



    //Add Row and formatting
    // let titleRow = worksheet.addRow([title]);
    // titleRow.font = { name: 'Calibri', family: 4, size: 26, bold: true }
    // worksheet.addRow([]);


    // let row = worksheet.addRow(["Session Name", obj.sessionNm, "Session Duration", obj.sessionDuration]);
    // row.findCell(1).font = { bold: true }
    // row.findCell(3).font = { bold: true };
    // row.findCell(4).alignment = { vertical: "top", horizontal: "left" }

    // row = worksheet.addRow(["Start Time", this.transform(obj.sessionStartTs), "Completed Time", this.transform(obj.sessionCompeltedTs)]);
    // row.findCell(1).font = { bold: true }
    // row.findCell(3).font = { bold: true };

    // worksheet.addRow([]);

    // row = worksheet.addRow(["Trainer Name", obj.trainerName, "Contact Number", obj.trainerContact]);
    // row.findCell(1).font = { bold: true }
    // row.findCell(3).font = { bold: true };

    // row = worksheet.addRow(["Franchise Name", obj.franchiseName]);
    // row.findCell(1).font = { bold: true }
    // worksheet.mergeCells('B10:D10')

    // row = worksheet.addRow(["Slot Name", obj.slotName, "Batch Name", obj.batchName]);
    // row.findCell(1).font = { bold: true }
    // row.findCell(3).font = { bold: true };


    //Blank Row 
    // worksheet.addRow([]);

    //Add Header Row
    let headerRow = worksheet.addRow(header);

    // header background color
    headerRow.eachCell((cell, number) => {
      cell.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: '008b8b' }
      }
      cell.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
    })

    // header font color 
    for (let i = 1; i <= header.length; i++) {
      headerRow.getCell(i).font = { color: { argb: "ffffff" } };
      worksheet.getColumn(i+1).width = 30;
    }

    // adding all data
    let rowCell = null;
    data.forEach((element, i) => {
      rowCell = worksheet.addRow([]);
      rowCell.getCell(1).value = i + 1
      rowCell.getCell(2).value = element.customer_name

      if ((!!element.company_name) && element.company_name != '')
        rowCell.getCell(3).value = element.company_name
      else
        rowCell.getCell(3).value = "Not a company"

      rowCell.getCell(4).value = element.customer_mobile
      rowCell.getCell(5).value = element.customer_email
      rowCell.getCell(6).value = element.company_address
      rowCell.getCell(7).value = element.complaint_id
      rowCell.getCell(8).value = element.complaint_desc
      rowCell.getCell(9).value = element.complaint_date
      rowCell.getCell(10).value = element.status.Complaint_message

      if ((!!element.solution) && element.solution != '')
        rowCell.getCell(11).value = element.solution
      else
        rowCell.getCell(11).value = "No solution"


    });


    worksheet.addRow([]);


    //Footer Row
    // let footerRow = worksheet.addRow(['', 'Presents', presentCount]);
    // footerRow.getCell(2).fill = {
    //   type: 'pattern',
    //   pattern: 'solid',
    //   fgColor: { argb: 'FFCCFFE5' }
    // };
    // footerRow.getCell(3).fill = {
    //   type: 'pattern',
    //   pattern: 'solid',
    //   fgColor: { argb: 'FFCCFFE5' }
    // };
    // footerRow.findCell(1).font = { bold: true }
    // footerRow.getCell(1).border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }

    // footerRow = worksheet.addRow(['', 'Absents', absentCount]);
    // footerRow.getCell(2).fill = {
    //   type: 'pattern',
    //   pattern: 'solid',
    //   fgColor: { argb: 'fe9981' }
    // };
    // footerRow.getCell(3).fill = {
    //   type: 'pattern',
    //   pattern: 'solid',
    //   fgColor: { argb: 'fe9981' }
    // };
    // footerRow.findCell(1).font = { bold: true }

    // worksheet.addRow([]);
    // footerRow = worksheet.addRow(['', 'Total Attendance',  obj.totalStudentsAttended]);
    // footerRow.getCell(2).fill = {
    //   type: 'pattern',
    //   pattern: 'solid',
    //   fgColor: { argb: '091852' },
    // };
    // footerRow.font = { bold: true }
    // footerRow.getCell(3).fill = {
    //   type: 'pattern',
    //   pattern: 'solid',
    //   fgColor: { argb: '091852' }
    // };
    // footerRow.findCell(2).font = { bold: true ,color: { argb: "ffffff" }}
    // footerRow.findCell(3).font = { bold: true ,color: { argb: "ffffff" }}

    let footerRow = worksheet.addRow([]);
    header.forEach((e, i) => {
      footerRow.getCell(i + 1).fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'cccccc' },
      };
    })

    // footerRow.font = { bold: true }
    // footerRow.getCell(3).fill = {
    //   type: 'pattern',
    //   pattern: 'solid',
    //   fgColor: { argb: 'cccccc' }
    // };
    // footerRow.findCell(2).font = { bold: true, color: { argb: "000000" } }
    // footerRow.findCell(3).font = { bold: true, color: { argb: "000000" } }
    // footerRow.getCell(1).border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }


    // get current-date(yyyy-mm-dd)
    var d = new Date(), month = '' + (d.getMonth() + 1), day = '' + d.getDate(), year = d.getFullYear();
    if (month.length < 2)
      month = '0' + month;
    if (day.length < 2)
      day = '0' + day;

    workbook.xlsx.writeBuffer().then((finalWorkBook) => {
      let blob = new Blob([finalWorkBook], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      fs.saveAs(blob, 'Report-' + [year, month, day].join('-') + '.xlsx');
    })

  }



  transform(time: any): any {
    if (!!time) {
      var d = new Date(time),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

      if (month.length < 2)
        month = '0' + month;
      if (day.length < 2)
        day = '0' + day;

      var hours = d.getHours();
      var minutes: any = d.getMinutes();
      var ampm = hours >= 12 ? 'pm' : 'am';
      hours = hours % 12;
      hours = hours ? hours : 12; // the hour '0' should be '12'
      minutes = minutes < 10 ? '0' + minutes : minutes;
      var strTime = hours + ':' + minutes + ' ' + ampm;
      // return strTime;
      return `${day}-${month}-${year} ${strTime}`
    } else {
      return 'N/A';
    }
  }

}
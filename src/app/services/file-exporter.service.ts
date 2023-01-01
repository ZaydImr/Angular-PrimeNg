import { Injectable } from '@angular/core';
import { saveAs } from 'file-saver'

@Injectable({
  providedIn: 'root'
})
export class FileExporterService {

  constructor() { }

  async exportExcel(list: any[], fileName: string): Promise<boolean> {
    await import("xlsx").then(xlsx => {
      const worksheet = xlsx.utils.json_to_sheet(list);
      const workbook = { Sheets: { data: worksheet }, SheetNames: ["data"] };
      const excelBuffer: any = xlsx.write(workbook, { bookType: "xlsx", type: "array"});
      const data: Blob = new Blob([excelBuffer], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8" });
      saveAs( data, `${fileName}_export.xlsx`);
      return true;
    });
    return false;
  }
}

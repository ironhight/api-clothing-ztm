import { Injectable } from '@nestjs/common';
import * as XLSX from 'xlsx';

@Injectable()
export class ImportService {
    importDataFromExcel(filePath: string, model: any) {
        const workBook = XLSX.readFile(filePath, { type: 'binary' });
        workBook.SheetNames.forEach((sheet) => {
            const data = XLSX.utils.sheet_to_json(workBook.Sheets[sheet]);
            for (const value of data) {
                new model(value).save();
            }
        });
        return;
    }

    async readFileExcel(filePath) {
        const workBook = XLSX.readFile(filePath, { type: 'binary' });
        const sheetConent = [];
        await workBook.SheetNames.forEach((sheet) => {
            const data = XLSX.utils.sheet_to_json(workBook.Sheets[sheet]);
            sheetConent[sheet] = data;
        });
        return sheetConent;
    }
}

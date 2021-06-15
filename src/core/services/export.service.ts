import { Injectable } from '@nestjs/common';
import { CoreResponse } from '@core/interfaces/coreResponse.interface';
import { Response } from 'express';
const moment = require('moment');
const XLSX = require('xlsx');
@Injectable()
export class ExportService {
    toExcel(response: Response, result: CoreResponse, respStatusCode: number): any {
        const excelData = typeof result.excel.data['docs'] !== 'undefined' && typeof result.excel.data['hasNextPage'] !== 'undefined' && typeof result.excel.data['hasPrevPage'] !== 'undefined' ? result.excel.data['docs'] : result.excel.data;
        const dataSize = excelData ? Object.keys(excelData[0]).length : 0;
        const wb = XLSX.utils.book_new();
        let ws;

        // Append headers & data
        if (result.excel.customHeaders) {
            ws = XLSX.utils.sheet_add_aoa(wb, [result.excel.customHeaders]);
            XLSX.utils.sheet_add_json(ws, excelData, { origin: 'A2', skipHeader: true });
        } else {
            ws = XLSX.utils.json_to_sheet(excelData);
        }

        // Auto filter
        ws['!autofilter'] = { ref: `A1:${this.getExcelColumn(dataSize)}1` };
        // Auto fit
        this.autoFitColumns(excelData, ws, result.excel.customHeaders);

        // Append data to sheet
        XLSX.utils.book_append_sheet(wb, ws, 'Sheet 1');

        /* generate buffer */
        const buf = XLSX.write(wb, { type: 'buffer', bookType: 'xlsx' });
        response.header('Content-Disposition', `attachment; filename=${result.excel.name} (${moment().format('DD-MM-YYYY')}).xlsx`);
        response.header('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        response.status(respStatusCode).send(buf);
    }

    toExcelBuffer(result: CoreResponse): any {
        const excelData = typeof result.excel.data['docs'] !== 'undefined' && typeof result.excel.data['hasNextPage'] !== 'undefined' && typeof result.excel.data['hasPrevPage'] !== 'undefined' ? result.excel.data['docs'] : result.excel.data;
        const dataSize = excelData ? Object.keys(excelData[0]).length : 0;
        const wb = XLSX.utils.book_new();
        let ws;

        // Append headers & data
        if (result.excel.customHeaders) {
            ws = XLSX.utils.sheet_add_aoa(wb, [result.excel.customHeaders]);
            XLSX.utils.sheet_add_json(ws, excelData, { origin: 'A2', skipHeader: true });
        } else {
            ws = XLSX.utils.json_to_sheet(excelData);
        }

        // Auto filter
        ws['!autofilter'] = { ref: `A1:${this.getExcelColumn(dataSize)}1` };
        // Auto fit
        this.autoFitColumns(excelData, ws, result.excel.customHeaders);

        // Append data to sheet
        XLSX.utils.book_append_sheet(wb, ws, 'Sheet 1');

        /* generate buffer */
        const buf = XLSX.write(wb, { type: 'buffer', bookType: 'xlsx' });
       
        return buf;
    }

    toPdf(response: Response, result: CoreResponse, respStatusCode: number) {
          response.header('Content-Disposition', `attachment; filename=Invoice-payment-(${moment(new Date()).format('DD-MM-YYYY')}).pdf`)
          response.header( 'Content-Type', 'application/pdf')
          response.status(respStatusCode).send(result.data);
    }

    // This function can be bad performance if the excel data is big
    private autoFitColumns(json: any[], worksheet: any, header?: string[]): void {
        const jsonKeys = header ? header : Object.keys(json[0]);
        const objectMaxLength = [];

        for (let i = 0; i < json.length; i++) {
            const value = json[i];
            for (let j = 0; j < jsonKeys.length; j++) {
                if (typeof value[jsonKeys[j]] == 'number') {
                    objectMaxLength[j] = 10;
                } else {
                    const l = value[jsonKeys[j]] ? value[jsonKeys[j]].length : 0;
                    objectMaxLength[j] = objectMaxLength[j] >= l ? objectMaxLength[j] : l;
                }
            }

            const key = jsonKeys;
            for (let j = 0; j < key.length; j++) {
                objectMaxLength[j] = objectMaxLength[j] >= key[j].length ? objectMaxLength[j] : key[j].length;
            }
        }

        worksheet['!cols'] = objectMaxLength.map(w => {
            return { width: w };
        });
    }

    private getExcelColumn(index: number): string {
        let colName = '',
            dividend = Math.floor(Math.abs(index)),
            rest;

        while (dividend > 0) {
            rest = (dividend - 1) % 26;
            colName = String.fromCharCode(65 + rest) + colName;
            dividend = parseInt(String((dividend - rest) / 26));
        }
        return colName;
    }
}

import { Injectable } from '@nestjs/common';
import * as PDFGenerator from 'pdfkit';
import { removeAccents } from '../helpers/text';

@Injectable()
export class InvoiceGeneratorService {

    constructor() {}

    generateHeaders(doc, data) {
        const billingAddress = data.customer;

        doc.fillColor('#000')
            .fontSize(20)
            .text('INVOICE', 275, 50, { align: 'right' })
            .fontSize(10)
            .text(`Invoice Number: ${data.orderId}`, { align: 'right' })
            .text(`Due: ${data.createdAt}`, { align: 'right' })
            .text(`Balance Due: ${data.total} VND`, { align: 'right' })
            .moveDown()
            .text(`Billing Address:\n ${billingAddress.name}\n${billingAddress.phone}\n${data.shippingAddress.line1}\n${data.shippingAddress.city}, ${data.shippingAddress.country_code}`, { align: 'right' });

        const beginningOfPage = 50;
        const endOfPage = 550;

        doc.moveTo(beginningOfPage, 200)
            .lineTo(endOfPage, 200)
            .stroke();

        doc.text(`Memo: ${data.memo || 'N/A'}`, 50, 210);

        doc.moveTo(beginningOfPage, 250)
            .lineTo(endOfPage, 250)
            .stroke();
    }

    generateTable(doc, data) {
        const tableTop = 270;
        const itemCodeX = 50;
        const titleX = 100;
        const quantityX = 250;
        const priceX = 300;
        const amountX = 350;

        doc.fontSize(10)
            .text('Item ID', itemCodeX, tableTop, { bold: true })
            .text('English Title', titleX, tableTop)
            .text('Quantity', quantityX, tableTop)
            .text('Price', priceX, tableTop)
            .text('Total', amountX, tableTop);

        const item = data.package;
        let i = 0;

        const y = tableTop + 25;

        doc.fontSize(10)
            .text(item.id, itemCodeX, y)
            .text(removeAccents(item.translations[1].title), titleX, y)
            .text(data.amount, quantityX, y)
            .text(`${item.priceDisplay}`, priceX, y)
            .text(`${data.total} VND`, amountX, y);
    }

    generateFooter(doc) {
        doc.fontSize(10).text(`Payment due upon receipt. `, 50, 700, {
            align: 'center',
        });
    }

    async generate(data) {
        const pdfBuffer: Buffer = await new Promise(resolve => {
            const theOutput = new PDFGenerator({ size: 'LETTER', bufferPages: true });

            this.generateHeaders(theOutput, data);

            theOutput.moveDown();

            this.generateTable(theOutput, data);

            this.generateFooter(theOutput);

            theOutput.end();

            const buffer = [];
            theOutput.on('data', buffer.push.bind(buffer));
            theOutput.on('end', () => {
                const data = Buffer.concat(buffer);
                resolve(data);
            });
        });
        return pdfBuffer;
    }
};

import { Injectable } from '@nestjs/common';
import { Transaction } from 'src/transaction/transaction.entity';
import * as PDFDocument from 'pdfkit';
import { TransactionService } from 'src/transaction/transaction.service';
import { CustomerService } from 'src/customer/customer.service';
import { MailerService } from 'src/mailer/mailer.service';

@Injectable()
export class ReportService {

constructor(private transactionService: TransactionService,private customerService : CustomerService,private mailService : MailerService){}
async generateTransactionReport(transactions: Transaction[], res: any): Promise<void> {
    const doc = new PDFDocument({ margin: 30 });
    const fileName = 'transaction-report.pdf';

    // Pipe the PDF into a response
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename=${fileName}`);
    doc.pipe(res);

    // Add Header
    doc.fontSize(20).text('Transaction Report', { align: 'center' });
    doc.moveDown();

    // Add Table Header
    const headerColumns = ['ID', 'Type', 'Amount', 'Description', 'Date'];
    const columnWidths = [40, 100, 100, 150, 100];
    let y = doc.y;

    doc.fontSize(12).font('Helvetica-Bold');
    headerColumns.forEach((header, i) => {
        doc.text(header, 30 + columnWidths.slice(0, i).reduce((a, b) => a + b, 0), y, {
            width: columnWidths[i],
            align: 'left',
        });
    });
    doc.moveDown();

    // Add Transactions Table
    doc.fontSize(10).font('Helvetica');
    y = doc.y;
    transactions.forEach((transaction) => {
        const rowData = [
            transaction.id.toString(),
            transaction.type,
            transaction.amount.toString(),
            transaction.description || 'N/A',
            new Date(transaction.createdAt).toLocaleDateString(),
        ];

        rowData.forEach((data, i) => {
            doc.text(data, 30 + columnWidths.slice(0, i).reduce((a, b) => a + b, 0), y, {
                width: columnWidths[i],
                align: 'left',
            });
        });

        y += 15;

        // Check if the page is about to end and add a new page if necessary
        if (y > doc.page.height - 50) {
            doc.addPage();
            y = 30;
        }
    });

    // Add Footer
    doc.fontSize(10).text(`Generated on: ${new Date().toLocaleString()}`, 30, doc.page.height - 30, {
        align: 'center',
    });

    // Finalize the PDF
    doc.end();
}


async sendTransactionReport(res: any,accountNumber:string): Promise<void> {
    const transactions = await this.transactionService.getTransactionsByAccountNumber(accountNumber);
    const user = await this.customerService.getCustomerByAccountNumber(accountNumber);
    const email = user.email;
    console.log("Mail is sending to = " , email);

    await this.generateTransactionReport(transactions, res);
    await this.mailService.sendTransactionReceipt({
        recipient: email,
        subject: 'Transaction Report',
        text: 'Please find the attached transaction report',
        html: 'Please find the attached transaction report',
        attachment: res,
    });
    return res;



}
}
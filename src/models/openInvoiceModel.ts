export default interface OpenInvoiceModel {
  id: number;
  invoiceNumber: string;
  customer: string;
  balance: number;
  dueDate: Date;
  aging: number;
  currentBalance: number;
  balanceDueUpTo30Days: number;
  balanceDueBetween31And60Days: number;
  balanceDueBetween61And90Days: number;
  balanceDueOver91Days: number;
}

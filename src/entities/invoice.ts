export default interface Invoice {
  id: number;
  invoiceDate: Date;
  invoiceNumber: string;
  purchaseOrderNumber: string;
  discount: string;
  shippingAmount: number;
  invoicedAmount: number;
  paymentTerm: string;
  dueDate: Date;
  paymentStatus: string;
}

export default interface CreateInvoiceModel {
  invoiceDate: Date;
  invoiceNumber: string;
  purchaseOrderNumber: string;
  discountId: number;
  shippingAmount: number;
  paymentTermId: number;
  dueDate: Date;
  paymentStatusId: number;
}

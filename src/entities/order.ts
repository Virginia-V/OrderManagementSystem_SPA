export default interface Order {
  id: number;
  orderedAt: Date;
  purchaseOrderNumber: string;
  customer: string;
  totalOrderedAmount: number;
  orderType: string;
}

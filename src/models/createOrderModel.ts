import OrderedProductModel from "./orderedProductModel";

export default interface CreateOrderModel {
  orderedAt: Date;
  purchaseOrderNumber: string;
  customerId: number;
  orderTypeId: number;
  orderedProducts: OrderedProductModel[];
}

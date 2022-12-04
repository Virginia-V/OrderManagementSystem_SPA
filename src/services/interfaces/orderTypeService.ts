import OrderType from "../../entities/orderType";

export default interface OrderTypeService {
  get(): Promise<OrderType[]>;
}

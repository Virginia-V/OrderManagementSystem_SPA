import Order from "../../entities/order";
import CreateOrderModel from "../../models/createOrderModel";
import PagedRequestModel from "../../models/pagedRequestModels/pagedRequestModel";
import PaginatedResultModel from "../../models/pagedRequestModels/paginatedResultModel";
import SalesByProductCategoryModel from "../../models/salesByProductCategoryModel";

export default interface OrderService {
  get(): Promise<Order[]>;
  getPagedOrders(model: PagedRequestModel): Promise<PaginatedResultModel<Order>>;
  getTodayOrders(): Promise<Order[]>;
  getSalesByProductCategory(): Promise<SalesByProductCategoryModel[]>;
  getById(orderId: number): Promise<Order>;
  delete(orderId: number): Promise<unknown>;
  post(model: CreateOrderModel): Promise<unknown>;
}

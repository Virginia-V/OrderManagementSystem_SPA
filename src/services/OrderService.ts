import Order from "../entities/order";
import CreateOrderModel from "../models/createOrderModel";
import PagedRequestModel from "../models/pagedRequestModels/pagedRequestModel";
import PaginatedResultModel from "../models/pagedRequestModels/paginatedResultModel";
import SalesByProductCategoryModel from "../models/salesByProductCategoryModel";
import http from "./http";
import OrderService from "./interfaces/orderService";

const baseUrl = "orders";

function get(): Promise<Order[]> {
  return http.get(`${baseUrl}`);
}

function getPagedOrders(
  model: PagedRequestModel
): Promise<PaginatedResultModel<Order>> {
  return http.post(`${baseUrl}/paginated-search`, model);
}

function getById(orderId: number): Promise<Order> {
  return http.get(`${baseUrl}/${orderId}`);
}

function getTodayOrders(): Promise<Order[]> {
  return http.get(`${baseUrl}/todayOrders`);
}

function getSalesByProductCategory(): Promise<SalesByProductCategoryModel[]> {
  return http.get(`${baseUrl}/salesByCategory`);
}

function remove(orderId: number): Promise<unknown> {
  return http._delete(`${baseUrl}/${orderId}`);
}

function post(model: CreateOrderModel): Promise<unknown> {
  return http.post(`${baseUrl}`, model);
}

const orderService: OrderService = {
  get,
  getById,
  getPagedOrders,
  getTodayOrders,
  getSalesByProductCategory,
  post,
  delete: remove,
};

export default orderService;

import Customer from "../entities/customer";
import CreateCustomerModel from "../models/createCustomerModel";
import PagedRequestModel from "../models/pagedRequestModels/pagedRequestModel";
import PaginatedResultModel from "../models/pagedRequestModels/paginatedResultModel";
import UpdateCustomerModel from "../models/updateCustomerModel";
import http from "./http";
import CustomerService from "./interfaces/customerService";

const baseUrl = "customers";

function get(): Promise<Customer[]> {
  return http.get(`${baseUrl}`);
}

function getPagedCustomers(
  model: PagedRequestModel
): Promise<PaginatedResultModel<Customer>> {
  return http.post(`${baseUrl}/paginated-search`, model);
}

function getNewCustomers(): Promise<Customer[]> {
  return http.get(`${baseUrl}/newCustomers`);
}

function getById(customerId: number): Promise<UpdateCustomerModel> {
  return http.get(`${baseUrl}/${customerId}`);
}

function remove(customerId: number): Promise<unknown> {
  return http._delete(`${baseUrl}/${customerId}`);
}

function patch(
  customerId: number,
  model: UpdateCustomerModel
): Promise<unknown> {
  return http.patch(`${baseUrl}/${customerId}`, model);
}

function post(model: CreateCustomerModel): Promise<unknown> {
  return http.post(`${baseUrl}`, model);
}

const customerService: CustomerService = {
  get,
  getPagedCustomers,
  getNewCustomers,
  getById,
  post,
  patch,
  delete: remove,
};

export default customerService;

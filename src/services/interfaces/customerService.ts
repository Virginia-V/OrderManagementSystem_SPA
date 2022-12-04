import Customer from "../../entities/customer";
import CreateCustomerModel from "../../models/createCustomerModel";
import PagedRequestModel from "../../models/pagedRequestModels/pagedRequestModel";
import PaginatedResultModel from "../../models/pagedRequestModels/paginatedResultModel";
import UpdateCustomerModel from "../../models/updateCustomerModel";

export default interface CustomerService {
  get(): Promise<Customer[]>;
  getPagedCustomers(
    model: PagedRequestModel
  ): Promise<PaginatedResultModel<Customer>>;
  getNewCustomers(): Promise<Customer[]>;
  getById(customerId: number): Promise<UpdateCustomerModel>;
  delete(customerId: number): Promise<unknown>;
  post(model: CreateCustomerModel): Promise<unknown>;
  patch(customerId: number, model: UpdateCustomerModel): Promise<unknown>;
}

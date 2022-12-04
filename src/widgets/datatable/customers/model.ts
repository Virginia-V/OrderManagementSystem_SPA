import Customer from "../../../entities/customer";
import PagedRequestModel from "../../../models/pagedRequestModels/pagedRequestModel";
import PaginatedResultModel from "../../../models/pagedRequestModels/paginatedResultModel";
import customerService from "../../../services/CustomerService";
import apiRequest from "../../../shared/apiRequest";
import Model from "../model";

const customersModel: Model = {
  provide: async (pagedRequestModel: PagedRequestModel) => {
    let paginatedResult = {} as PaginatedResultModel<Customer>;
    await apiRequest.execute(
      () => customerService.getPagedCustomers(pagedRequestModel),
      (result) => {
        paginatedResult = result;
      }
    );
    return paginatedResult;
  },
};
export default customersModel;

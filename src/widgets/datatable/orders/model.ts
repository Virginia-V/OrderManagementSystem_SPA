import Order from "../../../entities/order";
import PagedRequestModel from "../../../models/pagedRequestModels/pagedRequestModel";
import PaginatedResultModel from "../../../models/pagedRequestModels/paginatedResultModel";
import orderService from "../../../services/OrderService";
import apiRequest from "../../../shared/apiRequest";
import Model from "../model";

const ordersModel: Model = {
  provide: async (pagedRequestModel: PagedRequestModel) => {
    let paginatedResult = {} as PaginatedResultModel<Order>;
    await apiRequest.execute(
      () => orderService.getPagedOrders(pagedRequestModel),
      (result) => {
        paginatedResult = result;
      }
    );
    return paginatedResult;
  },
};
export default ordersModel;

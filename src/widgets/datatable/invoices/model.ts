import Invoice from "../../../entities/invoice";
import PagedRequestModel from "../../../models/pagedRequestModels/pagedRequestModel";
import PaginatedResultModel from "../../../models/pagedRequestModels/paginatedResultModel";
import invoiceService from "../../../services/InvoiceService";
import apiRequest from "../../../shared/apiRequest";
import Model from "../model";

const invoicesModel: Model = {
  provide: async (pagedRequestModel: PagedRequestModel) => {
    let paginatedResult = {} as PaginatedResultModel<Invoice>;
    await apiRequest.execute(
      () => invoiceService.getPagedInvoices(pagedRequestModel),
      (result) => {
        paginatedResult = result;
      }
    );
    return paginatedResult;
  },
};
export default invoicesModel;

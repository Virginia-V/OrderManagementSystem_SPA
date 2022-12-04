import apiRequest from "../../../shared/apiRequest";
import Model from "../model";
import OpenInvoiceModel from "../../../models/openInvoiceModel";
import invoiceService from "../../../services/InvoiceService";

const overdueInvoicesModel: Model = {
  provide: async () => {
    let data: OpenInvoiceModel[] = [];
    await apiRequest.execute(
      () => invoiceService.getOverdueInvoices(),
      (result) => {
        data = result;
      }
    );
    return data;
  },
};
export default overdueInvoicesModel;

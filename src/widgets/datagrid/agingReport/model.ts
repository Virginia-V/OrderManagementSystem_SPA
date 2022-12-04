import OpenInvoiceModel from "../../../models/openInvoiceModel";
import invoiceService from "../../../services/InvoiceService";
import apiRequest from "../../../shared/apiRequest";
import Model from "../model";

const agingReportModel: Model = {
  provide: async () => {
    let data: OpenInvoiceModel[] = [];
    await apiRequest.execute(
      () => invoiceService.getOpenInvoices(),
      (result) => {
        data = result;
      }
    );
    return data;
  },
};
export default agingReportModel;

import invoiceService from "../../../services/InvoiceService";
import apiRequest from "../../../shared/apiRequest";
import Model from "../model";

const invoicesModel: Model = {
  provideCounter: async () => {
    let count = "";
    await apiRequest.execute(
      () => invoiceService.getOpenInvoices(),
      (result) => {
        count += result
          .map((i) => i.balance)
          .reduce(
            (previousValue, currentValue) => previousValue + currentValue,
            0
          )
          .toLocaleString("en-US", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          });
      }
    );
    return count;
  },
};
export default invoicesModel;

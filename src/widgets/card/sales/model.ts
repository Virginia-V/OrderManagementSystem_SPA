import orderService from "../../../services/OrderService";
import apiRequest from "../../../shared/apiRequest";
import Model from "../model";

const salesModel: Model = {
  provideCounter: async () => {
    let count = "";
    await apiRequest.execute(
      () => orderService.get(),
      (result) => {
        count += result
          .map((o) => o.totalOrderedAmount)
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
export default salesModel;

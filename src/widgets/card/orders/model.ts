import orderService from "../../../services/OrderService";
import apiRequest from "../../../shared/apiRequest";
import Model from "../model";

const ordersModel: Model = {
  provideCounter: async () => {
    let count = 0;
    await apiRequest.execute(
      () => orderService.get(),
      (result) => {
        count = result.length;
      }
    );
    return count.toString();
  },
};
export default ordersModel;

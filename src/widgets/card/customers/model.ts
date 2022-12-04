import customerService from "../../../services/CustomerService";
import apiRequest from "../../../shared/apiRequest";
import Model from "../model";

const customersModel: Model = {
  provideCounter: async () => {
    let count = 0;
    await apiRequest.execute(
      () => customerService.getNewCustomers(),
      (result) => {
        count = result.length;
      }
    );
    return count.toString();
  },
};
export default customersModel;

import productService from "../../../services/ProductService";
import apiRequest from "../../../shared/apiRequest";
import Model from "../model";

const productsModel: Model = {
  provideCounter: async () => {
    let count = 0;
    await apiRequest.execute(
      () => productService.get(),
      (result) => {
        count = result.length;
      }
    );
    return count.toString();
  },
};
export default productsModel;

import ProductQuantityModel from "../../../models/productQuantityModel";
import productService from "../../../services/ProductService";
import apiRequest from "../../../shared/apiRequest";
import Model from "../model";

const topProductsModel: Model = {
  provide: async () => {
    let data: ProductQuantityModel[] = [];
    await apiRequest.execute(
      () => productService.getTopFiveSellingProducts(),
      (result) => {
        data = result;
      }
    );
    return data;
  },
};
export default topProductsModel;

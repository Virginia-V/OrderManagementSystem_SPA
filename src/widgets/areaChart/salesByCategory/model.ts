import SalesByProductCategoryModel from "../../../models/salesByProductCategoryModel";
import orderService from "../../../services/OrderService";
import apiRequest from "../../../shared/apiRequest";
import Model from "../model";

const salesByCategoryModel: Model = {
  provide: async () => {
    let data: SalesByProductCategoryModel[] = [];
    await apiRequest.execute(
      () => orderService.getSalesByProductCategory(),
      (result) => {
        data = result;
      }
    );
    return data;
  },
};
export default salesByCategoryModel;

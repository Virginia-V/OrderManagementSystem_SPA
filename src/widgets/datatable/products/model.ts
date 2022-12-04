import Product from "../../../entities/product";
import PagedRequestModel from "../../../models/pagedRequestModels/pagedRequestModel";
import PaginatedResultModel from "../../../models/pagedRequestModels/paginatedResultModel";
import productService from "../../../services/ProductService";
import apiRequest from "../../../shared/apiRequest";
import Model from "../model";

const productsModel: Model = {
  provide: async (pagedRequestModel: PagedRequestModel) => {
    let paginatedResult = {} as PaginatedResultModel<Product>;
    await apiRequest.execute(
      () => productService.getPagedProducts(pagedRequestModel),
      (result) => {
        paginatedResult = result;
      }
    );
    return paginatedResult;
  
  },
};
export default productsModel;

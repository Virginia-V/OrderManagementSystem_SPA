import Product from "../../entities/product";
import CreateProductModel from "../../models/createProductModel";
import PagedRequestModel from "../../models/pagedRequestModels/pagedRequestModel";
import PaginatedResultModel from "../../models/pagedRequestModels/paginatedResultModel";
import ProductQuantityModel from "../../models/productQuantityModel";
import UpdateProductModel from "../../models/updateProductModel";

export default interface ProductService {
  get(): Promise<Product[]>;
  getPagedProducts(
    model: PagedRequestModel
  ): Promise<PaginatedResultModel<Product>>;
  getTopFiveSellingProducts(): Promise<ProductQuantityModel[]>;
  getById(productId: number): Promise<UpdateProductModel>;
  delete(productId: number): Promise<unknown>;
  post(model: CreateProductModel): Promise<unknown>;
  patch(productId: number, model: UpdateProductModel): Promise<unknown>;
}

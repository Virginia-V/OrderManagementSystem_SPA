import Product from "../entities/product";
import CreateProductModel from "../models/createProductModel";
import PagedRequestModel from "../models/pagedRequestModels/pagedRequestModel";
import PaginatedResultModel from "../models/pagedRequestModels/paginatedResultModel";
import ProductQuantityModel from "../models/productQuantityModel";
import UpdateProductModel from "../models/updateProductModel";
import http from "./http";
import ProductService from "./interfaces/productService";

const baseUrl = "products";

function get(): Promise<Product[]> {
  return http.get(`${baseUrl}`);
}

function getTopFiveSellingProducts(): Promise<ProductQuantityModel[]> {
  return http.get(`${baseUrl}/topProducts`);
}

function getPagedProducts(
  model: PagedRequestModel
): Promise<PaginatedResultModel<Product>> {
  return http.post(`${baseUrl}/paginated-search`, model);
}

function getById(productId: number): Promise<UpdateProductModel> {
  return http.get(`${baseUrl}/${productId}`);
}

function remove(productId: number): Promise<unknown> {
  return http._delete(`${baseUrl}/${productId}`);
}

function patch(productId: number, model: UpdateProductModel): Promise<unknown> {
  return http.patch(`${baseUrl}/${productId}`, model);
}

function post(model: CreateProductModel): Promise<unknown> {
  return http.post(`${baseUrl}`, model);
}

const productService: ProductService = {
  get,
  getTopFiveSellingProducts,
  getPagedProducts,
  getById,
  post,
  patch,
  delete: remove,
};

export default productService;

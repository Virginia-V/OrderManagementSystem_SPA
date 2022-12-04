import Category from "../entities/category";
import http from "./http";
import CategoryService from "./interfaces/categoryService";

const baseUrl = "categories";

function get(): Promise<Category[]> {
  return http.get(`${baseUrl}`);
}

const categoryService: CategoryService = {
  get,
};

export default categoryService;

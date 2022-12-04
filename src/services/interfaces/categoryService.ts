import Category from "../../entities/category";

export default interface CategoryService {
  get(): Promise<Category[]>;
}

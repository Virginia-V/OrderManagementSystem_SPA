import Discount from "../../entities/discount";

export default interface DiscountService {
  get(): Promise<Discount[]>;
}

import Discount from "../entities/discount";
import http from "./http";
import DiscountService from "./interfaces/discountService";

const baseUrl = "discounts";

function get(): Promise<Discount[]> {
  return http.get(`${baseUrl}`);
}

const discountService: DiscountService = {
  get,
};

export default discountService;

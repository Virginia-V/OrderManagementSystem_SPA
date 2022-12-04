import OrderType from "../entities/orderType";
import http from "./http";
import OrderTypeService from "./interfaces/orderTypeService";

const baseUrl = "orderTypes";

function get(): Promise<OrderType[]> {
  return http.get(`${baseUrl}`);
}

const orderTypeService: OrderTypeService = {
  get,
};

export default orderTypeService;

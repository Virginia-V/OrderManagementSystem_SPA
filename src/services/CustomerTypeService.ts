import CustomerType from "../entities/customerType";
import http from "./http";
import CustomerTypeService from "./interfaces/customerTypeService";

const baseUrl = "customerTypes";

function get(): Promise<CustomerType[]> {
  return http.get(`${baseUrl}`);
}

const customerTypeService: CustomerTypeService = {
  get,
};

export default customerTypeService;

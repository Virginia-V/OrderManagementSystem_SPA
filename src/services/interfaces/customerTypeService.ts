import CustomerType from "../../entities/customerType";

export default interface CustomerTypeService {
  get(): Promise<CustomerType[]>;
}

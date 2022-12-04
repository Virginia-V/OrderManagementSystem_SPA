export default interface CreateCustomerModel {
  firstName: string;
  lastName: string;
  companyName: string;
  customerTypeId: number;
  billingAddress: string;
  shippingAddress: string;
  email: string;
}

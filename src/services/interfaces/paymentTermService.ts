import PaymentTerm from "../../entities/paymentTerm";

export default interface PaymentTermService {
  get(): Promise<PaymentTerm[]>;
}

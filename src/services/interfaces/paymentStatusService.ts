import PaymentStatus from "../../entities/paymentStatus";

export default interface PaymentStatusService {
  get(): Promise<PaymentStatus[]>;
}

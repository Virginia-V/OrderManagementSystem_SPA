import PaymentStatus from "../entities/paymentStatus";
import http from "./http";
import PaymentStatusService from "./interfaces/paymentStatusService";

const baseUrl = "paymentStatuses";

function get(): Promise<PaymentStatus[]> {
  return http.get(`${baseUrl}`);
}

const paymentStatusService: PaymentStatusService = {
  get,
};

export default paymentStatusService;

import PaymentTerm from "../entities/paymentTerm";
import http from "./http";
import PaymentTermService from "./interfaces/paymentTermService";

const baseUrl = "paymentTerms";

function get(): Promise<PaymentTerm[]> {
  return http.get(`${baseUrl}`);
}

const paymentTermService: PaymentTermService = {
  get,
};

export default paymentTermService;

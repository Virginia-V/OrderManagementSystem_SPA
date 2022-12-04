import Invoice from "../entities/invoice";
import CreateInvoiceModel from "../models/createInvoiceModel";
import OpenInvoiceModel from "../models/openInvoiceModel";
import PagedRequestModel from "../models/pagedRequestModels/pagedRequestModel";
import PaginatedResultModel from "../models/pagedRequestModels/paginatedResultModel";
import http from "./http";
import InvoiceService from "./interfaces/invoiceService";

const baseUrl = "invoices";

function get(): Promise<Invoice[]> {
  return http.get(`${baseUrl}`);
}

function getPagedInvoices(
  model: PagedRequestModel
): Promise<PaginatedResultModel<Invoice>> {
  return http.post(`${baseUrl}/paginated-search`, model);
}

function getOpenInvoices(): Promise<OpenInvoiceModel[]> {
  return http.get(`${baseUrl}/openInvoices`);
}

function getOverdueInvoices(): Promise<OpenInvoiceModel[]> {
  return http.get(`${baseUrl}/overdueInvoices`);
}

function getById(invoiceId: number): Promise<Invoice> {
  return http.get(`${baseUrl}/${invoiceId}`);
}

function remove(invoiceId: number): Promise<unknown> {
  return http._delete(`${baseUrl}/${invoiceId}`);
}

function post(model: CreateInvoiceModel): Promise<unknown> {
  return http.post(`${baseUrl}`, model);
}

const invoiceService: InvoiceService = {
  get,
  getPagedInvoices,
  getOpenInvoices,
  getOverdueInvoices,
  getById,
  post,
  delete: remove,
};

export default invoiceService;

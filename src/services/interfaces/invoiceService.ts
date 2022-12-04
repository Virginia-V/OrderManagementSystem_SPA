import Invoice from "../../entities/invoice";
import CreateInvoiceModel from "../../models/createInvoiceModel";
import OpenInvoiceModel from "../../models/openInvoiceModel";
import PagedRequestModel from "../../models/pagedRequestModels/pagedRequestModel";
import PaginatedResultModel from "../../models/pagedRequestModels/paginatedResultModel";

export default interface InvoiceService {
  get(): Promise<Invoice[]>;
  getPagedInvoices(
    model: PagedRequestModel
  ): Promise<PaginatedResultModel<Invoice>>;
  getOpenInvoices(): Promise<OpenInvoiceModel[]>;
  getOverdueInvoices(): Promise<OpenInvoiceModel[]>;
  getById(invoiceId: number): Promise<Invoice>;
  delete(invoiceId: number): Promise<unknown>;
  post(model: CreateInvoiceModel): Promise<unknown>;
}

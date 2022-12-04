import RequestFilterModel from "./requestFilterModel";

export default interface PagedRequestModel {
  pageIndex: number;
  pageSize: number;
  columnNameForSorting: string;
  sortDirection: string;
  requestFilters: RequestFilterModel
}

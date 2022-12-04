export default interface PaginatedResultModel<T> {
  pageIndex: number;
  pageSize: number;
  total: number;
  items: T[];
}

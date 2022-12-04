import PagedRequestModel from "../../models/pagedRequestModels/pagedRequestModel";
import PaginatedResultModel from "../../models/pagedRequestModels/paginatedResultModel";

export interface TableData {
  title: string;
  output: PaginatedResultModel<any>;
}

export default interface TableModel {
  provide: (
    pagedRequestModel: PagedRequestModel
  ) => Promise<PaginatedResultModel<any>>;
}

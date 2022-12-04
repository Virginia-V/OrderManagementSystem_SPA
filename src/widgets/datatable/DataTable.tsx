import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
} from "@mui/material";
import { useContext, useEffect, useState } from "react";
import PaginatedResultModel from "../../models/pagedRequestModels/paginatedResultModel";
import RequestFilterModel from "../../models/pagedRequestModels/requestFilterModel";
import Model from "./model";
import "./datatable.scss";
import LocalizedText from "../../services/LocalizationService";
import PagedRequestModel from "../../models/pagedRequestModels/pagedRequestModel";
import EditModeContext from "../../context/editModeContext";

export interface TableColumn {
  field: string;
  headerName: string;
  width?: number;
  valueFormatter?: (rowValue: any) => any;
  renderCell?: (props: any) => any;
}

interface DataTableProps {
  model: Model;
  title: string;
  columns: TableColumn[];
}

function DataTable({ model, title, columns }: DataTableProps) {
  const [data, setData] = useState<PaginatedResultModel<any>>({
    pageIndex: 0,
    pageSize: 5,
    total: 0,
    items: [],
  });
  const [pagedRequest, setPagedRequest] = useState<PagedRequestModel>({
    pageIndex: 0,
    pageSize: 5,
    sortDirection: "",
    columnNameForSorting: "",
    requestFilters: {} as RequestFilterModel,
  });
  const editMode = useContext(EditModeContext);
  editMode.updateState(false);

  const populate = async (pagedRequest: PagedRequestModel) => {
    const newData = await model.provide(pagedRequest);
    setData(newData);
  };

  useEffect(() => {
    populate(pagedRequest);
    document.addEventListener("listChanged", listChangedHandler);
    return () => {
      document.removeEventListener("listChanged", listChangedHandler);
    };
  }, []);

  const listChangedHandler = () => {
    setPagedRequest((x) => {
      populate(x);
      return x;
    });
  };

  const handleChangePage = async (
    event: React.MouseEvent<HTMLButtonElement> | null,
    pageIndex: number
  ) => {
    const newPagedRequest = { ...pagedRequest, pageIndex };
    setPagedRequest(newPagedRequest);
    await populate(newPagedRequest);
  };

  const handleChangeSort = async (column: string) => {
    const direction =
      pagedRequest.columnNameForSorting === column
        ? pagedRequest.sortDirection === "asc"
          ? "desc"
          : "asc"
        : "asc";
    const newPagedRequest = {
      ...pagedRequest,
      columnNameForSorting: column,
      sortDirection: direction,
    };
    setPagedRequest(newPagedRequest);
    await populate(newPagedRequest);
  };

  const search = (e: React.ChangeEvent<HTMLInputElement> | undefined) => {
    const filters = columns.map((x) => {
      return {
        path: x.field,
        value: e?.currentTarget.value ?? "",
      };
    });
    const newPageRequest = {
      ...pagedRequest,
      requestFilters: { logicalOperator: 1, filters },
    };
    setPagedRequest(newPageRequest)
    return populate(newPageRequest);
  };

  return (
    <div className="list">
      <div className="listContainer">
        <div className="datatable">
          <div className="datatableTitle">{title}</div>
          <input
            type="text"
            placeholder={LocalizedText.Search}
            onChange={search}
          />
          <TableContainer component={Paper} sx={{ mt: 2 }}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  {columns.map((x, index) => (
                    <TableCell key={index} align="left">
                      <TableSortLabel
                        active={pagedRequest.columnNameForSorting === x.field}
                        direction={
                          pagedRequest.sortDirection === "asc" ? "asc" : "desc"
                        }
                        onClick={(e) => handleChangeSort(x.field)}
                      >
                        {x.headerName}
                      </TableSortLabel>
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {data.items.map((row) => (
                  <TableRow
                    key={row.id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    {columns.map((x) => (
                      <TableCell key={x.field} align="left">
                        {x.renderCell ? x.renderCell(row) : <></>}
                        {x.valueFormatter
                          ? x.valueFormatter(row[x.field])
                          : row[x.field]}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5]}
            component="div"
            count={data.total}
            rowsPerPage={data.pageSize}
            page={data.pageIndex}
            onPageChange={handleChangePage}
          />
        </div>
      </div>
    </div>
  );
}

export default DataTable;

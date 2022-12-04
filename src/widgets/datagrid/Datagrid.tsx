import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import Model from "./model";
import "./datagrid.scss";

export interface TableColumn {
  field: string;
  headerName: string;
  width: number;
  valueFormatter?: (value: any) => any;
}

interface TableProps {
  model: Model;
  title: string;
  columns: TableColumn[];
}

const Datagrid = ({ model, columns, title }: TableProps) => {
  const [data, setData] = useState<any[]>([]);

  const populate = async () => {
    const newData = await model.provide();
    setData(newData);
  };

  useEffect(() => {
    populate();
  }, []);

  return (
    <div className="list">
      <div className="listContainer">
        <div className="datatable-grid">
          <div className="datatableTitle">{title}</div>
          <DataGrid
            className="datagrid"
            rows={data}
            columns={columns}
            pageSize={5}
            checkboxSelection
          />
        </div>
      </div>
    </div>
  );
};

export default Datagrid;

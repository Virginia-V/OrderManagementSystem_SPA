import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import LocalizedText from "../../services/LocalizationService";
import "./table.scss";
import Model from "./model";

export interface TableColumn {
  field: string;
  headerName: string;
  valueFormatter?: (rowValue: any) => any;
}

interface TableProps {
  model: Model;
  title: string;
  columns: TableColumn[];
}

const List = ({ model, title, columns }: TableProps) => {
  const [data, setData] = useState<any[]>([]);

  const populate = async () => {
    const newData = await model.provide();
    setData(newData);
  };

  useEffect(() => {
    populate();
  }, []);

  return (
    <div className="tableContainer">
      <h1 className="title">{title}</h1>
      <TableContainer component={Paper} className="table">
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              {columns.map((x, index) => (
                <TableCell key={index} className="tableCell" align="left">
                  {x.headerName}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row) => (
              <TableRow key={row.id}>
                {columns.map((x) => (
                  <TableCell key={x.field} className="tableCell" align="left">
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
      <Link to="/agingReport" style={{ textDecoration: "none" }}>
        <span className="link">{LocalizedText.ViewAgingReport}</span>
      </Link>
    </div>
  );
};

export default List;

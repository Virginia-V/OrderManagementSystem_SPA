import DataTable from "../DataTable";
import Model from "./model";
import LocalizedText from "../../../services/LocalizationService";
import { CustomersActionCell } from "./CustomersActionCell";

export const CustomersTable = () => {
  return (
    <DataTable
      model={Model}
      title={LocalizedText.Customers}
      columns={[
        { field: "firstName", headerName: LocalizedText.Name },
        { field: "lastName", headerName: LocalizedText.Surname },
        { field: "companyName", headerName: LocalizedText.Institution },
        { field: "customerType", headerName: LocalizedText.Type },
        {
          field: "action",
          headerName: LocalizedText.Action,
          renderCell: (row) => <CustomersActionCell row={row} />,
        },
      ]}
    />
  );
};

export default CustomersTable;

import DataTable from "../DataTable";
import Model from "./model";
import LocalizedText from "../../../services/LocalizationService";
import { OrdersActionCell } from "./OrdersActionCell";

export const OrdersTable = () => {
  return (
    <DataTable
      model={Model}
      title={LocalizedText.Orders}
      columns={[
        {
          field: "orderedAt",
          headerName: LocalizedText.Date,
          valueFormatter: (rowValue) => {
            const dateValue = new Date(rowValue);
            return dateValue.toLocaleDateString("en-US", {
              year: "numeric",
              month: "2-digit",
              day: "2-digit",
            });
          },
        },
        {
          field: "purchaseOrderNumber",
          headerName: LocalizedText.PurchaseOrder,
        },
        { field: "customer", headerName: LocalizedText.Customer },
        {
          field: "totalOrderedAmount",
          headerName: LocalizedText.TotalAmount,
          valueFormatter: (rowValue) => {
            return (
              "$" +
              rowValue.toLocaleString("en-US", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })
            );
          },
        },
        { field: "orderType", headerName: LocalizedText.OrderType },
        {
          field: "action",
          headerName: LocalizedText.Action,
          renderCell: (row) => <OrdersActionCell row={row} />,
        },
      ]}
    />
  );
};

export default OrdersTable;

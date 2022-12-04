import DataTable from "../DataTable";
import Model from "./model";
import LocalizedText from "../../../services/LocalizationService";
import { InvoicesActionCell } from "./InvoicesActionCell";

export const InvoicesTable = () => {
  return (
    <DataTable
      model={Model}
      title={LocalizedText.Invoices}
      columns={[
        { field: "invoiceNumber", headerName: LocalizedText.Invoice },
        {
          field: "invoiceDate",
          headerName: LocalizedText.Date,
          valueFormatter: (item) => {
            const dateValue = new Date(item);
            return dateValue.toLocaleDateString("en-US", {
              year: "numeric",
              month: "2-digit",
              day: "2-digit",
            });
          },
        },
        { field: "discount", headerName: LocalizedText.Discount },
        {
          field: "shippingAmount",
          headerName: LocalizedText.Freight,
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
        {
          field: "invoicedAmount",
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
        { field: "paymentTerm", headerName: LocalizedText.PaymentTerms },
        { field: "paymentStatus", headerName: LocalizedText.PaymentStatus },
        {
          field: "action",
          headerName: LocalizedText.Action,
          renderCell: (row) => <InvoicesActionCell row={row} />,
        },
      ]}
    />
  );
};

export default InvoicesTable;

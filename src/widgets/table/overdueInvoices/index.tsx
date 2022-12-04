import Table from "../Table";
import Model from "./model";
import LocalizedText from "../../../services/LocalizationService";

export const OverdueInvoicesTable = () => {
  return (
    <Table
      model={Model}
      title={LocalizedText.RecentOverdueInvoices}
      columns={[
        { field: "invoiceNumber", headerName: LocalizedText.Invoice },
        { field: "customer", headerName: LocalizedText.Customer },
        {
          field: "balance",
          headerName: LocalizedText.Balance,
          valueFormatter: (item) => {
            return (
              "$" +
              item.toLocaleString("en-US", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })
            );
          },
        },
        {
          field: "dueDate",
          headerName: LocalizedText.DueDate,
          valueFormatter: (item) => {
            const dateValue = new Date(item);
            return dateValue.toLocaleDateString("en-US", {
              year: "numeric",
              month: "2-digit",
              day: "2-digit",
            });
          },
        },
        { field: "aging", headerName: LocalizedText.Aging },
      ]}
    />
  );
};

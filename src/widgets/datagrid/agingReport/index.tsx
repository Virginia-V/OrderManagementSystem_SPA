import LocalizedText from "../../../services/LocalizationService";
import Datagrid from "../Datagrid";
import Model from "./model";

export function AgingReportTable() {
  return (
    <Datagrid
      model={Model}
      title={LocalizedText.AgingReport}
      columns={[
        { field: "invoiceNumber", headerName: LocalizedText.Invoice, width: 100 },
        { field: "customer", headerName: LocalizedText.Customer, width: 250 },
        {
          field: "dueDate",
          headerName: LocalizedText.DueDate,
          width: 120,
          valueFormatter: (item) => {
            const dateValue = new Date(item.value);
            return dateValue.toLocaleDateString("en-US", {
              year: "numeric",
              month: "2-digit",
              day: "2-digit",
            });
          },
        },
        {
          field: "currentBalance",
          headerName: LocalizedText.Current,
          width: 130,
          valueFormatter: (item) => {
            return (
              "$" +
              item.value.toLocaleString("en-US", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })
            );
          },
        },
        {
          field: "balanceDueUpTo30Days",
          headerName: LocalizedText.Aging1to30Days,
          width: 140,
          valueFormatter: (item) => {
            return (
              "$" +
              item.value.toLocaleString("en-US", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })
            );
          },
        },
        {
          field: "balanceDueBetween31And60Days",
          headerName: LocalizedText.Aging31to60Days,
          width: 150,
          valueFormatter: (item) => {
            return (
              "$" +
              item.value.toLocaleString("en-US", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })
            );
          },
        },
        {
          field: "balanceDueBetween61And90Days",
          headerName: LocalizedText.Aging61to90Days,
          width: 150,
          valueFormatter: (item) => {
            return (
              "$" +
              item.value.toLocaleString("en-US", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })
            );
          },
        },
        {
          field: "balanceDueOver91Days",
          headerName: LocalizedText.AgingOver90Days,
          width: 140,
          valueFormatter: (item) => {
            return (
              "$" +
              item.value.toLocaleString("en-US", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })
            );
          },
        },
      ]}
    />
  );
}

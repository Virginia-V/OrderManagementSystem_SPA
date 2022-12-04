import Card from "../Card";
import Model from "./model";
import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";
import LocalizedText from "../../../services/LocalizationService";

export function InvoicesCard() {
  return (
    <Card
      title={LocalizedText.IncomingTransfers}
      path="/invoices"
      isMoney={true}
      link={LocalizedText.ViewAllInvoices}
      model={Model}
      Icon={() => (
        <MonetizationOnOutlinedIcon
          className="icon"
          style={{
            backgroundColor: "rgba(128, 0, 128, 0.2)",
            color: "purple",
          }}
        />
      )}
    />
  );
}

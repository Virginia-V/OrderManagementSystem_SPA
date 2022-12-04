import Card from "../Card";
import Model from "./model";
import CurrencyExchangeOutlinedIcon from "@mui/icons-material/CurrencyExchangeOutlined";
import LocalizedText from "../../../services/LocalizationService";

export function SalesCard() {
  return (
    <Card
      title={LocalizedText.TotalSales}
      path="/orders"
      isMoney={true}
      link={LocalizedText.ViewAllOrders}
      model={Model}
      Icon={() => (
        <CurrencyExchangeOutlinedIcon
          className="icon"
          style={{ backgroundColor: "rgba(0, 128, 0, 0.2)", color: "green" }}
        />
      )}
    />
  );
}

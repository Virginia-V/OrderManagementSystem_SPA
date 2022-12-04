import Card from "../Card";
import Model from "./model";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import LocalizedText from "../../../services/LocalizationService";

export function OrdersCard() {
  return (
    <Card
      title={LocalizedText.ORDERS}
      path="/orders"
      isMoney={false}
      link={LocalizedText.ViewAllOrders}
      model={Model}
      Icon={() => (
        <ShoppingCartOutlinedIcon
          className="icon"
          style={{
            backgroundColor: "rgba(218, 165, 32, 0.2)",
            color: "goldenrod",
          }}
        />
      )}
    />
  );
}

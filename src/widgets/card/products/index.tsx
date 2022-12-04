import Card from "../Card";
import Model from "./model";
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";
import LocalizedText from "../../../services/LocalizationService";

export function ProductsCard() {
  return (
    <Card
    title = {LocalizedText.PRODUCTS}
    path = "/products"
    isMoney= {false}
    link= {LocalizedText.SeeAllProducts}
      model={Model}
      Icon={() => (
        <Inventory2OutlinedIcon
          className="icon"
          style={{ backgroundColor: "rgba(0,0,255,0.3)", color: "#6439ff" }}
        />
      )}
    />
  );
}

import Model from "./model";
import LocalizedText from "../../../services/LocalizationService";
import BarChart from "../BarChart";

export function TopProductsBarChart() {
  return (
    <BarChart
      model={Model}
      title={LocalizedText.Top5SellingProducts}
      name={LocalizedText.quantity}
      yAxisDataKey="productSKU"
      barDataKey="quantity"
    />
  );
}

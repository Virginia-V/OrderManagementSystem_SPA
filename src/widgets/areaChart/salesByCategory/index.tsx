import Model from "./model";
import LocalizedText from "../../../services/LocalizationService";
import AreaChart from "../AreaChart";

export function SalesByCategoryChart() {
  return (
    <AreaChart
      name={LocalizedText.sales}
      model={Model}
      title={LocalizedText.SalesByCategory}
      xAxisDataKey="category"
      areaDataKey="sales"
    />
  );
}

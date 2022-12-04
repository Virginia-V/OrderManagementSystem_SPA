import DataTable from "../DataTable";
import Model from "./model";
import LocalizedText from "../../../services/LocalizationService";
import { ProductsActionCell } from "./ProductsActionCell";

export const ProductsTable = () => {
  return (
    <DataTable
      model={Model}
      title={LocalizedText.Products}
      columns={[
        { field: "productSKU", headerName: LocalizedText.SKU },
        { field: "productName", headerName: LocalizedText.ProductName },
        { field: "category", headerName: LocalizedText.Category },
        {
          field: "productPrice",
          headerName: LocalizedText.Price,
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
          field: "action",
          headerName: LocalizedText.Action,
          renderCell: (row) => <ProductsActionCell row={row} />,
        },
      ]}
    />
  );
};

export default ProductsTable;

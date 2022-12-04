import { Button } from "@mui/material";
import { ProductsTable } from "../../widgets/datatable";
import LocalizedText from "../../services/LocalizationService";
import "../../forms/new.scss";
import { openAddProduct } from "../../forms";

const ProductsPage = () => { 
  const handleClickOpen = () => {
    openAddProduct();
  };

  return (
    <div className="new">
      <Button
        color="success"
        className="new-button"
        variant="outlined"
        onClick={handleClickOpen}
      >
        {LocalizedText.AddNew}
      </Button>
      <ProductsTable />
    </div>
  );
};

export default ProductsPage;

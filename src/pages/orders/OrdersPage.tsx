import { Button } from "@mui/material";
import { OrdersTable } from "../../widgets/datatable";
import LocalizedText from "../../services/LocalizationService";
import "../../forms/new.scss";
import { openAddOrder } from "../../forms";

const OrdersPage = () => {
  const handleClickOpen = () => {
    openAddOrder();
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
      <OrdersTable />
    </div>
  );
};
export default OrdersPage;

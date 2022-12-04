import { CustomersTable } from "../../widgets/datatable";
import LocalizedText from "../../services/LocalizationService";
import { Button } from "@mui/material";
import "../../forms/new.scss";
import { openAddCustomer } from "../../forms";

const CustomersPage = () => {
  const handleClickOpen = () => {
    openAddCustomer();
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
      <CustomersTable />
    </div>
  );
};

export default CustomersPage;

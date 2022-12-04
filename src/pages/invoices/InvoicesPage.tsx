import { InvoicesTable } from "../../widgets/datatable";
import { Button } from "@mui/material";
import LocalizedText from "../../services/LocalizationService";
import "../../forms/new.scss";
import { openAddInvoice } from "../../forms";

const InvoicesPage = () => {
  const handleClickOpen = () => {
    openAddInvoice();
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
      <InvoicesTable />
    </div>
  );
};

export default InvoicesPage;

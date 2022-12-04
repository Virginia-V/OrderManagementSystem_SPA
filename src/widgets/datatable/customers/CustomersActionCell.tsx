import { IconButton, Tooltip } from "@mui/material";
import LocalizedText from "../../../services/LocalizationService";
import DeleteRecordButton from "../../../shared/DeleteRecordButton";
import { Link } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import customerService from "../../../services/CustomerService";

export function CustomersActionCell({ row }) {
  return (
    <div className="cellAction">
      <DeleteRecordButton
        id={row.id}
        confirmationMessage={LocalizedText.DeleteCustomerMessage}
        remove={customerService.delete}
      />
      <Link to={`/customers/edit/${row.id}`} style={{ textDecoration: "none" }}>
        <Tooltip title={LocalizedText.Edit}>
          <IconButton aria-label="edit">
            <EditIcon />
          </IconButton>
        </Tooltip>
      </Link>
    </div>
  );
}

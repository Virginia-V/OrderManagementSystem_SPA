import { IconButton, Tooltip } from "@mui/material";
import LocalizedText from "../../../services/LocalizationService";
import DeleteRecordButton from "../../../shared/DeleteRecordButton";
import productService from "../../../services/ProductService";
import { Link } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";

export function ProductsActionCell({ row }) {
  return (
    <div className="cellAction">
      <DeleteRecordButton
        id={row.id}
        confirmationMessage={LocalizedText.DeleteProductMessage}
        remove={productService.delete}
      />
      <Link to={`/products/edit/${row.id}`} style={{ textDecoration: "none" }}>
        <Tooltip title={LocalizedText.Edit}>
          <IconButton aria-label="edit">
            <EditIcon />
          </IconButton>
        </Tooltip>
      </Link>
    </div>
  );
}

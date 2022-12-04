import LocalizedText from "../services/LocalizationService";
import apiRequest from "./apiRequest";
import { IconButton, Tooltip } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { DeleteItem } from "../dialogs/confirmation";

interface DeleteButtonProps {
  id: number;
  confirmationMessage: string;
  remove: (id: number) => Promise<unknown>;
}

const DeleteRecordButton = ({
  id,
  remove,
  confirmationMessage,
}: DeleteButtonProps) => {
  
  const handleClickOpen = () => {
    DeleteItem(handleDelete, confirmationMessage);
  };

  const handleDelete = () => {
    apiRequest.execute(
      () => remove(id),
      () => {
        const event = new CustomEvent("listChanged");
        document.dispatchEvent(event);
      }
    );
  };
  
  return (
    <>
      <Tooltip title={LocalizedText.Delete}>
        <IconButton aria-label="delete" onClick={handleClickOpen}>
          <DeleteIcon />
        </IconButton>
      </Tooltip>
    </>
  );
};

export default DeleteRecordButton;

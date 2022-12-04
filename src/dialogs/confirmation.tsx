import {
  Button,
  DialogActions,
  DialogContent,
  DialogContentText,
} from "@mui/material";
import open, { close } from ".";
import LocalizedText from "../services/LocalizationService";

interface Props {
  id: string;
  message: string;
  onOkTitle: string;
  onCancelTitle: string;
  onOk: () => void;
}

export function DeleteItem(onConfirmed: () => void, message: string) {
  const id = "delete";
  return open({
    id: id,
    title: LocalizedText.AreYouSure,
    Content: () =>
      ConfirmationContent({
        id: id,
        message: message,
        onOkTitle: LocalizedText.Delete,
        onCancelTitle: LocalizedText.Cancel,
        onOk: onConfirmed,
      }),
  });
}

export function LeavePage(onConfirmed: () => void) {
  const id = "leave";
  return open({
    id: id,
    title: LocalizedText.confirmNavigation,
    Content: () =>
      ConfirmationContent({
        id: id,
        message: LocalizedText.confirmLeavingPage,
        onOkTitle: LocalizedText.leavePage,
        onCancelTitle: LocalizedText.stayOnPage,
        onOk: onConfirmed,
      }),
  });
}

function ConfirmationContent({
  id,
  message,
  onOkTitle,
  onCancelTitle,
  onOk,
}: Props) {
  const confirmed = () => {
    onOk();
    close(id);
  };

  return (
    <>
      <DialogContent>
        <DialogContentText id="alert-dialog-slide-description">
          {message}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button color="error" onClick={() => close(id)}>
          {onCancelTitle}
        </Button>
        <Button color="success" onClick={confirmed}>
          {onOkTitle}
        </Button>
      </DialogActions>
    </>
  );
}

import React, { useEffect, useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import { render, unmountComponentAtNode } from "react-dom";

interface DialogProps {
  id: string;
  title: string;
  Content: React.ComponentType<any>;
}

interface InternalProps {
  dialogProps: DialogProps;
  parent: HTMLDivElement;
}

const open = (props: DialogProps) => {
  const parent = document.createElement("div");
  document.body.appendChild(parent);
  render(<AppDialog parent={parent} dialogProps={props} />, parent);
};

export const close = (id: string) => {
  const event = new CustomEvent("closeDialog", {
    detail: id,
  });
  document.dispatchEvent(event);
};

const AppDialog = (props: InternalProps) => {
  const { id, title, Content } = props.dialogProps;
  const [open, setOpen] = useState(true);

  useEffect(() => {
    document.addEventListener("closeDialog", closeDialogHandler);
    return () =>
      document.removeEventListener("closeDialog", closeDialogHandler);
  }, []);

  const closeDialogHandler = (e: any) => {
    if (id === e.detail) onClose();
  };

  const onClose = () => {
    setOpen(false);
    unmountComponentAtNode(props.parent);
    document.body.removeChild(props.parent);
  };

  return (
    <Dialog fullWidth open={open} onClose={onClose}>
      <DialogTitle style={{ textAlign: "center" }}>{title}</DialogTitle>
      <Content />
    </Dialog>
  );
};

export default open;

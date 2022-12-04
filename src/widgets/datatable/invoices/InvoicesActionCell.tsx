import LocalizedText from "../../../services/LocalizationService";
import DeleteRecordButton from "../../../shared/DeleteRecordButton";
import invoiceService from "../../../services/InvoiceService";

export function InvoicesActionCell({ row }) {
  return (
    <div className="cellAction">
      <DeleteRecordButton
        id={row.id}
        confirmationMessage={LocalizedText.DeleteInvoiceMessage}
        remove={invoiceService.delete}
      />
    </div>
  );
}

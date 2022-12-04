import orderService from "../../../services/OrderService";
import LocalizedText from "../../../services/LocalizationService";
import DeleteRecordButton from "../../../shared/DeleteRecordButton";

export function OrdersActionCell({ row }) {
  return (
    <div className="cellAction">
      <DeleteRecordButton
        id={row.id}
        confirmationMessage={LocalizedText.DeleteOrderMessage}
        remove={orderService.delete}
      />
    </div>
  );
}

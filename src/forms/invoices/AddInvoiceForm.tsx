import "../new.scss";
import { FormState, UseFormRegister } from "react-hook-form";
import * as yup from "yup";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import openForm from "../../dialogs/formDialog";
import TextField from "@mui/material/TextField";
import LocalizedText from "../../services/LocalizationService";
import apiRequest from "../../shared/apiRequest";
import invoiceService from "../../services/InvoiceService";
import Order from "../../entities/order";
import PaymentTerm from "../../entities/paymentTerm";
import PaymentStatus from "../../entities/paymentStatus";
import Discount from "../../entities/discount";
import discountService from "../../services/DiscountService";
import orderService from "../../services/OrderService";
import paymentTermService from "../../services/PaymentTermService";
import paymentStatusService from "../../services/PaymentStatusService";
import FormSelect from "../../shared/FormSelect";

type FormTypes = {
  invoiceDate: Date;
  invoiceNumber: string;
  purchaseOrderNumber: string;
  discountId: number;
  shippingAmount: number;
  paymentTermId: number;
  dueDate: Date;
  paymentStatusId: number;
};

export function openAddInvoice() {
  const schema = yup.object({
    invoiceDate: yup.string().required(LocalizedText.DateRequired),
    invoiceNumber: yup
      .string()
      .required(LocalizedText.InvoiceNumberRequired)
      .min(1, LocalizedText.InvoiceNumberMinChar)
      .max(15, LocalizedText.InvoiceNumberMaxChar),
    purchaseOrderNumber: yup
      .string()
      .required(LocalizedText.PurchaseOrderRequired),
    discountId: yup.string().required(LocalizedText.DiscountRequired),
    shippingAmount: yup
      .number()
      .required(LocalizedText.FreightRequired)
      .typeError(LocalizedText.FreightOfTypeNum)
      .min(0, LocalizedText.FreightMin),
    paymentTermId: yup.string().required(LocalizedText.PaymentTermsRequired),
    dueDate: yup.string().required(LocalizedText.DueDateRequired),
    paymentStatusId: yup.string().required(LocalizedText.PaymentStatusRequired),
  });

  const onSubmit = (values: FormTypes) => {
    apiRequest.execute(
      () => invoiceService.post(values),
      () => {
        toast.success(LocalizedText.InvoiceSaved, {
          position: toast.POSITION.TOP_RIGHT,
        });
        const event = new CustomEvent("listChanged");
        document.dispatchEvent(event);
      }
    );
  };

  return openForm<FormTypes>({
    id: "AddInvoiceId",
    FormContent: (register, state) => AddInvoiceForm(register, state),
    schema,
    title: LocalizedText.AddNewInvoice,
    onSubmit: onSubmit,
  });
}

const AddInvoiceForm = (
  register: UseFormRegister<FormTypes>,
  formState: FormState<FormTypes>
) => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [discounts, setDiscounts] = useState<Discount[]>([]);
  const [paymentTerms, setPaymentTerms] = useState<PaymentTerm[]>([]);
  const [paymentStatuses, setPaymentStatuses] = useState<PaymentStatus[]>([]);

  const getOrders = async () => {
    apiRequest.execute(
      () => orderService.get(),
      (result) => {
        setOrders(result);
      }
    );
  };

  const getDiscounts = async () => {
    apiRequest.execute(
      () => discountService.get(),
      (result) => {
        setDiscounts(result);
      }
    );
  };

  const getPaymentTerms = async () => {
    apiRequest.execute(
      () => paymentTermService.get(),
      (result) => {
        setPaymentTerms(result);
      }
    );
  };

  const getPaymentStatuses = async () => {
    apiRequest.execute(
      () => paymentStatusService.get(),
      (result) => setPaymentStatuses(result)
    );
  };

  useEffect(() => {
    getOrders();
    getDiscounts();
    getPaymentTerms();
    getPaymentStatuses();
  }, []);

  const { errors } = formState;

  return (
    <>
      <div className="formInput">
        <TextField
          fullWidth
          color={errors.invoiceDate ? "error" : "success"}
          id="invoiceDate"
          label={LocalizedText.Date}
          type="date"
          sx={{ width: 220 }}
          InputLabelProps={{
            shrink: true,
          }}
          {...register("invoiceDate")}
        />
        {errors.invoiceDate && (
          <p className="errorMessage">{errors.invoiceDate.message}</p>
        )}
      </div>

      <div className="formInput">
        <TextField
          fullWidth
          color={errors.invoiceNumber ? "error" : "success"}
          id="invoiceNumber"
          label={LocalizedText.ReferenceNumber}
          {...register("invoiceNumber")}
        />
        {errors.invoiceNumber && (
          <p className="errorMessage">{errors.invoiceNumber.message}</p>
        )}
      </div>

      <FormSelect
        label={LocalizedText.PurchaseOrder}
        labelId="select-purchase-order"
        componentId="purchaseOrderNumber"
        otherProps={register("purchaseOrderNumber")}
        errors={errors.purchaseOrderNumber?.message}
        menuItems={orders.map((x) => {
          return { id: x.purchaseOrderNumber, text: x.purchaseOrderNumber };
        })}
      />

      <FormSelect
        label={LocalizedText.Discount}
        labelId="select-discount"
        componentId="discountId"
        otherProps={register("discountId")}
        errors={errors.discountId?.message}
        menuItems={discounts.map((x) => {
          return { id: x.id, text: x.discountType };
        })}
      />

      <div className="formInput">
        <TextField
          fullWidth
          color={errors.shippingAmount ? "error" : "success"}
          id="shippingAmount"
          label={LocalizedText.Freight}
          {...register("shippingAmount")}
        />
        {errors.shippingAmount && (
          <p className="errorMessage">{errors.shippingAmount.message}</p>
        )}
      </div>

      <FormSelect
        label={LocalizedText.Terms}
        labelId="select-payment-terms"
        componentId="paymentTermId"
        otherProps={register("paymentTermId")}
        errors={errors.paymentTermId?.message}
        menuItems={paymentTerms.map((x) => {
          return { id: x.id, text: x.paymentTermsType };
        })}
      />

      <div className="formInput">
        <TextField
          fullWidth
          color={errors.dueDate ? "error" : "success"}
          id="dueDate"
          label={LocalizedText.DueDate}
          type="date"
          sx={{ width: 220 }}
          InputLabelProps={{
            shrink: true,
          }}
          {...register("dueDate")}
        />
        {errors.dueDate && (
          <p className="errorMessage">{errors.dueDate.message}</p>
        )}
      </div>

      <FormSelect
        label={LocalizedText.Status}
        labelId="select-payment-status"
        componentId="paymentStatusId"
        otherProps={register("paymentStatusId")}
        errors={errors.paymentStatusId?.message}
        menuItems={paymentStatuses.map((x) => {
          return { id: x.id, text: x.status };
        })}
      />
    </>
  );
};

export default AddInvoiceForm;

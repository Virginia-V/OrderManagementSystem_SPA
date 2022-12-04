import "../new.scss";
import {
  Control,
  FormState,
  useFieldArray,
  UseFormRegister,
} from "react-hook-form";
import * as yup from "yup";
import { useEffect, useState } from "react";
import openForm from "../../dialogs/formDialog";
import {
  Fab,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Tooltip,
} from "@mui/material";
import { toast } from "react-toastify";
import LocalizedText from "../../services/LocalizationService";
import apiRequest from "../../shared/apiRequest";
import orderService from "../../services/OrderService";
import Product from "../../entities/product";
import Customer from "../../entities/customer";
import OrderType from "../../entities/orderType";
import customerService from "../../services/CustomerService";
import productService from "../../services/ProductService";
import orderTypeService from "../../services/OrderTypeService";
import FormSelect from "../../shared/FormSelect";
import ClearIcon from "@mui/icons-material/Clear";
import AddIcon from "@mui/icons-material/Add";

type FormTypes = {
  orderedAt: Date;
  purchaseOrderNumber: string;
  customerId: number;
  orderTypeId: number;
  orderedProducts: {
    productId: number;
    quantity: number;
  }[];
};

export function openAddOrder() {
  const schema = yup.object({
    orderedAt: yup.string().required(LocalizedText.DateRequired),
    purchaseOrderNumber: yup
      .string()
      .required(LocalizedText.PurchaseOrderRequired)
      .min(8, LocalizedText.PurchaseOrderMinChar)
      .max(15, LocalizedText.PurchaseOrderMaxChar),
    customerId: yup.string().required(LocalizedText.CustomerRequired),
    orderTypeId: yup.string().required(LocalizedText.OrderTypeRequired),
    orderedProducts: yup.array(
      yup.object().shape({
        productId: yup.string().required(),
        quantity: yup.number().required().min(1),
      })
    ),
  });

  const onSubmit = (values: FormTypes) => {
    apiRequest.execute(
      () => orderService.post(values),
      () => {
        toast.success(LocalizedText.OrderSaved, {
          position: toast.POSITION.TOP_RIGHT,
        });
        const event = new CustomEvent("listChanged");
        document.dispatchEvent(event);
      }
    );
  };

  return openForm<FormTypes>({
    id: "AddOrderId",
    FormContent: (register, state, control) =>
      AddOrderForm(register, state, control),
    schema,
    title: LocalizedText.AddNewOrder,
    onSubmit: onSubmit,
  });
}

const AddOrderForm = (
  register: UseFormRegister<FormTypes>,
  formState: FormState<FormTypes>,
  control: Control<FormTypes, any>
) => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [orderTypes, setOrderTypes] = useState<OrderType[]>([]);
  const [products, setProducts] = useState<Product[]>([]);

  const getCustomers = async () => {
    apiRequest.execute(
      () => customerService.get(),
      (result) => setCustomers(result)
    );
  };

  const getProducts = async () => {
    apiRequest.execute(
      () => productService.get(),
      (result) => setProducts(result)
    );
  };

  const getOrderTypes = async () => {
    apiRequest.execute(
      () => orderTypeService.get(),
      (result) => setOrderTypes(result)
    );
  };

  useEffect(() => {
    getCustomers();
    getOrderTypes();
    getProducts();
  }, []);

  const { errors } = formState;

  const { fields, append, remove } = useFieldArray({
    name: "orderedProducts",
    control,
  });

  return (
    <>
      <div className="formInput">
        <TextField
          fullWidth
          color={errors.orderedAt ? "error" : "success"}
          id="orderedAt"
          label={LocalizedText.Date}
          type="date"
          sx={{ width: 220 }}
          InputLabelProps={{
            shrink: true,
          }}
          {...register("orderedAt")}
        />
        {errors.orderedAt && (
          <p className="errorMessage">{errors.orderedAt.message}</p>
        )}
      </div>

      <div className="formInput">
        <TextField
          fullWidth
          color={errors.purchaseOrderNumber ? "error" : "success"}
          id="purchaseOrderNumber"
          label={LocalizedText.PurchaseOrder}
          {...register("purchaseOrderNumber")}
        />
        {errors.purchaseOrderNumber && (
          <p className="errorMessage">{errors.purchaseOrderNumber.message}</p>
        )}
      </div>

      <FormSelect
        label={LocalizedText.Customer}
        labelId="select-customer"
        componentId="customerId"
        otherProps={register("customerId")}
        errors={errors.customerId?.message}
        menuItems={customers.map((x) => {
          return { id: x.id, text: x.companyName };
        })}
      />

      <FormSelect
        label={LocalizedText.Type}
        labelId="select-order-type"
        componentId="orderTypeId"
        otherProps={register("orderTypeId")}
        errors={errors.orderTypeId?.message}
        menuItems={orderTypes.map((x) => {
          return { id: x.id, text: x.type };
        })}
      />

      <div className="formInput">
        {fields.map((field, index) => {
          return (
            <div key={field.id}>
              <section key={field.id}>
                <FormControl
                  color={errors.orderedProducts ? "error" : "success"}
                  sx={{ m: 1, minWidth: 120 }}
                >
                  <InputLabel className="inputLabel" id="select-product">
                    {LocalizedText.Product}
                  </InputLabel>
                  <Select
                    className="select"
                    labelId="select-product"
                    id="productId"
                    label={LocalizedText.Product}
                    {...register(
                      `orderedProducts.${index}.productId` as const,
                      {
                        required: true,
                      }
                    )}
                  >
                    {products.map((x) => (
                      <MenuItem key={x.id} value={x.id}>
                        {x.productSKU}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

                <TextField
                  color={errors.orderedProducts ? "error" : "success"}
                  id="quantity"
                  label={LocalizedText.Quantity}
                  type="number"
                  {...register(`orderedProducts.${index}.quantity` as const, {
                    valueAsNumber: true,
                    required: true,
                    min: 1,
                  })}
                />

                <Tooltip title={LocalizedText.Delete}>
                  <Fab
                    className="clear-icon"
                    size="small"
                    onClick={() => remove(index)}
                    color="secondary"
                  >
                    <ClearIcon />
                  </Fab>
                </Tooltip>
              </section>
            </div>
          );
        })}
      </div>

      <Tooltip title={LocalizedText.Add}>
        <Fab size="small" color="secondary" aria-label="add">
          <AddIcon
            onClick={() =>
              append({
                productId: 0,
                quantity: 0,
              })
            }
          />
        </Fab>
      </Tooltip>
    </>
  );
};

export default AddOrderForm;

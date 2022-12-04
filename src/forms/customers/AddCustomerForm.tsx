import "../new.scss";
import { FormState, UseFormRegister } from "react-hook-form";
import * as yup from "yup";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import TextField from "@mui/material/TextField";
import customerService from "../../services/CustomerService";
import LocalizedText from "../../services/LocalizationService";
import apiRequest from "../../shared/apiRequest";
import customerTypeService from "../../services/CustomerTypeService";
import FormSelect from "../../shared/FormSelect";
import openForm from "../../dialogs/formDialog";
import CustomerType from "../../entities/customerType";

type FormTypes = {
  firstName: string;
  lastName: string;
  companyName: string;
  customerTypeId: number;
  billingAddress: string;
  shippingAddress: string;
  email: string;
};

export function openAddCustomer() {
  const schema = yup.object({
    firstName: yup
      .string()
      .required(LocalizedText.FirstNameRequired)
      .min(3, LocalizedText.FirstNameMinChar)
      .max(20, LocalizedText.FirstNameMaxChar),
    lastName: yup
      .string()
      .required(LocalizedText.LastNameRequired)
      .min(3, LocalizedText.LastNameMinChar)
      .max(20, LocalizedText.LastNameMaxChar),
    companyName: yup
      .string()
      .required(LocalizedText.InstitutionNameRequired)
      .min(10, LocalizedText.InstitutionNameMinChar)
      .max(50, LocalizedText.InstitutionNameMaxChar),
    customerTypeId: yup.string().required(LocalizedText.CustomerTypeRequired),
    billingAddress: yup
      .string()
      .required(LocalizedText.BillingAddressRequired)
      .min(10, LocalizedText.BillingAddressMinChar)
      .max(100, LocalizedText.BillingAddressMaxChar),
    shippingAddress: yup
      .string()
      .required(LocalizedText.ShippingAddressRequired)
      .min(10, LocalizedText.ShippingAddressMinChar)
      .max(100, LocalizedText.ShippingAddressMaxChar),
    email: yup
      .string()
      .email(LocalizedText.InvalidEmail)
      .required(LocalizedText.EmailRequired),
  });

  const onSubmit = (values: FormTypes) => {
    apiRequest.execute(
      () => customerService.post(values),
      () => {
        toast.success(LocalizedText.CustomerSaved, {
          position: toast.POSITION.TOP_RIGHT,
        });
        const event = new CustomEvent("listChanged");
        document.dispatchEvent(event);
      }
    );
  };

  return openForm<FormTypes>({
    id: "AddCustomerId",
    FormContent: (register, state) => AddCustomerForm(register, state),
    schema,
    title: LocalizedText.AddNewCustomer,
    onSubmit: onSubmit,
  });
}

const AddCustomerForm = (
  register: UseFormRegister<FormTypes>,
  formState: FormState<FormTypes>
) => {
  const [customerTypes, setCustomerTypes] = useState<CustomerType[]>([]);

  const getCustomerTypes = async () => {
    apiRequest.execute(
      () => customerTypeService.get(),
      (result) => setCustomerTypes(result)
    );
  };

  useEffect(() => {
    getCustomerTypes();
  }, []);

  const { errors } = formState;

  return (
    <>
      <div className="formInput">
        <TextField
          fullWidth
          color={errors.firstName ? "error" : "success"}
          id="firstName"
          label={LocalizedText.Name}
          {...register("firstName")}
        />
        {errors.firstName && (
          <p className="errorMessage">{errors.firstName.message}</p>
        )}
      </div>

      <div className="formInput">
        <TextField
          fullWidth
          color={errors.lastName ? "error" : "success"}
          id="lastName"
          label={LocalizedText.Surname}
          {...register("lastName")}
        />
        {errors.lastName && (
          <p className="errorMessage">{errors.lastName.message}</p>
        )}
      </div>

      <div className="formInput">
        <TextField
          fullWidth
          color={errors.companyName ? "error" : "success"}
          id="companyName"
          label={LocalizedText.Institution}
          {...register("companyName")}
        />
        {errors.companyName && (
          <p className="errorMessage">{errors.companyName.message}</p>
        )}
      </div>

      <FormSelect
        label={LocalizedText.Type}
        labelId="select-type"
        componentId="customerTypeId"
        otherProps={register("customerTypeId")}
        errors={errors.customerTypeId?.message}
        menuItems={customerTypes.map((x) => {
          return { id: x.id, text: x.customerType };
        })}
      />

      <div className="formInput">
        <TextField
          fullWidth
          color={errors.billingAddress ? "error" : "success"}
          id="billingAddress"
          label={LocalizedText.BillingAddress}
          {...register("billingAddress")}
        />
        {errors.billingAddress && (
          <p className="errorMessage">{errors.billingAddress.message}</p>
        )}
      </div>

      <div className="formInput">
        <TextField
          fullWidth
          color={errors.shippingAddress ? "error" : "success"}
          id="shippingAddress"
          label={LocalizedText.ShippingAddress}
          {...register("shippingAddress")}
        />
        {errors.shippingAddress && (
          <p className="errorMessage">{errors.shippingAddress.message}</p>
        )}
      </div>

      <div className="formInput">
        <TextField
          fullWidth
          color={errors.email ? "error" : "success"}
          id="email"
          label="E-mail"
          {...register("email")}
        />
        {errors.email && <p className="errorMessage">{errors.email.message}</p>}
      </div>
    </>
  );
};

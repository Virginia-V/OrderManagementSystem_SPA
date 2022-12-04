import "../edit.scss";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import SendIcon from "@mui/icons-material/Send";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { Link, useParams } from "react-router-dom";
import { MenuItem, Select } from "@mui/material";
import UpdateCustomerModel from "../../models/updateCustomerModel";
import LocalizedText from "../../services/LocalizationService";
import CustomerType from "../../entities/customerType";
import apiRequest from "../../shared/apiRequest";
import customerService from "../../services/CustomerService";
import customerTypeService from "../../services/CustomerTypeService";
import EditModeContext from "../../context/editModeContext";

type FormTypes = {
  firstName: string;
  lastName: string;
  companyName: string;
  customerTypeId: number;
  billingAddress: string;
  shippingAddress: string;
  email: string;
};

const EditCustomerForm = () => {
  const editMode = useContext(EditModeContext);
  editMode.updateState(true);

  const schema = yup.object({
    firstName: yup
      .string()
      .min(3, LocalizedText.FirstNameMinChar)
      .max(20, LocalizedText.FirstNameMaxChar),
    lastName: yup
      .string()
      .min(3, LocalizedText.LastNameMinChar)
      .max(20, LocalizedText.LastNameMaxChar),
    companyName: yup
      .string()
      .min(10, LocalizedText.InstitutionNameMinChar)
      .max(50, LocalizedText.InstitutionNameMaxChar),
    billingAddress: yup
      .string()
      .min(10, LocalizedText.BillingAddressMinChar)
      .max(100, LocalizedText.BillingAddressMaxChar),
    shippingAddress: yup
      .string()
      .min(10, LocalizedText.ShippingAddressMinChar)
      .max(100, LocalizedText.ShippingAddressMaxChar),
    email: yup.string().email(LocalizedText.InvalidEmail),
  });

  const { id } = useParams<{ id }>();
  const [customerTypes, setCustomerTypes] = useState<CustomerType[]>([]);
  const [customer, setCustomer] = useState<UpdateCustomerModel>();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    control,
  } = useForm<FormTypes>({
    resolver: yupResolver(schema),
  });

  const getCustomerTypes = async () => {
    apiRequest.execute(
      () => customerTypeService.get(),
      (result) => setCustomerTypes(result)
    );
  };

  useEffect(() => {
    apiRequest.execute(
      () => customerService.getById(+id),
      (result) => {
        setCustomer(result);
        setValue("firstName", result.firstName);
        setValue("lastName", result.lastName);
        setValue("companyName", result.companyName);
        setValue("customerTypeId", result.customerTypeId);
        setValue("billingAddress", result.billingAddress);
        setValue("shippingAddress", result.shippingAddress);
        setValue("email", result.email);
      }
    );
    getCustomerTypes();
  }, []);

  const onSubmit = (values: FormTypes) => {
    apiRequest.execute(
      () => customerService.patch(id, values),
      () => {
        toast.success(LocalizedText.CustomerUpdated);
      }
    );
  };

  return (
    <div className="update-item">
      <div className="title">{LocalizedText.EditCustomer}</div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="formInput">
          <TextField
            fullWidth
            color={errors.firstName ? "error" : "success"}
            id="firstName"
            label={LocalizedText.Name}
            {...register("firstName")}
            InputLabelProps={{
              shrink: true,
            }}
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
            InputLabelProps={{
              shrink: true,
            }}
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
            InputLabelProps={{
              shrink: true,
            }}
          />
          {errors.companyName && (
            <p className="errorMessage">{errors.companyName.message}</p>
          )}
        </div>

        <div className="formInput">
          <Controller
            control={control}
            name="customerTypeId"
            defaultValue={-1}
            rules={{
              required: false,
              min: 0,
            }}
            render={({ field }) => (
              <Select
                color="success"
                sx={{ width: 222.4, height: 56 }}
                {...field}
                error={errors.customerTypeId !== undefined}
              >
                <MenuItem value={-1} disabled>
                  Type
                </MenuItem>
                {customerTypes.map((p) => (
                  <MenuItem key={p.id} value={p.id}>
                    {p.customerType}
                  </MenuItem>
                ))}
              </Select>
            )}
          />
        </div>

        <div className="formInput">
          <TextField
            fullWidth
            color={errors.billingAddress ? "error" : "success"}
            id="billingAddress"
            label={LocalizedText.BillingAddress}
            {...register("billingAddress")}
            InputLabelProps={{
              shrink: true,
            }}
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
            InputLabelProps={{
              shrink: true,
            }}
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
            InputLabelProps={{
              shrink: true,
            }}
          />
          {errors.email && (
            <p className="errorMessage">{errors.email.message}</p>
          )}
        </div>

        <div className="buttons">
          <Button
            color="success"
            variant="contained"
            type="submit"
            endIcon={<SendIcon />}
          >
            {LocalizedText.Submit}
          </Button>
          <Link className="link" to="/customers">
            <Button variant="contained" color="error">
              {LocalizedText.Cancel}
            </Button>
          </Link>
        </div>
      </form>
    </div>
  );
};

export default EditCustomerForm;

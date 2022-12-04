import "../new.scss";
import { FormState, UseFormRegister } from "react-hook-form";
import * as yup from "yup";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import openForm from "../../dialogs/formDialog"
import TextField from "@mui/material/TextField";
import LocalizedText from "../../services/LocalizationService";
import productService from "../../services/ProductService";
import apiRequest from "../../shared/apiRequest";
import Category from "../../entities/category";
import categoryService from "../../services/CategoryService";
import FormSelect from "../../shared/FormSelect";

type FormTypes = {
  productSKU: string;
  productName: string;
  categoryId: number;
  productPrice: number;
};

export function openAddProduct() {
  const schema = yup.object({
    productSKU: yup
      .string()
      .required(LocalizedText.SKUNumberRequired)
      .min(6, LocalizedText.SKUNumberMinChar)
      .max(20, LocalizedText.SKUNumberMaxChar),
    productName: yup
      .string()
      .required(LocalizedText.ProductNameRequired)
      .min(10, LocalizedText.ProductNameMinChar)
      .max(50, LocalizedText.ProductNameMaxChar),
    categoryId: yup.string().required(LocalizedText.CategoryRequired),
    productPrice: yup
      .number()
      .required(LocalizedText.ProductPriceRequired)
      .typeError(LocalizedText.PriceOfTypeNum)
      .min(0, LocalizedText.ProductPriceMin)
      .max(999.99, LocalizedText.ProductPriceMax),
  });

  const onSubmit = (values: FormTypes) => {
    apiRequest.execute(
      () => productService.post(values),
      () => {
        toast.success(LocalizedText.ProductSaved, {
          position: toast.POSITION.TOP_CENTER,
        });
        const event = new CustomEvent("listChanged");
        document.dispatchEvent(event);
      }
    );
  };

  return openForm<FormTypes>({
    id: "AddProductId",
    FormContent: (register, state) => AddProductForm(register, state),
    schema,
    title: LocalizedText.AddNewProduct,
    onSubmit: onSubmit,
  });
}

const AddProductForm = (
  register: UseFormRegister<FormTypes>,
  formState: FormState<FormTypes>
) => {
  const [categories, setCategories] = useState<Category[]>([]);

  const getCategories = async () => {
    apiRequest.execute(
      () => categoryService.get(),
      (result) => {
        setCategories(result);
      }
    );
  };

  useEffect(() => {
    getCategories();
  }, []);

  const { errors } = formState;

  return (
    <>
      <div className="formInput">
        <TextField
          fullWidth
          color={errors.productSKU ? "error" : "success"}
          id="productSKU"
          label={LocalizedText.SKU}
          {...register("productSKU")}
        />
        {errors.productSKU && (
          <p className="errorMessage">{errors.productSKU.message}</p>
        )}
      </div>

      <div className="formInput">
        <TextField
          fullWidth
          color={errors.productName ? "error" : "success"}
          id="productName"
          label={LocalizedText.ProductName}
          {...register("productName")}
        />
        {errors.productName && (
          <p className="errorMessage">{errors.productName.message}</p>
        )}
      </div>

      <FormSelect
        label={LocalizedText.Category}
        labelId="select-category"
        componentId="categoryId"
        otherProps={register("categoryId")}
        errors={errors.categoryId?.message}
        menuItems={categories.map((x) => {
          return { id: x.id, text: x.categoryName };
        })}
      />

      <div className="formInput">
        <TextField
          fullWidth
          color={errors.productPrice ? "error" : "success"}
          id="productPrice"
          label={LocalizedText.Price}
          {...register("productPrice")}
        />
        {errors.productPrice && (
          <p className="errorMessage">{errors.productPrice.message}</p>
        )}
      </div>
    </>
  );
};

export default AddProductForm;

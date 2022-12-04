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
import UpdateProductModel from "../../models/updateProductModel";
import LocalizedText from "../../services/LocalizationService";
import EditModeContext from "../../context/editModeContext";
import apiRequest from "../../shared/apiRequest";
import categoryService from "../../services/CategoryService";
import Category from "../../entities/category";
import productService from "../../services/ProductService";

type FormTypes = {
  productName: string;
  categoryId: number;
  productPrice: number;
};

const EditProductForm = () => {
  const editMode = useContext(EditModeContext);
  editMode.updateState(true);

  const schema = yup.object({
    productName: yup
      .string()
      .min(10, LocalizedText.ProductNameMinChar)
      .max(50, LocalizedText.ProductNameMaxChar),
    productPrice: yup
      .number()
      .typeError(LocalizedText.PriceOfTypeNum)
      .min(0, LocalizedText.ProductPriceMin)
      .max(999.99, LocalizedText.ProductPriceMax),
  });

  const { id } = useParams<{ id }>();
  const [categories, setCategories] = useState<Category[]>([]);
  const [product, setProduct] = useState<UpdateProductModel>();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    setValue,
  } = useForm<FormTypes>({
    resolver: yupResolver(schema),
  });

  const getCategories = async () => {
    apiRequest.execute(
      () => categoryService.get(),
      (result) => {
        setCategories(result);
      }
    );
  };

  useEffect(() => {
    apiRequest.execute(
      () => productService.getById(+id),
      (result) => {
        setProduct(result);
        setValue("productName", result.productName);
        setValue("categoryId", result.categoryId);
        setValue("productPrice", result.productPrice);
      }
    );
    getCategories();
  }, []);

  const onSubmit = (values: FormTypes) => {
    editMode.updateState(false);
    apiRequest.execute(
      () => productService.patch(id, values),
      () => {
        toast.success(LocalizedText.ProductUpdated);
      }
    );
  };

  return (
    <div className="update-item">
      <div className="title">{LocalizedText.EditProduct}</div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="formInput">
          <TextField
            fullWidth
            color={errors.productName ? "error" : "success"}
            id="productName"
            label={LocalizedText.ProductName}
            {...register("productName")}
            InputLabelProps={{
              shrink: true,
            }}
          />
          {errors.productName && (
            <p className="errorMessage">{errors.productName.message}</p>
          )}
        </div>

        <div className="formInput">
          <Controller
            control={control}
            name="categoryId"
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
                error={errors.categoryId !== undefined}
              >
                <MenuItem value={-1} disabled>
                  Category
                </MenuItem>
                {categories.map((p) => (
                  <MenuItem key={p.id} value={p.id}>
                    {p.categoryName}
                  </MenuItem>
                ))}
              </Select>
            )}
          />
        </div>

        <div className="formInput">
          <TextField
            fullWidth
            color={errors.productPrice ? "error" : "success"}
            id="productPrice"
            label={LocalizedText.Price}
            {...register("productPrice")}
            InputLabelProps={{
              shrink: true,
            }}
          />
          {errors.productPrice && (
            <p className="errorMessage">{errors.productPrice.message}</p>
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
          <Link className="link" to="/products">
            <Button variant="contained" color="error">
              {LocalizedText.Cancel}
            </Button>
          </Link>
        </div>
      </form>
    </div>
  );
};

export default EditProductForm;

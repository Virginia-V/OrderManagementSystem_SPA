import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { UseFormRegisterReturn } from "react-hook-form";

interface MenuItemData {
  id: number | string;
  text: string | number;
}
interface FormSelectProps {
  label: string;
  labelId: string;
  componentId: string;
  otherProps: UseFormRegisterReturn<string>;
  menuItems: MenuItemData[];
  errors?: string;
}

function FormSelect({
  label,
  labelId,
  componentId,
  otherProps,
  menuItems,
  errors,
}: FormSelectProps) {
  return (
    <div className="formInput">
      <FormControl sx={{ width: 222.4, height: 56 }}>
        <InputLabel
          color={errors ? "error" : "success"}
          className="inputLabel"
          id="select-item"
        >
          {label}
        </InputLabel>
        <Select
          color={errors ? "error" : "success"}
          className="select"
          labelId={labelId}
          id={componentId}
          label={label}
          {...otherProps}
        >
          {menuItems.map((x) => (
            <MenuItem key={x.id} value={x.id}>
              {x.text}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      {errors && <p className="errorMessage">{errors}</p>}
    </div>
  );
}

export default FormSelect;

import { yupResolver } from "@hookform/resolvers/yup";
import { Button } from "@mui/material";
import {
  Control,
  FieldValues,
  FormState,
  useForm,
  UseFormRegister,
} from "react-hook-form";
import * as yup from "yup";
import SendIcon from "@mui/icons-material/Send";
import open, { close } from ".";
import LocalizedText from "../services/LocalizationService";
import "../forms/new.scss";

interface Props<TFieldValue extends FieldValues> {
  schema: yup.AnyObjectSchema;
  FormContent: (
    register: UseFormRegister<TFieldValue>,
    state: FormState<TFieldValue>,
    control: Control<TFieldValue, any>,
  ) => JSX.Element;
  onSubmit: (item: TFieldValue) => void;
  id: string;
  title: string;
}

function openForm<TFieldValue extends FieldValues>(props: Props<TFieldValue>) {
  return open({
    id: props.id,
    title: props.title,
    Content: () => FormDialogView(props),
  });
}

export function FormDialogView<TFieldValue extends FieldValues>({
  schema,
  FormContent,
  onSubmit,
  id,
}: Props<TFieldValue>) {

  const { handleSubmit, register, formState, control } = useForm<TFieldValue>({
    resolver: yupResolver(schema),
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {FormContent(register, formState, control)}
      <div className="buttons">
        <Button
          color="success"
          variant="contained"
          type="submit"
          endIcon={<SendIcon />}
        >
          {LocalizedText.Submit}
        </Button>
        <Button color="error" variant="contained" onClick={() => close(id)}>
          {LocalizedText.Close}
        </Button>
      </div>
    </form>
  );
}

export default openForm;

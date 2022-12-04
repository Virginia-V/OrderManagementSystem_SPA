import { createContext } from "react";

export interface EditModeContextValue {
  isEditMode: boolean;
  updateState: (newState: boolean) => void
}

const EditModeContext = createContext({} as EditModeContextValue);
export default EditModeContext;
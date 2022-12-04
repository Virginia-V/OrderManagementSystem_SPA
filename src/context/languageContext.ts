import { createContext } from "react";

export interface LanguageContextValue {
  currentLanguage: string;
  updateLanguage: (language: string) => void;
}

const LanguageContext = createContext({} as LanguageContextValue);

export default LanguageContext;

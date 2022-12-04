import { useState } from "react";
import "./App.scss";
import "react-toastify/dist/ReactToastify.css";
import LocalizedText, { setLanguage } from "../services/LocalizationService";
import LanguageContext from "../context/languageContext";
import EditModeContext from "../context/editModeContext";
import { Routing } from "../pages";

const App = () => {
  const [language, setLanguageState] = useState(LocalizedText.getLanguage());
  const [isEditMode, setIsEditMode] = useState(false);

  const updateLanguage = (newLanguage: string) => {
    setLanguage(newLanguage);
    setLanguageState(newLanguage);
    const event = new CustomEvent("languageChanged", {
      detail: { language: newLanguage },
    });
    document.dispatchEvent(event);
  };
  
  return (
    <LanguageContext.Provider
      value={{ currentLanguage: language, updateLanguage: updateLanguage }}
    >
      <EditModeContext.Provider
        value={{ isEditMode: isEditMode, updateState: setIsEditMode }}
      >
        <Routing />
      </EditModeContext.Provider>
    </LanguageContext.Provider>
  );
};

export default App;

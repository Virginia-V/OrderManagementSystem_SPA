import { useContext, useState } from "react";
import { languages } from "../../constants";
import LanguageContext from "../../context/languageContext";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

export const Localization = () => {
  const languageContext = useContext(LanguageContext);
  const [value, setValue] = useState(
    languages.indexOf(languageContext.currentLanguage)
  );

  return (
    <FormControl>
      <Select
        value={value}
        onChange={(e) => {
          const newValue = +e.target.value;
          languageContext.updateLanguage(languages[newValue]);
          setValue(newValue);
        }}
        disableUnderline
        variant="standard"
      >
        {languages.map((language, index) => (
          <MenuItem disableRipple className="option" key={index} value={index}>
            <img alt={language} src={require(`../../assets/${language}.png`)} />
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

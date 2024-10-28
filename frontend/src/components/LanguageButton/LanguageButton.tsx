import React from "react";
import {
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  SelectChangeEvent,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import { CardSx } from "../../styles/sxStyles";

const LanguageSelector: React.FC = () => {
  const { i18n } = useTranslation();

  const handleChange = (event: SelectChangeEvent<string>) => {
    const newLanguage = event.target.value as string;
    i18n.changeLanguage(newLanguage);
  };

  return (
    <FormControl variant="outlined" sx={CardSx.navbar.languageButton}>
      <Select
        labelId="language-select-label"
        value={i18n.language}
        onChange={(e) => handleChange(e)}
        sx={CardSx.navbar.select}
      >
        <MenuItem sx={CardSx.navbar.item} value="en">en</MenuItem>
        <MenuItem value="he">he</MenuItem>
      </Select>
    </FormControl>
  );
};

export default LanguageSelector;

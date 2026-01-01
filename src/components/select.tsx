"use client";

import {
  FormControl,
  InputLabel,
  Select as MuiSelect,
  MenuItem,
  FormHelperText,
  SelectProps as MuiSelectProps,
} from "@mui/material";
import { forwardRef } from "react";

interface SelectOption {
  value: string | number;
  label: string;
}

type SelectProps = Omit<MuiSelectProps, "error"> & {
  options: SelectOption[];
  errorMessage?: string;
  helperText?: string;
};

const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ options, errorMessage, helperText, label, ...props }, ref) => {
    return (
      <FormControl fullWidth error={!!errorMessage} sx={{ mb: 2 }}>
        <InputLabel>{label}</InputLabel>
        <MuiSelect {...props} label={label} inputRef={ref}>
          {options.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </MuiSelect>
        {(errorMessage || helperText) && (
          <FormHelperText>{errorMessage || helperText}</FormHelperText>
        )}
      </FormControl>
    );
  }
);

Select.displayName = "Select";

export default Select;

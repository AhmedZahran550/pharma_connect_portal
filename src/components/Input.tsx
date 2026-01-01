"use client";

import { TextField, TextFieldProps } from "@mui/material";
import { forwardRef } from "react";

type InputProps = TextFieldProps & {
  errorMessage?: string;
};

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ errorMessage, ...props }, ref) => {
    return (
      <TextField
        {...props}
        inputRef={ref}
        error={!!errorMessage}
        helperText={errorMessage || props.helperText}
        fullWidth
        variant="outlined"
        sx={{
          mb: 2,
          ...props.sx,
        }}
      />
    );
  }
);

Input.displayName = "Input";

export default Input;

import { TextField } from "@mui/material";
import { FC } from "react";
import { Controller, useFormContext } from "react-hook-form";

type Props = {
  defaultValue?: string;
  label?: string;
  name: string;
  type?: "email" | "text" | "password" | "number";
  placeholder?: string;
  readOnly?: boolean;
  variant?: "outlined" | "standard" | "filled" | undefined;
};

const IInput: FC<Props> = ({
  defaultValue = "",
  label,
  name,
  type = "text",
  placeholder,
  readOnly = false,
  variant = "outlined",
}) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <TextField
          {...field}
          defaultValue={defaultValue}
          type={type}
          variant={variant}
          label={label}
          placeholder={placeholder}
          className="rounded-none my-4"
          error={!!errors[name]}
          helperText={errors[name] ? errors[name].message : ""}
          inputProps={{ readOnly }}
        ></TextField>
      )}
    />
  );
};

export default IInput;

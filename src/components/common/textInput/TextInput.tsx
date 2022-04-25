import { TextField } from "@mui/material";
import { FC } from "react";

type Props = {
  name: string;
  value: string;
  label: string;
  error?: string;
  onChange?(): void;
};

const IInput: FC<Props> = ({ error, name, value, label, onChange }) => {
  return (
    <TextField
      variant="outlined"
      name={name}
      value={value}
      label={label}
      onChange={onChange}
      {...(!!error && { error: true, helperText: error })}
    ></TextField>
  );
};

export default IInput;

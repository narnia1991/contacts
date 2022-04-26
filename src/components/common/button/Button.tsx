import { FC } from "react";
import { Button } from "@mui/material";

type Props = {
  color?:
    | "inherit"
    | "primary"
    | "secondary"
    | "success"
    | "error"
    | "info"
    | "warning"
    | undefined;
  onClick?(): void;
  size?: "small" | "large" | "medium" | undefined;
  text: string;
  type?: "submit" | "button";
  variant?: "text" | "outlined" | "contained" | undefined;
};

const IButton: FC<Props> = ({
  color,
  onClick,
  size,
  text,
  type = "button",
  variant,
  ...props
}) => {
  return (
    <Button
      variant={variant || "outlined"}
      size={size || "large"}
      color={color || "primary"}
      onClick={onClick}
      className="rounded-none my-4 mx-2"
      type={type}
      {...props}
    >
      {text}
    </Button>
  );
};

export default IButton;

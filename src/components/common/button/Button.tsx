import { FC } from "react";
import { Button } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { NONAME } from "dns";

const useStyles = makeStyles((theme: any) => ({
  root: {
    margin: theme.spacing * 0.5,
    borderRadius: 0,
  },
}));

type Props = {
  text: string;
  size?: "small" | "large" | "medium" | undefined;
  color?:
    | "inherit"
    | "primary"
    | "secondary"
    | "success"
    | "error"
    | "info"
    | "warning"
    | undefined;
  variant?: "text" | "outlined" | "contained" | undefined;
  onClick?(): void;
};

const IButton: FC<Props> = ({
  text,
  size,
  color,
  variant,
  onClick,
  ...props
}) => {
  const classes = useStyles();

  return (
    <Button
      variant={variant || "outlined"}
      size={size || "large"}
      color={color || "primary"}
      onClick={onClick}
      classes={classes}
      {...props}
    >
      {text}
    </Button>
  );
};

export default IButton;

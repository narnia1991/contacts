import { FC, ReactNode } from "react";
import {
  FieldValues,
  SubmitHandler,
  useForm,
  useFormContext,
} from "react-hook-form";

type Props = {
  children: ReactNode;
  onSubmit: SubmitHandler<FieldValues>;
};

const IForm: FC<Props> = ({ onSubmit, children }) => {
  const { handleSubmit } = useFormContext();

  return (
    <form
      autoComplete="none"
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col"
    >
      {children}
    </form>
  );
};
export default IForm;

import { FC, useCallback, useEffect, useState } from "react";
import { FieldValues, FormProvider, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import IButton from "../common/button/Button";
import IForm from "../common/form/Form";
import IInput from "../common/input/Input";
import DiscardChangesModal from "./modals/DiscardChangesModal";
import { To, useLocation, useNavigate } from "react-router-dom";
import { Box } from "@mui/system";
import { BackspaceOutlined } from "@mui/icons-material";
import { Contact } from "../types";

const nameRegex = /[a-zA-Z\xC0-\uFFFF]/;

const numberRegex = /[0-9+()]/;

export interface IFormInputs {
  firstName: string;
  lastName?: string;
  contact: string;
  email: string;
  note: string;
}

export const Schema = yup.object({
  firstName: yup
    .string()
    .matches(nameRegex, "Please enter valid name")
    .required("Please input first name"),
  lastName: yup.string().matches(nameRegex, "Please enter valid name"),
  contact: yup
    .string()
    .min(7, "Please enter valid phone number")
    .max(18, "Please enter valid phone number")
    .matches(numberRegex, "Please enter valid phone number")
    .required("Please input contact number"),
  email: yup.string().email("Please enter a valid email"),
  note: yup.string(),
});

type Props = {
  onSubmit(data: FieldValues): void;
  backUrl?: To;
  initialValues?: Contact;
  buttonText?: string;
  readOnly?: boolean;
  variant?: "outlined" | "standard" | "filled" | undefined;
};

const ContactForm: FC<Props> = ({
  backUrl,
  buttonText,
  initialValues,
  onSubmit,
  readOnly,
  variant,
}) => {
  const [isDiscardModalOpen, setIsDiscardModalOpen] = useState(false);
  const navigate = useNavigate();

  const methods = useForm<IFormInputs>({
    mode: "onChange",
    reValidateMode: "onChange",
    resolver: yupResolver(Schema),
    defaultValues: JSON.parse(localStorage.getItem("contact") || "{}"),
  });

  const handleModalClose = useCallback(() => {
    setIsDiscardModalOpen(false);
  }, []);

  const removeLocalStore = () => {
    localStorage.removeItem("contact");
  };

  const handleBackClick = () => {
    if (Object.values(methods.formState.dirtyFields).length) {
      setIsDiscardModalOpen(true);
    } else {
      if (backUrl) {
        removeLocalStore();
        navigate(backUrl, { replace: true });
      }
    }
  };

  useEffect(() => {
    localStorage.setItem(
      "contact",
      JSON.stringify({ ...initialValues, ...methods.getValues() })
    );
  }, [methods.watch(["firstName", "lastName", "email", "contact", "note"])]);

  useEffect(() => {
    return () => {
      removeLocalStore();
      methods.reset();
    };
  }, []);

  return (
    <FormProvider {...methods}>
      <DiscardChangesModal
        isOpen={isDiscardModalOpen}
        onClose={handleModalClose}
      />
      <Box sx={{ cursor: "pointer" }} onClick={handleBackClick}>
        <BackspaceOutlined
          className="text-slate-400"
          sx={{ "&:hover": { color: "#000" } }}
        />
      </Box>

      <IForm onSubmit={onSubmit}>
        <IInput
          defaultValue={initialValues?.firstName}
          name="firstName"
          label="First Name"
          readOnly={readOnly}
          variant={variant}
        />
        <IInput
          defaultValue={initialValues?.lastName}
          name="lastName"
          label="Last Name"
          readOnly={readOnly}
          variant={variant}
        />
        <IInput
          defaultValue={initialValues?.contact}
          name="contact"
          label="Contact"
          readOnly={readOnly}
          variant={variant}
        ></IInput>
        <IInput
          defaultValue={initialValues?.email}
          name="email"
          label="Email"
          readOnly={readOnly}
          variant={variant}
        ></IInput>
        <IInput
          defaultValue={initialValues?.note}
          name="note"
          label="Note"
          readOnly={readOnly}
          variant={variant}
        ></IInput>
        {buttonText ? (
          <IButton text={buttonText} type="submit"></IButton>
        ) : (
          <></>
        )}
      </IForm>
    </FormProvider>
  );
};

export default ContactForm;

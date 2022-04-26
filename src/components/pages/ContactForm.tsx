import { FC, useCallback, useEffect, useState } from "react";
import { FieldValues, FormProvider, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import IButton from "../common/button/Button";
import IForm from "../common/form/Form";
import IInput from "../common/input/Input";
import DiscardChangesModal from "./modals/DiscardChangesModal";
import { To, useNavigate } from "react-router-dom";
import { Box } from "@mui/system";
import { BackspaceOutlined } from "@mui/icons-material";

const nameRegex = /[a-zA-Z\xC0-\uFFFF]/;

const numberRegex = /[0-9+()]/;

export interface IFormInputs {
  firstName: string;
  lastName?: string;
  contact: string;
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
};

const ContactForm: FC<Props> = ({ backUrl, onSubmit }) => {
  const [isDiscardModalOpen, setIsDiscardModalOpen] = useState(false);
  const navigate = useNavigate();

  const methods = useForm<IFormInputs>({
    mode: "onChange",
    reValidateMode: "onChange",
    resolver: yupResolver(Schema),
  });

  const handleModalClose = useCallback(() => {
    setIsDiscardModalOpen(false);
  }, []);

  const handleBackClick = () => {
    if (Object.values(methods.formState.dirtyFields).length) {
      setIsDiscardModalOpen(true);
    } else {
      if (backUrl) {
        navigate(backUrl, { replace: true });
      }
    }
  };

  useEffect(() => {
    return () => {
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
        <IInput name="firstName" label="First Name" />
        <IInput name="lastName" label="Last Name" />
        <IInput name="contact" label="Contact"></IInput>
        <IInput name="email" label="Email"></IInput>
        <IInput name="note" label="Note"></IInput>
        <IButton text="Create Contact" type="submit"></IButton>
      </IForm>
    </FormProvider>
  );
};

export default ContactForm;

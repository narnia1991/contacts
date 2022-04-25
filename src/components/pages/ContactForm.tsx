import { FC, useCallback } from "react";
import { Paper } from "@mui/material";
import { FormProvider, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import IButton from "../common/button/Button";
import IForm from "../common/form/Form";
import IInput from "../common/input/Input";

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
});

const ContactForm: FC = () => {
  const methods = useForm<IFormInputs>({
    mode: "onChange",
    reValidateMode: "onChange",
    resolver: yupResolver(Schema),
  });

  const submitForm = useCallback(() => {
    console.log("Submit!");
  }, []);

  return (
    <Paper variant="outlined" className="my-4 mx-auto p-4 max-w-xl self-center	">
      <FormProvider {...methods}>
        <IForm onSubmit={submitForm}>
          <IInput name="firstName" label="First Name" />
          <IInput name="lastName" label="Last Name" />
          <IInput name="contact" label="Contact"></IInput>
          <IButton text="Create Contact" type="submit"></IButton>
        </IForm>
      </FormProvider>
    </Paper>
  );
};

export default ContactForm;

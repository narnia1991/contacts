import { FC, useEffect } from "react";
import { FieldValues, FormProvider, useForm } from "react-hook-form";
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
  email: yup.string().email("Please enter a valid email"),
  note: yup.string(),
});

type Props = {
  onSubmit(data: FieldValues): void;
};

const ContactForm: FC<Props> = ({ onSubmit }) => {
  const methods = useForm<IFormInputs>({
    mode: "onChange",
    reValidateMode: "onChange",
    resolver: yupResolver(Schema),
  });

  useEffect(() => {
    return methods.reset();
  }, []);

  return (
    <FormProvider {...methods}>
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

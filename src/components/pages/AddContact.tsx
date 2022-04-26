import { addDoc, collection } from "firebase/firestore";
import { FC, useState } from "react";
import { FieldValues } from "react-hook-form";

import ContactForm from "./ContactForm";
import { db } from "../../firebase";
import { contactToData, generateKeywords } from "../helpers";
import SuccessModal from "./modals/SuccessModal";
import { Paper } from "@mui/material";

const AddContact: FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const contactsRef = collection(db, "contacts");

  const handleFormSubmit = async (data: FieldValues) => {
    const keywords = generateKeywords([data.firstName, data.lastName]);

    try {
      await addDoc(contactsRef, {
        ...contactToData(data),
        isStarred: false,
        keywords,
      });
      setIsModalOpen(true);
    } catch (err) {
      console.log(err);
    }
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  return (
    <Paper variant="outlined" className="my-4 mx-auto p-4 max-w-xl self-center">
      <SuccessModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        to="/"
        message="Contact saved successfuly!"
      />
      <ContactForm
        onSubmit={handleFormSubmit}
        backUrl={"/"}
        buttonText="Create Contact"
      />
    </Paper>
  );
};

export default AddContact;

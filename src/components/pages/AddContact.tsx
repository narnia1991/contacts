import { addDoc, collection } from "firebase/firestore";
import { FC, useCallback, useState } from "react";
import { FieldValues } from "react-hook-form";

import ContactForm from "./ContactForm";
import { db } from "../../firebase";
import { contactToData, generateKeywords } from "../helpers";
import AddContactModal from "./modals/AddContactModal";
import { BackspaceOutlined } from "@mui/icons-material";
import { Box } from "@mui/system";
import { Paper } from "@mui/material";

const AddContact: FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isQuitModalOpen, setIsQuitModalOpen] = useState(false);
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

  const handleBackClick = useCallback(() => {
    setIsQuitModalOpen(true);
  }, []);

  return (
    <Paper variant="outlined" className="my-4 mx-auto p-4 max-w-xl self-center">
      <Box onClick={handleBackClick} sx={{ cursor: "pointer" }}>
        <BackspaceOutlined
          className="text-slate-400"
          sx={{ "&:hover": { color: "#000" } }}
        />
      </Box>
      <AddContactModal isOpen={isModalOpen} onClose={handleModalClose} />
      <ContactForm onSubmit={handleFormSubmit} />
    </Paper>
  );
};

export default AddContact;

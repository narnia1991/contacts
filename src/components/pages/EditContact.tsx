import {
  addDoc,
  collection,
  doc,
  documentId,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { FC, useCallback, useEffect, useState } from "react";
import { FieldValues } from "react-hook-form";

import ContactForm, { IFormInputs } from "./ContactForm";
import { db } from "../../firebase";
import { contactToData, dataToContacts, generateKeywords } from "../helpers";
import SuccessModal from "./modals/SuccessModal";
import { BackspaceOutlined } from "@mui/icons-material";
import { Box } from "@mui/system";
import { Paper } from "@mui/material";
import { Link } from "react-router-dom";
import NoRecords from "./NoRecords";
import { Contact } from "../types";

const EditContact: FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [contact, setContact] = useState<Contact>();
  const contactsRef = collection(db, "contacts");

  useEffect(() => {
    const route = window.location.pathname.split("/");
    const id = route[1];
    if (!id || route[2] !== "edit") {
      return;
    }

    const loadContact = async () => {
      const data = await getDocs(
        query(collection(db, "contacts"), where(documentId(), "==", id))
      );
      setContact({ ...dataToContacts(data.docs[0].data(), data.docs[0].id) });
    };

    loadContact();
  }, []);

  const handleFormSubmit = async (data: FieldValues) => {
    const keywords = generateKeywords([data.firstName, data.lastName]);
    if (!!contact && contact.id) {
      const oldDataRef = doc(db, "contacts", contact?.id);

      try {
        await updateDoc(oldDataRef, {
          ...contactToData(data),
          isStarred: false,
          keywords,
        });
        setIsModalOpen(true);
      } catch (err) {
        console.log(err);
      }
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
        message="Contact updated successfuly!"
      />
      {contact ? (
        <ContactForm
          onSubmit={handleFormSubmit}
          backUrl={`/${contact.id}`}
          buttonText="Update Contact"
          initialValues={contact}
        />
      ) : (
        <NoRecords />
      )}
    </Paper>
  );
};

export default EditContact;

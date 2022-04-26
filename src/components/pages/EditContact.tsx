import {
  collection,
  doc,
  documentId,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { FC, useEffect, useState } from "react";
import { FieldValues } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import ContactForm from "./ContactForm";
import { db } from "../../firebase";
import { contactToData, dataToContacts, generateKeywords } from "../helpers";
import SuccessModal from "./modals/SuccessModal";
import { Paper } from "@mui/material";
import NoRecords from "./NoRecords";
import { Contact } from "../types";
import DeleteContactModal from "./modals/DeleteContactModal";

const EditContact: FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteContactModalOpen, setIsDeleteContactModalOpen] =
    useState(false);
  const [contact, setContact] = useState<Contact>();
  const contactsRef = collection(db, "contacts");
  const navigate = useNavigate();

  const route = window.location.pathname.split("/");
  const id = route[1];

  useEffect(() => {
    if (!id || (route[2] !== "edit" && route[2] !== "delete")) {
      return;
    }

    if (id && route[2] === "delete") {
      setIsDeleteContactModalOpen(true);
    }

    const loadContact = async () => {
      const data = await getDocs(
        query(contactsRef, where(documentId(), "==", id))
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
      <DeleteContactModal
        isOpen={isDeleteContactModalOpen}
        onClose={() => navigate(-1)}
      />
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

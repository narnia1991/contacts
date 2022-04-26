import { getDocs } from "firebase/firestore";
import { FC, useEffect, useState } from "react";

import ContactForm from "./ContactForm";
import { dataToContacts } from "../helpers";
import { Paper } from "@mui/material";
import NoRecords from "./NoRecords";
import { Contact } from "../types";
import { getContact } from "./queries";

const ViewContact: FC = () => {
  const [contact, setContact] = useState<Contact>();

  const route = window.location.pathname.split("/");
  const id = route[1];

  useEffect(() => {
    if (!id) {
      return;
    }

    const loadContact = async () => {
      const data = await getDocs(getContact(id));
      setContact({ ...dataToContacts(data.docs[0].data(), data.docs[0].id) });
    };

    loadContact();
  }, []);

  return (
    <Paper variant="outlined" className="my-4 mx-auto p-4 max-w-xl self-center">
      {contact ? (
        <ContactForm
          onSubmit={() => {}}
          backUrl={"/"}
          buttonText=""
          initialValues={contact}
          readOnly
          variant="standard"
        />
      ) : (
        <NoRecords />
      )}
    </Paper>
  );
};

export default ViewContact;

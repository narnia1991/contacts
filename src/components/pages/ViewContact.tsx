import { getDocs } from "firebase/firestore";
import { FC, useEffect, useState } from "react";

import ContactForm from "./ContactForm";
import { dataToContacts } from "../helpers";
import { Box, Paper } from "@mui/material";
import NoRecords from "./NoRecords";
import { Contact } from "../types";
import { getContact } from "./queries";
import { DeleteOutline, EditOutlined } from "@mui/icons-material";
import { Link } from "react-router-dom";

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
      <Box className="flex justify-end">
        <Link to={`/${id}/edit`} onClick={(e) => e.stopPropagation()}>
          <EditOutlined
            className="text-slate-400"
            sx={{
              cursor: "pointer",
              "&:hover": {
                color: "#00F",
              },
            }}
          />
        </Link>

        <Link to={`/${id}/delete`} onClick={(e) => e.stopPropagation()}>
          <DeleteOutline
            className="text-slate-400"
            sx={{
              cursor: "pointer",
              "&:hover": {
                color: "#F00",
              },
            }}
          />
        </Link>
      </Box>
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

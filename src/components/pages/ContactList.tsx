import { Paper } from "@mui/material";
import {
  collection,
  DocumentData,
  getDocs,
  limit,
  orderBy,
  query,
  QueryDocumentSnapshot,
} from "firebase/firestore";
import { FC, useEffect, useState } from "react";
import { db } from "../../firebase";
import { dataToContacts } from "../helpers";
import { Contact } from "../types";

const ContactList: FC = () => {
  const [contacts, setContacts] = useState<Array<Contact>>([]);
  const [lastVisible, setLastVisible] =
    useState<QueryDocumentSnapshot<DocumentData>>();

  useEffect(() => {
    const contactsCollectionRef = collection(db, "contacts");
    const first = query(contactsCollectionRef, orderBy("firstName"), limit(25));
    const fetchInitialData = async () => {
      const documentSnapshots = await getDocs(first);

      const last = documentSnapshots.docs[documentSnapshots.docs.length - 1];
      setContacts(
        documentSnapshots.docs.map((entry: any) =>
          dataToContacts(entry.data(), entry.id)
        )
      );

      setLastVisible(last);
    };

    fetchInitialData();
  }, []);

  return (
    <Paper variant="outlined">
      {contacts?.map((entry: Contact) => (
        <div key={`${entry.firstName}${entry.contact}`}>
          <div>{entry.firstName}</div>
          <div>{entry?.lastName}</div>
          <div>{entry?.email}</div>
          <div>{entry.contact}</div>
          <div>{entry?.avatar}</div>
          <div>{entry?.note}</div>
          <div>{entry.isStarred}</div>
        </div>
      ))}
    </Paper>
  );
};

export default ContactList;

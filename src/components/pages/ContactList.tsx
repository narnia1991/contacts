import { FC, useCallback, useEffect, useState } from "react";
import { Box, Grid, Paper } from "@mui/material";
import { Link } from "react-router-dom";
import {
  collection,
  DocumentData,
  getDocs,
  limit,
  orderBy,
  query,
  QueryDocumentSnapshot,
  startAfter,
} from "firebase/firestore";
import InfiniteScroll from "react-infinite-scroller";
import { DeleteOutline, EditOutlined } from "@mui/icons-material";

import { db } from "../../firebase";
import { dataToContacts, randomizeBg } from "../helpers";
import { Contact } from "../types";
import IButton from "../common/button/Button";

const ContactList: FC = () => {
  const [contacts, setContacts] = useState<Array<Contact>>([]);
  const [lastVisible, setLastVisible] =
    useState<QueryDocumentSnapshot<DocumentData>>();
  const [lastDocument, setLastDocument] = useState<Contact>();
  const [hasMore, setHasMore] = useState(true);

  const contactsCollectionRef = collection(db, "contacts");

  const checkHasMore = useCallback(() => {
    if (
      !!lastVisible &&
      !!lastDocument &&
      lastVisible?.id === lastDocument?.id
    ) {
      setHasMore(false);
    }
  }, []);

  useEffect(() => {
    const first = query(contactsCollectionRef, orderBy("firstName"), limit(10));
    const fetchInitialData = async () => {
      const documentSnapshots = await getDocs(first);

      const last = documentSnapshots.docs[documentSnapshots.docs.length - 1];
      setContacts(
        documentSnapshots.docs.map((entry: any) =>
          dataToContacts(entry.data(), entry.id)
        )
      );

      setLastVisible(last);

      const end = query(
        contactsCollectionRef,
        orderBy("firstName", "desc"),
        limit(1)
      );
      const lastDoc = await getDocs(end);

      setLastDocument(
        dataToContacts(
          (lastDoc as any).docs[0].data(),
          (lastDoc as any).docs[0].id
        )
      );

      checkHasMore();
    };

    fetchInitialData();
  }, []);

  const loadMore = useCallback(async () => {
    if (lastVisible && hasMore) {
      const more = query(
        contactsCollectionRef,
        orderBy("firstName"),
        startAfter(lastVisible),
        limit(10)
      );
      const documentSnapshots = await getDocs(more);

      const last = documentSnapshots.docs[documentSnapshots.docs.length - 1];

      const newArr = [
        ...contacts,
        ...documentSnapshots.docs.map((entry: any) =>
          dataToContacts(entry.data(), entry.id)
        ),
      ];

      setContacts(newArr);
      setLastVisible(last);

      checkHasMore();
    }
  }, []);

  const handleAddClick = () => {};

  return (
    <>
      <Paper
        variant="outlined"
        className="rounded-none my-4 mx-auto p-4 max-w-xl self-center flex justify-between sticky top-0"
      >
        <div></div>
        <Link to="/add">
          <IButton text="Add" />
        </Link>
      </Paper>
      <InfiniteScroll
        pageStart={0}
        loadMore={loadMore}
        loader={
          !!hasMore && (
            <Paper
              variant="outlined"
              className="rounded-none my-4 mx-auto p-4 max-w-xl self-center flex"
            >
              <Box className="font-bold justify-center">...Loading</Box>
            </Paper>
          )
        }
      >
        {!!contacts ? (
          contacts.map((entry: Contact) => (
            <Paper
              key={`${entry.firstName}${entry.contact}`}
              variant="outlined"
              className="rounded-none my-4 mx-auto p-4 max-w-xl self-center flex"
            >
              <Grid container spacing={2} sx={{ cursor: "pointer" }}>
                <Grid item xs={2}>
                  {entry.avatar ? (
                    <img
                      src={`${entry.avatar}`}
                      alt={""}
                      loading="lazy"
                      className="rounded-full"
                    />
                  ) : (
                    <Box
                      className="rounded-full h-16 w-16 flex items-center justify-center"
                      sx={{ backgroundColor: randomizeBg() }}
                    >
                      <h1 className="text-white font-bold">
                        {entry.firstName.charAt(0)}
                        {entry.lastName?.charAt(0)}
                      </h1>
                    </Box>
                  )}
                </Grid>

                <Grid item xs={10}>
                  <div className="flex justify-end">
                    <Link to={`/${entry.id}/edit`}>
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

                    <Link to={`/${entry.id}/delete`}>
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
                  </div>
                  <div className="font-bold">
                    {entry.firstName} {entry?.lastName}
                  </div>
                  <div>{entry.contact}</div>
                </Grid>
              </Grid>
            </Paper>
          ))
        ) : (
          <Paper
            key="noRecord"
            variant="outlined"
            className="rounded-none my-4 mx-auto p-4 max-w-xl self-center flex"
          >
            <Box className="font-bold">No Records Found</Box>
          </Paper>
        )}
      </InfiniteScroll>
    </>
  );
};

export default ContactList;

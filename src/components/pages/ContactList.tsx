import { FC, RefObject, useCallback, useEffect, useRef, useState } from "react";
import { Box, Grid, Paper, TextField } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import {
  doc,
  DocumentData,
  getDocs,
  QueryDocumentSnapshot,
  updateDoc,
} from "firebase/firestore";
import {
  DeleteOutline,
  EditOutlined,
  StarOutline,
  StarTwoTone,
} from "@mui/icons-material";
import debounce from "lodash.debounce";
import InfiniteScroll from "react-infinite-scroller";

import {
  defaultGetLastDoc,
  defaultGetMore,
  defaultQuery,
  searchGetMore,
  searchLast,
  searchQuery,
  starGetMore,
  starLast,
  starQuery,
  starSearchQuery,
} from "./queries";
import { contactToData, dataToContacts, randomizeBg } from "../helpers";
import { Contact } from "../types";
import IButton from "../common/button/Button";
import { db } from "../../firebase";

const ContactList: FC = () => {
  const [contacts, setContacts] = useState<Array<Contact>>([]);
  const [lastVisible, setLastVisible] =
    useState<QueryDocumentSnapshot<DocumentData>>();
  const [lastDocument, setLastDocument] = useState<Contact>();
  const [hasMore, setHasMore] = useState(true);
  const [searchString, setSearchString] = useState("");
  const [isStarActive, setIsStarActive] = useState(false);

  const searchRef: RefObject<any> = useRef(null);
  const navigate = useNavigate();

  const checkHasMore = useCallback(() => {
    if (
      !!lastVisible &&
      !!lastDocument &&
      lastVisible?.id === lastDocument?.id
    ) {
      setHasMore(false);
    }
  }, []);

  const loadMore = useCallback(async () => {
    if (lastVisible && hasMore) {
      try {
        let more;
        switch (true) {
          case isStarActive && !!searchString:
            more = starSearchQuery(searchString);
            break;
          case !!searchString:
            more = searchGetMore(searchString, lastVisible);
            break;
          case isStarActive:
            more = starGetMore(lastVisible);
            break;

          default:
            more = defaultGetMore(lastVisible);
            break;
        }

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
      } catch (err) {
        console.log(err);
      }
    }
  }, [lastVisible, hasMore]);

  const search = debounce(() => {
    const searchString = searchRef.current.value;
    setSearchString(searchString);

    try {
      const fetchInitialData = async () => {
        const documentSnapshots = await getDocs(searchQuery(searchString));

        const last = documentSnapshots.docs[documentSnapshots.docs.length - 1];
        setLastVisible(last);

        setContacts(
          documentSnapshots.docs.map((entry: any) =>
            dataToContacts(entry.data(), entry.id)
          )
        );

        const lastDoc = await getDocs(searchLast(searchString));

        setLastDocument(
          dataToContacts(
            (lastDoc as any).docs[0].data(),
            (lastDoc as any).docs[0].id
          )
        );

        checkHasMore();
      };

      fetchInitialData();
    } catch (err) {
      console.log(err);
    }
  }, 500);

  const toggleStar = () => {
    setIsStarActive(!isStarActive);
  };

  const handleCardClick = useCallback((id: string) => {
    navigate(`/${id}`);
  }, []);

  const handleCardStarClick = async (e: any, id: string) => {
    e.stopPropagation();

    const oldDataRef = doc(db, "contacts", id);
    const contact = contacts.filter((e) => e.id === id)[0];
    let index = contacts.indexOf(contact);
    try {
      await updateDoc(oldDataRef, {
        ...contactToData(contact),
        isStarred: !contact.isStarred,
      });

      setContacts(
        contacts.splice(index, 1, {
          ...contact,
          isStarred: !contact.isStarred,
        })
      );
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (isStarActive) {
      try {
        const fetchStarredList = async () => {
          const documentSnapshots = await getDocs(starQuery());

          const last =
            documentSnapshots.docs[documentSnapshots.docs.length - 1];
          setLastVisible(last);

          setContacts(
            documentSnapshots.docs.map((entry: any) =>
              dataToContacts(entry.data(), entry.id)
            )
          );

          const lastDoc = await getDocs(starLast());

          setLastDocument(
            dataToContacts(
              (lastDoc as any).docs[0].data(),
              (lastDoc as any).docs[0].id
            )
          );

          checkHasMore();
        };

        fetchStarredList();
      } catch (err) {
        console.log(err);
      }
    }
  }, [isStarActive]);

  useEffect(() => {
    try {
      const fetchInitialData = async () => {
        const documentSnapshots = await getDocs(defaultQuery);

        const last = documentSnapshots.docs[documentSnapshots.docs.length - 1];
        setLastVisible(last);

        setContacts(
          documentSnapshots.docs.map((entry: any) =>
            dataToContacts(entry.data(), entry.id)
          )
        );

        const lastDoc = await getDocs(defaultGetLastDoc);

        setLastDocument(
          dataToContacts(
            (lastDoc as any).docs[0].data(),
            (lastDoc as any).docs[0].id
          )
        );

        checkHasMore();
      };

      fetchInitialData();
    } catch (err) {
      console.log(err);
    }
  }, []);

  return (
    <>
      <Paper
        variant="outlined"
        className="rounded-none my-4 mx-auto p-4 max-w-xl self-center flex justify-between items-center sticky top-0"
      >
        <TextField
          name="search"
          onChange={search}
          variant="outlined"
          label="Search"
          inputRef={searchRef}
        />
        <Box className="flex justify-end px-4 flex-1">
          {isStarActive ? (
            <StarTwoTone className="text-yellow-400" onClick={toggleStar} />
          ) : (
            <StarOutline onClick={toggleStar} />
          )}
        </Box>
        <Link to="/add">
          <IButton text="Add" />
        </Link>
      </Paper>
      <InfiniteScroll
        pageStart={0}
        loadMore={loadMore}
        hasMore={!!hasMore}
        loader={
          !!hasMore && (
            <Paper
              variant="outlined"
              className="rounded-none my-4 mx-auto p-4 max-w-xl flex"
            >
              <Box className="font-bold justify-center">Loading...</Box>
            </Paper>
          )
        }
      >
        {contacts.map((entry: Contact) => (
          <Paper
            key={`${entry.firstName}${entry.contact}`}
            variant="outlined"
            className="rounded-none my-4 mx-auto p-4 max-w-xl self-center flex"
            onClick={() => handleCardClick(entry.id)}
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
                <Box className="flex justify-end">
                  <Link
                    to={`/${entry.id}/edit`}
                    onClick={(e) => e.stopPropagation()}
                  >
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

                  <Link
                    to={`/${entry.id}/delete`}
                    onClick={(e) => e.stopPropagation()}
                  >
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
                <Box className="font-bold">
                  {entry.firstName} {entry?.lastName}
                </Box>
                <Box className="flex justify-between">
                  {entry.contact}
                  <Box
                    className="flex justify-end px-4 flex-1"
                    // onClick={(e: any) => handleCardStarClick(e, entry.id)}
                  >
                    {entry.isStarred ? (
                      <StarTwoTone className="text-yellow-400" />
                    ) : (
                      <StarOutline />
                    )}
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </Paper>
        ))}
      </InfiniteScroll>
    </>
  );
};

export default ContactList;

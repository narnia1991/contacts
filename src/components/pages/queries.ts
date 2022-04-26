import {
  collection,
  DocumentData,
  limit,
  orderBy,
  query,
  startAfter,
  QueryDocumentSnapshot,
  where,
  documentId,
} from "firebase/firestore";
import { db } from "../../firebase";

const contactsCollectionRef = collection(db, "contacts");
const getContact = (id: string) =>
  query(contactsCollectionRef, where(documentId(), "==", id));

const defaultQuery = query(
  contactsCollectionRef,
  orderBy("firstName"),
  limit(10)
);

const defaultGetLastDoc = query(
  contactsCollectionRef,
  orderBy("firstName", "desc"),
  limit(1)
);

const defaultGetMore = (lastVisible: QueryDocumentSnapshot<DocumentData>) =>
  query(
    contactsCollectionRef,
    orderBy("firstName"),
    startAfter(lastVisible),
    limit(10)
  );

const searchQuery = (search: string) =>
  query(
    contactsCollectionRef,
    orderBy("firstName"),
    where("keywords", "array-contains", search.toLowerCase()),
    limit(10)
  );

const searchLast = (search: string) =>
  query(
    contactsCollectionRef,
    orderBy("firstName", "desc"),
    where("keywords", "array-contains", search.toLowerCase()),
    limit(1)
  );

const searchGetMore = (
  search: string,
  lastVisible: QueryDocumentSnapshot<DocumentData>
) =>
  query(
    contactsCollectionRef,
    orderBy("firstName"),
    startAfter(lastVisible),
    where("keywords", "array-contains", search.toLowerCase()),
    limit(10)
  );

const starQuery = () =>
  query(
    contactsCollectionRef,
    orderBy("firstName"),
    where("isStarred", "==", true),
    limit(10)
  );

const starLast = () =>
  query(
    contactsCollectionRef,
    orderBy("firstName", "desc"),
    where("isStarred", "==", true),
    limit(1)
  );

const starGetMore = (lastVisible: QueryDocumentSnapshot<DocumentData>) =>
  query(
    contactsCollectionRef,
    orderBy("firstName"),
    where("isStarred", "==", true),
    startAfter(lastVisible),
    limit(10)
  );

const starSearchQuery = (search: string) =>
  query(
    contactsCollectionRef,
    orderBy("firstName"),
    where("isStarred", "==", true),
    where("keywords", "array-contains", search.toLowerCase()),
    limit(10)
  );

const starSearchLast = (search: string) =>
  query(
    contactsCollectionRef,
    orderBy("firstName", "desc"),
    where("isStarred", "==", true),
    where("keywords", "array-contains", search.toLowerCase()),
    limit(1)
  );

const starSearchGetMore = (
  search: string,
  lastVisible: QueryDocumentSnapshot<DocumentData>
) =>
  query(
    contactsCollectionRef,
    orderBy("firstName"),
    startAfter(lastVisible),
    where("isStarred", "==", true),
    where("keywords", "array-contains", search.toLowerCase()),
    limit(10)
  );

export {
  defaultQuery,
  defaultGetLastDoc,
  defaultGetMore,
  getContact,
  searchQuery,
  searchLast,
  searchGetMore,
  starQuery,
  starLast,
  starGetMore,
  starSearchQuery,
  starSearchLast,
  starSearchGetMore,
};

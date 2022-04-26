//medium.com/@ken11zer01/firebase-firestore-text-search-and-pagination-91a0df8131ef

import { Contact } from "./types";

export const createKeywords = (name: string) =>
  name
    .split("")
    .reduce(
      (acc: Array<string>, letter: string) => [
        ...acc,
        `${acc[acc.length - 1]}${letter}`,
      ],
      [""]
    );

export const generateKeywords = (fullName: Array<string>) => {
  const [first, last] = fullName;
  const keywordFullName = createKeywords(`${first} ${last}`);
  const keywordLastNameFirst = createKeywords(`${last} ${first}`);
  // @ts-expect-error Type 'Set<string>' is not an array type or a string type. Use compiler option '--downlevelIteration' to allow iterating of iterators
  return [...new Set(["", ...keywordFullName, ...keywordLastNameFirst])];
};

export const dataToContacts = (
  { firstName, lastName, avatar, email, contact, note, isStarred }: any,
  id: string
): Contact => ({
  id,
  firstName,
  lastName,
  avatar,
  email,
  contact,
  note,
  isStarred,
});

export const randomizeBg = () => `${
  [
    "#20B2AA",
    "#34A56F",
    "#FFA500",
    "#665D1E",
    "#5C3317",
    "#FF2400",
    "#7D0541",
    "#872657",
    "#872657",
    "#4E5180",
  ][Math.floor(Math.random() * 10)]
}
`;

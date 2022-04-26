import { Button } from "@mui/material";
import { FC, useState } from "react";
import { addDoc, collection } from "firebase/firestore";

import { db } from "../firebase";
import { createDummyData } from "./seed";

const Populate: FC = () => {
  const [data, setData] = useState<any>([]);

  const handleGenerateData = () => {
    const dummy = createDummyData(100);
    setData(dummy);
    console.log(dummy);

    const myjson = JSON.stringify(dummy, null, 2);
    const x = window.open();
    x?.document.open();
    x?.document.write("<html><body><pre>" + myjson + "</pre></body></html>");
    x?.document.close();
  };

  const handleUploadClick = () => {
    const contactsCollectionRef = collection(db, "contacts");
    if (data.length) {
      data.forEach(async (entry: any) => {
        await addDoc(contactsCollectionRef, entry);
      });
    }
  };

  return (
    <>
      <Button onClick={handleGenerateData}>Generate Data</Button>
      <Button onClick={handleUploadClick}>Upload Data</Button>
      <div>
        {data ? (
          data.forEach((entry: any) => (
            <div>
              <div>{entry.firstName}</div>
              <div>{entry.lastName}</div>
              <div>{entry.email}</div>
              <div>{entry.contact}</div>
              <div>{entry.note}</div>
              <div>{entry.avatar}</div>
            </div>
          ))
        ) : (
          <></>
        )}
      </div>
    </>
  );
};

export default Populate;

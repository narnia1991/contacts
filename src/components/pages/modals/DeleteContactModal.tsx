import { FC, useCallback, useEffect } from "react";
import { Box } from "@mui/system";

import Modal from "../../common/modal/Modal";
import IButton from "../../common/button/Button";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../../../firebase";
import { useNavigate } from "react-router-dom";

type Props = {
  isOpen: boolean;
  onClose?(): void;
};

const DeleteContactModal: FC<Props> = ({ isOpen, onClose }) => {
  const route = window.location.pathname.split("/");
  const id = route[1];
  const navigate = useNavigate();

  const handleModalClose = useCallback(() => {
    if (onClose) {
      onClose();
    }
  }, []);

  const handleDeleteContact = async () => {
    try {
      await deleteDoc(doc(db, "contacts", id));
    } catch (err) {
      console.log(err);
      // fail Gracefully
      if (onClose) {
        onClose();
      }
    } finally {
      navigate("/");
    }
  };

  useEffect(() => {
    if (!id || route[2] !== "delete") {
      navigate("/");
    }
  }, []);

  return (
    <Modal isOpen={isOpen} onClose={handleModalClose}>
      <Box className="rounded-none my-4 mx-auto p-4 max-w-xl self-center flex flex-col">
        <div>Are You Sure You Want To Delete This Contact?</div>
        <div className="flex justify-end">
          <IButton text="No" onClick={handleModalClose} />
          <IButton text="Yes" onClick={handleDeleteContact} />
        </div>
      </Box>
    </Modal>
  );
};

export default DeleteContactModal;

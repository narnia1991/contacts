import { FC } from "react";
import { Box, Paper } from "@mui/material";

import IButton from "../../common/button/Button";
import Modal from "../../common/modal/Modal";
import { Link } from "react-router-dom";

type Props = {
  isOpen?: boolean;
  onClose?(): void;
};
const AddSuccessModal: FC<Props> = ({ isOpen = false, onClose }) => {
  const handleModalClose = () => {
    if (onClose) {
      onClose();
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={handleModalClose}>
      <Box className="rounded-none my-4 mx-auto p-4 max-w-xl self-center flex flex-col">
        <div>Contact Saved Successfuly!</div>
        <div className="flex justify-end">
          <Link to="/">
            <IButton text="OK" />
          </Link>
        </div>
      </Box>
    </Modal>
  );
};
export default AddSuccessModal;

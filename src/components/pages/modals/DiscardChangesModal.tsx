import { FC } from "react";
import { Box } from "@mui/material";

import IButton from "../../common/button/Button";
import Modal from "../../common/modal/Modal";

type Props = {
  isOpen?: boolean;
  onClose?(): void;
};
const DiscardChangesModal: FC<Props> = ({ isOpen = false, onClose }) => {
  const handleModalClose = () => {
    if (onClose) {
      onClose();
    }
  };

  const handleQuit = () => {
    window.location.href = "/";
  };

  return (
    <Modal isOpen={isOpen} onClose={handleModalClose}>
      <Box className="rounded-none my-4 mx-auto p-4 max-w-xl self-center flex flex-col">
        <div>Discard Changes?</div>
        <div className="flex justify-end">
          <IButton text="No" onClick={handleModalClose} />
          <IButton text="Yes" onClick={handleQuit} />
        </div>
      </Box>
    </Modal>
  );
};
export default DiscardChangesModal;

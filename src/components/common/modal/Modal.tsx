import { FC, ReactNode } from "react";
import ReactModal from "react-modal";

const styles = {
  overlay: {
    backgroundColor: "#00223399",
    zIndex: 10,
  },
  content: {
    padding: "1rem",
    width: "45vw",
    height: "max-content",
    margin: "auto",
    zIndex: 10,
  },
};

type Props = {
  isOpen: boolean;
  onClose(): void;
  children: ReactNode;
  shouldCloseOnOverlayClick?: boolean;
};

if (process.env.NODE_ENV !== "test") {
  ReactModal.setAppElement("#root");
}

const Modal: FC<Props> = ({
  isOpen,
  onClose,
  shouldCloseOnOverlayClick = true,
  children,
}) => {
  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={onClose}
      style={styles}
      shouldCloseOnOverlayClick={shouldCloseOnOverlayClick}
    >
      {children}
    </ReactModal>
  );
};

export default Modal;

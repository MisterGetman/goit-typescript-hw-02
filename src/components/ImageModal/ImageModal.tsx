import { FC } from "react";
import Modal from "react-modal";

Modal.setAppElement("#root");

interface ImageModalProps {
  modalIsOpen: boolean;
  url: string;
  alt: string;
  closeModal: () => void;
}
const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

const ImageModal: FC<ImageModalProps> = ({
  modalIsOpen,
  url,
  alt,
  closeModal,
}) => {
  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      style={customStyles}
    >
      <img src={url} alt={alt} />
    </Modal>
  );
};

export default ImageModal;

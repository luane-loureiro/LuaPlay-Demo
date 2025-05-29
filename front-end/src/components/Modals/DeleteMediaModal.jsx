// src/components/modals/DeleteMediaModal.jsx
import Modal from "../Modal";
import Button from "../ButtonGeneric";

export default function DeleteMediaModal({ isOpen, onClose, onConfirm, media }) {
  return (
    <Modal
      usePortal={false}
      isOpen={isOpen}
      onClose={onClose}
      title={`Remover ${media?.title} da PlayList?`}
      footer={
        <>
          <Button onClick={onClose}>Cancel</Button>
          <Button onClick={onConfirm}>Confirm</Button>
        </>
      }
    >
      <p>Tem certeza que quer apagar essa Media?</p>
      
    </Modal>
  );
}
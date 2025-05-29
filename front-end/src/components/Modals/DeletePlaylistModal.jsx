// src/components/modals/DeletePlaylistModal.jsx
import Modal from "../Modal";
import Button from "../ButtonGeneric";

export default function DeletePlaylistModal({ isOpen, onClose, onConfirm, playlistName }) {
  return (
    <Modal
      usePortal={false}
      isOpen={isOpen}
      onClose={onClose}
      title={`Remover playlist "${playlistName}"?`}
      footer={
        <>
          <Button onClick={onClose}>Cancel</Button>
          <Button onClick={onConfirm}>Confirm</Button>
        </>
      }
    >
      <p>Essa ação irá remover todos os itens de mídia associados</p>
    </Modal>
  );
}

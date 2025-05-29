import Modal from "../Modal";
import Button from "../ButtonGeneric";
import TextInput from "../TextInput";

export default function AddMediaModal({
  isOpen,
  onClose,
  onConfirm,
  playlistName,
  title = "",
  url = "",
  description = "",
  coverUrl = "",
  duration = "",
  setTitle,
  setUrl,
  setDescription,
  setCoverUrl,
  setDuration
}) {
  return (
    <Modal
      usePortal={false}
      isOpen={isOpen}
      onClose={onClose}
      title={`Add media to "${playlistName}"`}
      footer={
        <>
          <Button onClick={onClose}>Cancelar</Button>
          <Button onClick={onConfirm} disabled={!title.trim() || !url.trim()}>
            Adicionar
          </Button>
        </>
      }
    >
      <form>
        <TextInput label="Title" value={title} onChange={e => setTitle(e.target.value)} />
        <TextInput label="URL" value={url} onChange={e => setUrl(e.target.value)} />
        <TextInput label="Description" value={description} onChange={e => setDescription(e.target.value)} />
        <TextInput label="Cover URL" value={coverUrl} onChange={e => setCoverUrl(e.target.value)} />
        <TextInput
          label="Duration (s)"
          type="number"
          value={duration}
          onChange={e => setDuration(e.target.value)}
        />
      </form>
    </Modal>
  );
}

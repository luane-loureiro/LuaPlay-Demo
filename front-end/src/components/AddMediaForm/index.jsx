import TextInput from "../TextInput";

export default function AddMediaForm({ title, url, description, coverUrl, duration, setTitle, setUrl, setDescription, setCoverUrl, setDuration }) {
  return (
    <>
      <TextInput label="Título" value={title} onChange={e => setTitle(e.target.value)} />
      <TextInput label="URL" value={url} onChange={e => setUrl(e.target.value)} />
      <TextInput label="Descrição" value={description} onChange={e => setDescription(e.target.value)} />
      <TextInput label="Cover URL" value={coverUrl} onChange={e => setCoverUrl(e.target.value)} />
      <TextInput label="Duração (s)" type="number" value={duration} onChange={e => setDuration(e.target.value)} />
    </>
  );
}

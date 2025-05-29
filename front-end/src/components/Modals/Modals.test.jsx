import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import AddMediaModal from "./AddMediaModal";
import DeleteMediaModal from "./DeleteMediaModal";
import DeletePlaylistModal from "./DeletePlaylistModal";

describe("Conjunto de Modais", () => {
  it("AddMediaModal renderiza e interage", () => {
    const onClose = vi.fn();
    const onConfirm = vi.fn();

    const setTitle = vi.fn();
    const setUrl = vi.fn();
    const setDescription = vi.fn();
    const setCoverUrl = vi.fn();
    const setDuration = vi.fn();

    render(
      <AddMediaModal
        isOpen={true}
        onClose={onClose}
        onConfirm={onConfirm}
        playlistName="Minha Playlist"
        title="Título"
        url="https://url.com"
        description="Desc"
        coverUrl="https://img.com"
        duration="120"
        setTitle={setTitle}
        setUrl={setUrl}
        setDescription={setDescription}
        setCoverUrl={setCoverUrl}
        setDuration={setDuration}
      />
    );

    expect(screen.getByRole("heading")).toHaveTextContent('Add media to "Minha Playlist"');
    expect(screen.getByLabelText("Title")).toHaveValue("Título");
    expect(screen.getByLabelText("URL")).toHaveValue("https://url.com");

    fireEvent.click(screen.getByText("Adicionar"));
    expect(onConfirm).toHaveBeenCalled();

    fireEvent.click(screen.getByText("Cancelar"));
    expect(onClose).toHaveBeenCalled();
  });

  it("DeleteMediaModal renderiza e interage", () => {
    const onClose = vi.fn();
    const onConfirm = vi.fn();

    render(
      <DeleteMediaModal
        isOpen={true}
        onClose={onClose}
        onConfirm={onConfirm}
        mediaTitle="Minha Mídia"
      />
    );

    expect(screen.getByRole("heading")).toHaveTextContent('Remover "Minha Mídia da PlayList"?');
    expect(screen.getByText("Tem certeza que quer apagar essa Media?")).toBeInTheDocument();

    fireEvent.click(screen.getByText("Cancel"));
    expect(onClose).toHaveBeenCalled();

    fireEvent.click(screen.getByText("Confirm"));
    expect(onConfirm).toHaveBeenCalled();
  });

  it("DeletePlaylistModal renderiza e interage", () => {
    const onClose = vi.fn();
    const onConfirm = vi.fn();

    render(
      <DeletePlaylistModal
        isOpen={true}
        onClose={onClose}
        onConfirm={onConfirm}
        playlistName="Minha Playlist"
      />
    );

    expect(screen.getByRole("heading")).toHaveTextContent('Remover playlist "Minha Playlist"?');
    expect(
      screen.getByText((content) =>
        content.includes("Essa ação irá remover todos os itens de mídia")
      )
    ).toBeInTheDocument();

    fireEvent.click(screen.getByText("Cancel"));
    expect(onClose).toHaveBeenCalled();

    fireEvent.click(screen.getByText("Confirm"));
    expect(onConfirm).toHaveBeenCalled();
  });
});

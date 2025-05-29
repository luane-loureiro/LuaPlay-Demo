import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import PlayList from "../PlayList";
import { describe, it, expect, vi } from "vitest";

describe("PlayList", () => {
  const playlistMock = {
    name: "Minha Playlist",
    color: "#123456",
    duration: 300,
  };

  const mediaItemsMock = [
    { id: 1, title: "Media 1", url: "url1" },
    { id: 2, title: "Media 2", url: "url2" },
  ];

  it("exibe nome da playlist e botões de ação", () => {
    const onAddMedia = vi.fn();
    const onDeletePlaylist = vi.fn();

    render(
      <PlayList
        playlist={playlistMock}
        mediaItems={mediaItemsMock}
        onAddMedia={onAddMedia}
        onDeletePlaylist={onDeletePlaylist}
      />
    );

    // Usando getByLabelText para pegar o botão do nome da playlist
    expect(screen.getByLabelText(`Playlist ${playlistMock.name}`)).toBeInTheDocument();

    const addButton = screen.getByLabelText(`Adicionar mídia na playlist ${playlistMock.name}`);
    expect(addButton).toBeInTheDocument();
    fireEvent.click(addButton);
    expect(onAddMedia).toHaveBeenCalledTimes(1);

    const deleteButton = screen.getByLabelText(`Deletar playlist ${playlistMock.name}`);
    expect(deleteButton).toBeInTheDocument();
    fireEvent.click(deleteButton);
    expect(onDeletePlaylist).toHaveBeenCalledTimes(1);
  });

  it("renderiza MediaCarousel quando há mídias", () => {
    render(<PlayList playlist={playlistMock} mediaItems={mediaItemsMock} />);

    expect(screen.queryByText("Media 1")).toBeInTheDocument();
    expect(screen.queryByText("Media 2")).toBeInTheDocument();
    expect(screen.queryByText("Não há mídias nesta playlist.")).not.toBeInTheDocument();
  });

  it("exibe mensagem quando não há mídias", () => {
    render(<PlayList playlist={playlistMock} mediaItems={[]} />);
    expect(screen.getByText("Não há mídias nesta playlist.")).toBeInTheDocument();
  });

  it("exibe 'Sem nome' se playlist não tiver nome", () => {
    render(<PlayList playlist={{ color: "#000000" }} mediaItems={[]} />);
    expect(screen.getByLabelText("Playlist Sem nome")).toBeInTheDocument();
  });
});

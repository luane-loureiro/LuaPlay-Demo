import React from "react";
import { render, screen } from "@testing-library/react";
import PlayListBox from "../PlayListBox";

const playlistsMock = [
  { id: "1", name: "Playlist 1", color: "red" },
  { id: "2", name: "Playlist 2", color: "blue" },
];

const mediaByPlaylistMock = {
  "1": [
    { id: "m1", title: "Media 1" },
    { id: "m2", title: "Media 2" },
  ],
  "2": [
    { id: "m3", title: "Media 3" },
  ],
};

describe("PlayListBox", () => {
  test("renderiza playlists e seus itens de mídia", () => {
    render(<PlayListBox playlists={playlistsMock} mediaByPlaylist={mediaByPlaylistMock} />);

    // Confere se os nomes das playlists aparecem na tela
    expect(screen.getByText("Playlist 1")).toBeInTheDocument();
    expect(screen.getByText("Playlist 2")).toBeInTheDocument();

    // Como o PlayList renderiza o nome da playlist em um botão, podemos buscar pelos botões
    const buttons = screen.getAllByRole("button", { name: /Playlist/i });
    expect(buttons.length).toBe(2);

    // Não temos o conteúdo detalhado dos mediaItems no PlayListBox,
    // mas você pode verificar se as playlists foram renderizadas.
  });

  test("quando mediaByPlaylist não tem dados, usa array vazio", () => {
    render(<PlayListBox playlists={playlistsMock} mediaByPlaylist={{}} />);

    expect(screen.getByText("Playlist 1")).toBeInTheDocument();
    expect(screen.getByText("Playlist 2")).toBeInTheDocument();
  });

  test("quando playlists está vazio, não renderiza nada", () => {
    const { container } = render(<PlayListBox playlists={[]} mediaByPlaylist={{}} />);
    expect(container.firstChild).toBeEmptyDOMElement();
  });
});

import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderHook, act, waitFor } from "@testing-library/react";

import { useLoadPlaylistsAndMedias } from "../hooks/useLoadPlaylistsAndMedias";

const fetchPlaylistsMock = vi.fn();
const fetchMediasByPlaylistMock = vi.fn();

vi.mock("../services/playlistsService", () => ({
  fetchPlaylists: (...args) => fetchPlaylistsMock(...args),
}));

vi.mock("../services/mediaService", () => ({
  fetchMediasByPlaylist: (...args) => fetchMediasByPlaylistMock(...args),
}));

describe("useLoadPlaylistsAndMedias", () => {
  const logoutMock = vi.fn();
  const navigateMock = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("deve redirecionar para /login se token for falso", () => {
    renderHook(() =>
      useLoadPlaylistsAndMedias(null, logoutMock, navigateMock)
    );

    expect(navigateMock).toHaveBeenCalledWith("/login");
  });

  it("deve carregar playlists e mídias corretamente", async () => {
    const fakePlaylists = [
      { _id: "1", name: "rock", color: "#f00", description: "desc rock" },
      { _id: "2", name: "pop", color: "#0f0" }, // sem descrição
    ];
    const fakeMediasRock = [
      { _id: "m1", title: "Rock Song", url: "url1", favorite: true },
    ];
    const fakeMediasPop = [
      { id: "m2", title: "Pop Song", url: "url2", favorite: false },
    ];

    fetchPlaylistsMock.mockResolvedValue(fakePlaylists);
    fetchMediasByPlaylistMock
      .mockImplementation((playlistName) => {
        if (playlistName === "rock") return Promise.resolve(fakeMediasRock);
        if (playlistName === "pop") return Promise.resolve(fakeMediasPop);
        return Promise.resolve([]);
      });

    const { result } = renderHook(() =>
      useLoadPlaylistsAndMedias("token123", logoutMock, navigateMock)
    );

    // Esperar as atualizações de estado
    await waitFor(() => {
      expect(result.current.playlists.length).toBe(2);
      expect(result.current.medias.length).toBe(2);
    });

    expect(result.current.playlists).toEqual([
      { id: "1", name: "rock", color: "#f00", description: "desc rock" },
      { id: "2", name: "pop", color: "#0f0", description: "" },
    ]);

    expect(result.current.medias).toEqual([
      {
        id: "m1",
        title: "Rock Song",
        url: "url1",
        description: undefined,
        favorite: true,
        playlistId: "1",
        playlistName: "rock",
      },
      {
        id: "m2",
        title: "Pop Song",
        url: "url2",
        description: undefined,
        favorite: false,
        playlistId: "2",
        playlistName: "pop",
      },
    ]);
  });

  it("deve capturar e logar erro sem quebrar", async () => {
    const error = new Error("falha na api");
    fetchPlaylistsMock.mockRejectedValue(error);

    const consoleErrorSpy = vi.spyOn(console, "error").mockImplementation(() => {});

    renderHook(() =>
      useLoadPlaylistsAndMedias("token123", logoutMock, navigateMock)
    );

    await waitFor(() => {
      expect(consoleErrorSpy).toHaveBeenCalledWith(
        "Erro ao carregar dados:",
        error
      );
    });

    consoleErrorSpy.mockRestore();
  });
});

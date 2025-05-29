import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderHook, act } from "@testing-library/react"; 
import { useApi } from "../hooks/useApi"; // ajuste o caminho conforme seu projeto

// Mock do useAuth
vi.mock("../contexts/AuthContext", () => ({
  useAuth: () => ({
    token: "fake-token",
    logout: vi.fn(),
  }),
}));

// Mock do mediaService
const fetchMediasByPlaylistMock = vi.fn();
const addMediaToPlaylistMock = vi.fn();
const deleteMediaMock = vi.fn();
const updateMediaMock = vi.fn();
const toggleFavoriteMediaMock = vi.fn();

vi.mock("../services/mediaService", () => ({
  fetchMediasByPlaylist: (...args) => fetchMediasByPlaylistMock(...args),
  addMediaToPlaylist: (...args) => addMediaToPlaylistMock(...args),
  deleteMedia: (...args) => deleteMediaMock(...args),
  updateMedia: (...args) => updateMediaMock(...args),
  toggleFavoriteMedia: (...args) => toggleFavoriteMediaMock(...args),
}));

describe("useApi hook", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("deve chamar fetchMediasByPlaylist com os argumentos corretos", () => {
    const { result } = renderHook(() => useApi());
    const playlist = "minha-playlist";

    result.current.fetchMediasByPlaylist(playlist);

    expect(fetchMediasByPlaylistMock).toHaveBeenCalledWith(
      playlist,
      "fake-token",
      expect.any(Function) // logout function mockada
    );
  });

  it("deve chamar addMediaToPlaylist com os argumentos corretos", () => {
    const { result } = renderHook(() => useApi());
    const playlist = "playlist";
    const data = { title: "nova mídia" };

    result.current.addMediaToPlaylist(playlist, data);

    expect(addMediaToPlaylistMock).toHaveBeenCalledWith(
      playlist,
      data,
      "fake-token",
      expect.any(Function)
    );
  });

  it("deve chamar deleteMedia com os argumentos corretos", () => {
    const { result } = renderHook(() => useApi());
    const title = "titulo-da-mid";

    result.current.deleteMedia(title);

    expect(deleteMediaMock).toHaveBeenCalledWith(
      title,
      "fake-token",
      expect.any(Function)
    );
  });

  it("deve chamar updateMedia com os argumentos corretos", () => {
    const { result } = renderHook(() => useApi());
    const title = "titulo";
    const updates = { favorite: true };

    result.current.updateMedia(title, updates);

    expect(updateMediaMock).toHaveBeenCalledWith(
      title,
      updates,
      "fake-token",
      expect.any(Function)
    );
  });

  it("deve chamar toggleFavoriteMedia com os argumentos corretos", () => {
    const { result } = renderHook(() => useApi());
    const id = "123";

    result.current.toggleFavoriteMedia(id);

    expect(toggleFavoriteMediaMock).toHaveBeenCalledWith(
      id,
      "fake-token",
      expect.any(Function)
    );
  });
});


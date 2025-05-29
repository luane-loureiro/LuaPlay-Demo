import { describe, it, expect, vi, beforeEach } from "vitest";
import {
  handleToggleFavorite,
  handleDeleteMedia,
  confirmDeleteMedia,
} from "../Handlers/mediaHandlers";

import {
  handleAddMediaToPlaylistById,
  handleDeletePlaylist,
  handleConfirmDeletePlaylist,
  handleConfirmAddMediaToPlaylist,
} from "../Handlers/playlistHandlers";

import * as mediaService from "../services/mediaService";
import * as playlistsService from "../services/playlistsService";

vi.mock("../services/mediaService", () => ({
  deleteMedia: vi.fn(),
  toggleFavoriteMedia: vi.fn(),
  addMediaToPlaylist: vi.fn(),
}));

vi.mock("../services/playlistsService", () => ({
  deletePlaylist: vi.fn(),
}));

describe("Media Handlers", () => {
  describe("handleToggleFavorite", () => {
    it("deve inverter favorito e atualizar estado", async () => {
      const token = "fake-token";
      const logout = vi.fn();
      const mediaId = "123";
      const setMedias = vi.fn(fn => fn([{ id: "123", favorite: false }]));
      mediaService.toggleFavoriteMedia.mockResolvedValue(true);

      await handleToggleFavorite(mediaId, token, logout, setMedias, mediaService.toggleFavoriteMedia, false);

      expect(mediaService.toggleFavoriteMedia).toHaveBeenCalledWith("123", true, token, logout);
      expect(setMedias).toHaveBeenCalled();
    });
  });

  describe("confirmDeleteMedia", () => {
    it("deve remover mídia do estado ao confirmar exclusão com sucesso", async () => {
      const media = { title: "Test Media" };
      const token = "token";
      const logout = vi.fn();
      const setMedias = vi.fn(fn => fn([{ title: "Test Media" }, { title: "Outra" }]));
      const setShowModalMedia = vi.fn();
      const setMediaToDelete = vi.fn();
      mediaService.deleteMedia.mockResolvedValue(true);

      await confirmDeleteMedia(media, token, logout, setMedias, setShowModalMedia, setMediaToDelete);

      expect(mediaService.deleteMedia).toHaveBeenCalledWith("Test Media", token, logout);
      expect(setMedias).toHaveBeenCalled();
      expect(setShowModalMedia).toHaveBeenCalledWith(false);
      expect(setMediaToDelete).toHaveBeenCalledWith(null);
    });
  });
});

describe("Playlist Handlers", () => {
  describe("handleAddMediaToPlaylistById", () => {
    it("deve preparar modal para adicionar mídia", () => {
      const playlistId = "1";
      const playlists = [{ id: "1", name: "Favoritas" }];
      const setPlaylistToAddMedia = vi.fn();
      const setShowAddMediaModal = vi.fn();
      const setNewMediaTitle = vi.fn();
      const setNewMediaUrl = vi.fn();
      const setNewMediaDescription = vi.fn();
      const setNewMediaCoverUrl = vi.fn();
      const setNewMediaDuration = vi.fn();

      handleAddMediaToPlaylistById(
        playlistId,
        playlists,
        setPlaylistToAddMedia,
        setShowAddMediaModal,
        setNewMediaTitle,
        setNewMediaUrl,
        setNewMediaDescription,
        setNewMediaCoverUrl,
        setNewMediaDuration
      );

      expect(setPlaylistToAddMedia).toHaveBeenCalledWith(playlists[0]);
      expect(setShowAddMediaModal).toHaveBeenCalledWith(true);
    });
  });

  describe("handleDeletePlaylist", () => {
    it("deve preparar modal de confirmação para deletar playlist", () => {
      const playlist = { name: "Test" };
      const setPlaylistToDelete = vi.fn();
      const setShowModalPlaylist = vi.fn();

      handleDeletePlaylist(playlist, setPlaylistToDelete, setShowModalPlaylist);

      expect(setPlaylistToDelete).toHaveBeenCalledWith(playlist);
      expect(setShowModalPlaylist).toHaveBeenCalledWith(true);
    });
  });

  describe("handleConfirmDeletePlaylist", () => {
    it("deve deletar a playlist e atualizar estados", async () => {
      const playlist = { name: "Test", id: "1" };
      const token = "token";
      const logout = vi.fn();
      const setPlaylists = vi.fn(fn => fn([{ id: "1" }, { id: "2" }]));
      const setMedias = vi.fn(fn => fn([{ playlistName: "Test" }, { playlistName: "Outra" }]));
      const setShowModalPlaylist = vi.fn();
      const setPlaylistToDelete = vi.fn();

      playlistsService.deletePlaylist.mockResolvedValue(true);

      await handleConfirmDeletePlaylist(playlist, token, logout, setPlaylists, setMedias, setShowModalPlaylist, setPlaylistToDelete);

      expect(playlistsService.deletePlaylist).toHaveBeenCalledWith("Test", token, logout);
      expect(setPlaylists).toHaveBeenCalled();
      expect(setMedias).toHaveBeenCalled();
      expect(setShowModalPlaylist).toHaveBeenCalledWith(false);
      expect(setPlaylistToDelete).toHaveBeenCalledWith(null);
    });
  });

  describe("handleConfirmAddMediaToPlaylist", () => {
    it("deve adicionar nova mídia à playlist", async () => {
      const playlist = { name: "Favoritas" };
      const mediaData = { title: "Música", url: "http://url" };
      const token = "token";
      const logout = vi.fn();
      const setMedias = vi.fn(fn => fn([]));
      const setShowAddMediaModal = vi.fn();
      const setPlaylistToAddMedia = vi.fn();
      const novaMidia = { ...mediaData, playlistName: "Favoritas" };

      mediaService.addMediaToPlaylist.mockResolvedValue(novaMidia);

      await handleConfirmAddMediaToPlaylist(
        playlist,
        mediaData,
        token,
        logout,
        setMedias,
        setShowAddMediaModal,
        setPlaylistToAddMedia,
        mediaService.addMediaToPlaylist
      );

      expect(mediaService.addMediaToPlaylist).toHaveBeenCalledWith(
        { ...mediaData, playlistIdOrName: "Favoritas" },
        token,
        logout
      );
      expect(setMedias).toHaveBeenCalled();
      expect(setShowAddMediaModal).toHaveBeenCalledWith(false);
      expect(setPlaylistToAddMedia).toHaveBeenCalledWith(null);
    });
  });
});

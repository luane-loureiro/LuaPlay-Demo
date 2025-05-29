import { useAuth } from '../contexts/AuthContext';
import * as mediaService from '../services/mediaService';

export function useApi() {
  const { token, logout } = useAuth();

  return {
    fetchMediasByPlaylist: (playlist) =>
      mediaService.fetchMediasByPlaylist(playlist, token, logout),

    addMediaToPlaylist: (playlist, data) =>
      mediaService.addMediaToPlaylist(playlist, data, token, logout),

    deleteMedia: (title) =>
      mediaService.deleteMedia(title, token, logout),

    updateMedia: (title, updates) =>
      mediaService.updateMedia(title, updates, token, logout),

toggleFavoriteMedia: (id, newFavoriteValue) =>
  mediaService.toggleFavoriteMediaApi(id, newFavoriteValue, token, logout),
  };
}

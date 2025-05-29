import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { fetchWithAuth } from '../services/apiClient';
import { loginUser, registerUser } from '../services/authService';
import * as mediaService from '../services/mediaService';
import * as playlistService from '../services/playlistsService';

global.fetch = vi.fn();

describe('apiClient - fetchWithAuth', () => {
  const token = 'test-token';
  const logout = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('deve incluir Authorization quando o token for passado', async () => {
    fetch.mockResolvedValueOnce({
      ok: true,
      status: 200,
      json: async () => ({ success: true }),
    });

    const res = await fetchWithAuth('/test', {}, token, logout);

    expect(fetch).toHaveBeenCalledWith(expect.stringContaining('/test'), expect.objectContaining({
      headers: expect.objectContaining({
        Authorization: `Bearer ${token}`,
      }),
    }));
    expect(res).toEqual({ success: true });
  });

  it('deve chamar logout em resposta 401', async () => {
    fetch.mockResolvedValueOnce({
      ok: false,
      status: 401,
      json: async () => ({}),
    });

    await expect(fetchWithAuth('/test', {}, token, logout)).rejects.toThrow('Não autorizado');
    expect(logout).toHaveBeenCalled();
  });
});

describe('authService', () => {
  beforeEach(() => vi.clearAllMocks());

  it('loginUser retorna token e user', async () => {
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        token: 'abc123',
        user: { username: 'user', email: 'user@email.com' },
      }),
    });

    const result = await loginUser({ username: 'user', password: 'pass' });

    expect(result).toEqual({
      token: 'abc123',
      user: { username: 'user', email: 'user@email.com' },
    });
  });

  it('registerUser retorna dados ao cadastrar', async () => {
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ success: true }),
    });

    const result = await registerUser({
      username: 'new',
      email: 'new@email.com',
      password: '123',
    });

    expect(result).toEqual({ success: true });
  });
});

describe('mediaService', () => {
  beforeEach(() => vi.clearAllMocks());

  it('fetchMediasByPlaylist retorna dados esperados', async () => {
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ['media1', 'media2'],
    });

    const result = await mediaService.fetchMediasByPlaylist('rock', 'token', vi.fn());
    expect(result).toEqual(['media1', 'media2']);
  });

  it('addMediaToPlaylist envia body corretamente', async () => {
    const data = { title: 'Song', playlist: 'MyPlaylist' };
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ id: 1, ...data }),
    });

    const res = await mediaService.addMediaToPlaylist(data, 'token', vi.fn());
    expect(res.title).toBe('Song');
  });
});

describe('playlistService', () => {
  beforeEach(() => vi.clearAllMocks());

  it('fetchPlaylists retorna playlists', async () => {
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ['playlist1', 'playlist2'],
    });

    const result = await playlistService.fetchPlaylists('token', vi.fn());
    expect(result).toEqual(['playlist1', 'playlist2']);
  });

  it('deletePlaylist retorna true em sucesso', async () => {
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({}),
    });

    const result = await playlistService.deletePlaylist('Minha', 'token', vi.fn());
    expect(result).toBe(true);
  });

  it('updatePlaylist envia dados corretamente', async () => {
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ updated: true }),
    });

    const updates = { description: 'Nova descrição' };
    const result = await playlistService.updatePlaylist('Minha', updates, 'token', vi.fn());

    expect(result).toEqual({ updated: true });
  });
});

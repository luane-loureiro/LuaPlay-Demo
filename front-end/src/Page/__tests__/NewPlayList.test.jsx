// src/paginas/__tests__/NewPlayList.test.jsx
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { vi } from 'vitest';

// Mocks
const navigateMock = vi.fn();
const createPlaylistMock = vi.fn();
const logoutMock = vi.fn();
const toastSuccessMock = vi.fn();
const toastErrorMock = vi.fn();

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => navigateMock,
  };
});

vi.mock('../../contexts/AuthContext', () => ({
  useAuth: () => ({
    token: 'fake-token',
    logout: logoutMock,
  }),
}));

vi.mock('../../services/playlistsService', () => ({
  createPlaylist: (...args) => createPlaylistMock(...args),
}));

vi.mock('react-toastify', () => ({
  toast: {
    success: (...args) => toastSuccessMock(...args),
    error: (...args) => toastErrorMock(...args),
  },
}));

// Importa APÓS mocks
import NewPlayList from '../../Page/NewPlayList';

describe('NewPlayList component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders form inputs and submit button', () => {
    render(<NewPlayList />);
    expect(screen.getByLabelText(/nome/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/descrição/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/cor/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /criar playlist/i })).toBeInTheDocument();
  });

  it('updates form inputs on user typing', () => {
    render(<NewPlayList />);
    const nameInput = screen.getByLabelText(/nome/i);
    const descInput = screen.getByLabelText(/descrição/i);
    const colorInput = screen.getByLabelText(/cor/i);

    fireEvent.change(nameInput, { target: { value: 'My Playlist' } });
    fireEvent.change(descInput, { target: { value: 'Awesome songs' } });
    fireEvent.change(colorInput, { target: { value: '#123456' } });

    expect(nameInput.value).toBe('My Playlist');
    expect(descInput.value).toBe('Awesome songs');
    expect(colorInput.value).toBe('#123456');
  });

  it('calls createPlaylist and navigates on successful submit', async () => {
    createPlaylistMock.mockResolvedValueOnce();

    render(<NewPlayList />);

    fireEvent.change(screen.getByLabelText(/nome/i), { target: { value: 'My Playlist' } });
    fireEvent.change(screen.getByLabelText(/descrição/i), { target: { value: 'Awesome songs' } });
    fireEvent.change(screen.getByLabelText(/cor/i), { target: { value: '#123456' } });

    fireEvent.click(screen.getByRole('button', { name: /criar playlist/i }));

    await waitFor(() => {
      expect(createPlaylistMock).toHaveBeenCalledWith(
        {
          name: 'My Playlist',
          description: 'Awesome songs',
          color: '#123456',
        },
        'fake-token',
        logoutMock
      );
    });

    expect(toastSuccessMock).toHaveBeenCalledWith('Playlist criada com sucesso!');
    expect(navigateMock).toHaveBeenCalledWith('/');
  });

  it('shows error toast on createPlaylist failure', async () => {
    createPlaylistMock.mockRejectedValueOnce(new Error('Erro inesperado'));

    render(<NewPlayList />);

    fireEvent.change(screen.getByLabelText(/nome/i), { target: { value: 'Fail Playlist' } });
    fireEvent.change(screen.getByLabelText(/descrição/i), { target: { value: 'Will fail' } });
    fireEvent.change(screen.getByLabelText(/cor/i), { target: { value: '#654321' } });

    fireEvent.click(screen.getByRole('button', { name: /criar playlist/i }));

    await waitFor(() => {
      expect(toastErrorMock).toHaveBeenCalledWith('Erro ao criar playlist: Erro inesperado');
    });

    // Navegação NÃO deve ser chamada nesse caso
    expect(navigateMock).not.toHaveBeenCalled();
  });
});

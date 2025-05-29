import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, vi, beforeEach } from 'vitest';
import Header from './index';
import { BrowserRouter } from 'react-router-dom';

// Mock do useAuth para controlar o user e logout
vi.mock('../../contexts/AuthContext', () => ({
  useAuth: vi.fn(),
}));
import { useAuth } from '../../contexts/AuthContext';

// Mock do MenuLink para evitar problemas de importação
vi.mock('../MenuLink', () => ({
  default: ({ to, children }) => <a href={to}>{children}</a>,
}));

const renderWithRouter = (ui) => render(<BrowserRouter>{ui}</BrowserRouter>);

describe('Header', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('exibe links de login e cadastro se não estiver logado', () => {
    useAuth.mockReturnValue({ user: null });

    renderWithRouter(<Header />);

    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Criar Playlist')).toBeInTheDocument();
    expect(screen.getByText('Login')).toBeInTheDocument();
    expect(screen.getByText('Cadastro')).toBeInTheDocument();
    expect(screen.queryByText(/Olá,/)).toBeNull();
  });

  it('exibe saudação e botão sair quando estiver logado', () => {
    const mockLogout = vi.fn();
    useAuth.mockReturnValue({ user: { username: 'Luane' }, logout: mockLogout });

    renderWithRouter(<Header />);

    expect(screen.getByText('Olá, Luane!')).toBeInTheDocument();

    const sairLink = screen.getByText('Sair');
    fireEvent.click(sairLink);
    expect(mockLogout).toHaveBeenCalledTimes(1);
  });
});

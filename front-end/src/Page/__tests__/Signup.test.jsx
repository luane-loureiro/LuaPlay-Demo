// src/pages/__tests__/Signup.test.jsx
import { describe, it, vi, expect, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Signup from '../Signup';
import * as authService from '../../services/authService';
import { toast } from 'react-toastify';

// Mock do toast
vi.mock('react-toastify', () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn(),
  },
}));

// Mock do registerUser
vi.mock('../../services/authService', () => ({
  registerUser: vi.fn(),
}));

// Mock do useNavigate
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => vi.fn(),
  };
});

function renderSignup() {
  return render(
    <BrowserRouter>
      <Signup />
    </BrowserRouter>
  );
}

describe('Signup page', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('deve renderizar o formulário corretamente', () => {
    renderSignup();
    expect(screen.getByLabelText(/Nome/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/E-mail/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Senha/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Cadastrar/i })).toBeInTheDocument();
  });

  it('deve permitir preencher os campos e submeter o formulário com sucesso', async () => {
    const mockRegister = authService.registerUser;
    mockRegister.mockResolvedValue({ success: true });

    renderSignup();

    fireEvent.change(screen.getByLabelText(/Nome/i), { target: { value: 'João' } });
    fireEvent.change(screen.getByLabelText(/E-mail/i), { target: { value: 'joao@example.com' } });
    fireEvent.change(screen.getByLabelText(/Senha/i), { target: { value: '123456' } });

    fireEvent.click(screen.getByRole('button', { name: /Cadastrar/i }));

    await waitFor(() => {
      expect(mockRegister).toHaveBeenCalledWith({
        username: 'João',
        email: 'joao@example.com',
        password: '123456',
      });
      expect(toast.success).toHaveBeenCalledWith('Cadastro realizado com sucesso!');
    });
  });

  it('deve mostrar erro caso o cadastro falhe', async () => {
    authService.registerUser.mockRejectedValue(new Error('Erro de rede'));

    renderSignup();

    fireEvent.change(screen.getByLabelText(/Nome/i), { target: { value: 'Ana' } });
    fireEvent.change(screen.getByLabelText(/E-mail/i), { target: { value: 'ana@example.com' } });
    fireEvent.change(screen.getByLabelText(/Senha/i), { target: { value: 'abcdef' } });

    fireEvent.click(screen.getByRole('button', { name: /Cadastrar/i }));

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith('Erro no cadastro: Erro de rede');
    });
  });
});

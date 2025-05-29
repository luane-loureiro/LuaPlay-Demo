// src/Page/__tests__/Login.test.jsx
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { vi } from 'vitest';

// IMPORTANTE: MOCK DO useAuth e loginUser com caminho correto para seu contexto e serviço
const loginMock = vi.fn();

vi.mock('../../contexts/AuthContext', () => ({
  useAuth: () => ({
    login: loginMock,
  }),
}));

vi.mock('../../services/authService', () => ({
  loginUser: vi.fn(),
}));

vi.mock('react-toastify', () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn(),
  },
}));

const navigateMock = vi.fn();

vi.mock('react-router-dom', async () => {
  // Importa o módulo real para manter outros hooks e componentes
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => navigateMock,
  };
});

import Login from '../Login';
import { useAuth } from '../../contexts/AuthContext';
import { loginUser } from '../../services/authService';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

describe('Login Page', () => {
  let loginMock;
  let navigateMock;

  beforeEach(() => {
    // Pega os mocks atualizados
    loginMock = useAuth().login;
    navigateMock = useNavigate();

    // Limpa mocks antes de cada teste
    vi.clearAllMocks();
  });

  it('renders email and password inputs and submit button', () => {
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/senha/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /entrar/i })).toBeInTheDocument();
  });

  it('updates form inputs when user types', () => {
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/senha/i);

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: '123456' } });

    expect(emailInput.value).toBe('test@example.com');
    expect(passwordInput.value).toBe('123456');
  });

  it('calls loginUser and login on successful submit, shows success toast and navigates', async () => {
    const fakeResponse = {
      token: 'fake-token',
      user: { username: 'User1', email: 'user1@example.com' },
    };
    loginUser.mockResolvedValue(fakeResponse);

    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    // Preencher form
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: 'user1@example.com' },
    });
    fireEvent.change(screen.getByLabelText(/senha/i), {
      target: { value: 'password123' },
    });

    fireEvent.click(screen.getByRole('button', { name: /entrar/i }));

    await waitFor(() => {
      expect(loginUser).toHaveBeenCalledWith({
        email: 'user1@example.com',
        password: 'password123',
      });
    });

    expect(loginMock).toHaveBeenCalledWith({
      userData: { username: 'User1', email: 'user1@example.com' },
      token: 'fake-token',
    });
    expect(toast.success).toHaveBeenCalledWith('Login realizado com sucesso!');
    expect(navigateMock).toHaveBeenCalledWith('/');
  });

  it('shows error toast on login failure', async () => {
    loginUser.mockRejectedValue(new Error('Falha no servidor'));

    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: 'fail@example.com' },
    });
    fireEvent.change(screen.getByLabelText(/senha/i), {
      target: { value: 'wrongpass' },
    });

    fireEvent.click(screen.getByRole('button', { name: /entrar/i }));

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith(
        'Falha no login: Falha no servidor'
      );
    });

    // login e navigate não devem ser chamados
    expect(loginMock).not.toHaveBeenCalled();
    expect(navigateMock).not.toHaveBeenCalled();
  });
});

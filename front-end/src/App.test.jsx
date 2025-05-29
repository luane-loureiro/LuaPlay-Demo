import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from './App';

describe('App Component', () => {
  it('renderiza o Header, Footer e as rotas principais', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>
    );

    // seus asserts aqui
  });

  it('renderiza página não encontrada para rota inválida', () => {
    render(
      <MemoryRouter initialEntries={['/rota-invalida']}>
        <App />
      </MemoryRouter>
    );

    expect(screen.getByText(/Página Não Encontrada/i)).toBeInTheDocument();
  });
});

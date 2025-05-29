// NewMedia.test.jsx
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import NewMedia from '../../Page/NewMedia';

vi.mock('../../components/Form', () => ({
  default: ({ categorias, aoCadastrar }) => (
    <div>
      <div>Mock Form</div>
      <button onClick={() => aoCadastrar({ id: 1, nome: 'Vídeo teste' })}>Cadastrar</button>
      <div>{categorias.join(',')}</div>
    </div>
  )
}));

describe('NewMedia component', () => {
  const mockPlaylist = [
    { nome: 'Categoria 1' },
    { nome: 'Categoria 2' },
  ];

  it('renderiza título e subtítulo', () => {
    render(<NewMedia playlist={mockPlaylist} media={[]} setMedia={vi.fn()} />);
    expect(screen.getByText('Novo Video')).toBeInTheDocument();
    expect(screen.getByText('Complete o formulário para criar um novo card de vídeo.')).toBeInTheDocument();
  });

  it('passa categorias corretas para o Form', () => {
    render(<NewMedia playlist={mockPlaylist} media={[]} setMedia={vi.fn()} />);
    expect(screen.getByText('Categoria 1,Categoria 2')).toBeInTheDocument();
  });

  it('chama setMedia quando Form chama aoCadastrar', () => {
    const setMediaMock = vi.fn();
    const initialMedia = [{ id: 0, nome: 'Video inicial' }];

    render(<NewMedia playlist={mockPlaylist} media={initialMedia} setMedia={setMediaMock} />);

    const button = screen.getByText('Cadastrar');
    fireEvent.click(button);

    expect(setMediaMock).toHaveBeenCalledWith([
      ...initialMedia,
      { id: 1, nome: 'Vídeo teste' }
    ]);
  });
});
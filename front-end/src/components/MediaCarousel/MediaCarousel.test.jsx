import { render, screen } from "@testing-library/react";
import MediaCarousel from "./index";

const mockItems = [
  {
    id: "1",
    url: "https://youtu.be/dQw4w9WgXcQ",
    title: "Vídeo Teste",
    description: "Descrição do vídeo",
    favorite: false,
  },
];

test("botão de adicionar aos favoritos está na tela", () => {
  render(<MediaCarousel itens={mockItems} onFavorite={() => {}} />);
  const btnFavorito = screen.getByRole("button", { name: /adicionar aos favoritos/i });
  expect(btnFavorito).toBeInTheDocument();
});

import React, { useState } from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Media from "./index";

// Wrapper para simular controle de estado
function MediaWithState(props) {
  const [favorite, setFavorite] = useState(props.favorite);

  function handleFavorite(id, newState) {
    setFavorite(newState);
    if (props.onFavorite) {
      props.onFavorite(id, newState);
    }
  }

  return <Media {...props} favorite={favorite} onFavorite={handleFavorite} />;
}

describe("Media", () => {
  const mediaProps = {
    id: 1,
    title: "Teste vídeo",
    description: "Descrição do vídeo",
    favorite: false,
    // outras props necessárias para Media
  };

  it("alterna ícone de coração quando clicado", () => {
    render(<MediaWithState {...mediaProps} />);

    // Verifica o botão que alterna favorito
    const button = screen.getByRole("button", { name: /adicionar aos favoritos/i });
    expect(button).toBeInTheDocument();

    // Estado inicial do ícone (não favorito)
    const icon = screen.getByTestId("favorite-icon");
    expect(icon.tagName.toLowerCase()).toBe("svg");

    // Alternar para favorito
    fireEvent.click(button);

const iconFavorito = screen.getByTestId("favorite-icon");
expect(iconFavorito.getAttribute("class")).toMatch(/favorito/);

    // Alternar de volta para não favorito
    fireEvent.click(button);
    const iconDesfavorito = screen.getByTestId("favorite-icon");

    // Verifica se voltou ao estilo padrão
    expect(iconDesfavorito).toHaveAttribute("fill", "currentColor");
  });
});


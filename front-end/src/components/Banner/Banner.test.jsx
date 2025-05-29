// src/components/Banner/__tests__/index.test.jsx
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Banner from "./index";

describe("Banner", () => {
  it("deve renderizar o título, texto, imagem de fundo e o iframe", () => {
    const titulo = "Título do Banner";
    const texto = "Texto do banner para teste";
    const bannerBackground = "http://exemplo.com/banner.jpg";

    render(<Banner titulo={titulo} texto={texto} bannerBackground={bannerBackground} />);

    // Verifica imagem de fundo
    const imagem = screen.getByAltText("Imagem de fundo do banner");
    expect(imagem).toBeInTheDocument();
    expect(imagem).toHaveAttribute("src", bannerBackground);

    // Verifica título e texto
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(titulo);
    expect(screen.getByText(texto)).toBeInTheDocument();

    // Verifica iframe
    const iframe = screen.getByTitle("Teste");
    expect(iframe).toBeInTheDocument();
    expect(iframe).toHaveAttribute("src", "#");
  });
});

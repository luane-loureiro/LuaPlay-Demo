import { render, screen } from "@testing-library/react";
import Footer from "./index";

describe("Footer", () => {
  it("deve renderizar o texto do logo corretamente", () => {
    render(<Footer />);
    // Busca o heading nível 2 que contenha o texto LuaPlay (case-insensitive)
    const logoHeading = screen.getByRole("heading", { level: 2, name: /LuaPlay/i });
    expect(logoHeading).toBeInTheDocument();
  });
});

import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import MenuLink from "./index";

describe("MenuLink", () => {
  it("renderiza o Link com o texto e props corretos", () => {
    render(
      <MemoryRouter>
        <MenuLink to="/home" className="my-class" data-testid="menu-link">
          Página Inicial
        </MenuLink>
      </MemoryRouter>
    );

    const link = screen.getByTestId("menu-link");

    expect(link).toBeInTheDocument();
    expect(link).toHaveClass("my-class");
    expect(link).toHaveAttribute("href", "/home");
    expect(link).toHaveTextContent("Página Inicial");
  });
});

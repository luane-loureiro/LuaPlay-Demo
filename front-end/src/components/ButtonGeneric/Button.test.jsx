import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import Button from "./index";

describe("Button", () => {
  it("deve aplicar classe extra e estilo inline", () => {
    render(
      <Button className="extra-class" style={{ color: "red" }}>
        Clique
      </Button>
    );

    const button = screen.getByRole("button");

    expect(button).toHaveClass("extra-class");
    expect(button).toHaveStyle("color: rgb(255, 0, 0)");
  });

  it("deve disparar onClick quando clicado", () => {
    const handleClick = vi.fn();

    render(<Button onClick={handleClick}>Clique</Button>);

    const button = screen.getByRole("button");
    fireEvent.click(button);

    expect(handleClick).toHaveBeenCalled();
  });
});

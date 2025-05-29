import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, afterEach } from "vitest";
import Modal from "./index";

describe("Modal", () => {
  const onCloseMock = vi.fn();

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("não renderiza nada quando isOpen é false", () => {
    const { container } = render(<Modal isOpen={false} onClose={onCloseMock} />);
    expect(container.firstChild).toBeNull();
  });

  it("renderiza o modal quando isOpen é true, com título e conteúdo", () => {
    render(
      <Modal isOpen={true} onClose={onCloseMock} title="Título do Modal">
        <p>Conteúdo do modal</p>
      </Modal>
    );

    expect(screen.getByRole("dialog")).toBeInTheDocument();
    expect(screen.getByText("Título do Modal")).toBeInTheDocument();
    expect(screen.getByText("Conteúdo do modal")).toBeInTheDocument();
  });

  it("chama onClose ao clicar no overlay", () => {
    render(
      <Modal isOpen={true} onClose={onCloseMock} title="Modal">
        <p>Conteúdo</p>
      </Modal>
    );

    const overlay = screen.getByRole("presentation");
    fireEvent.click(overlay);
    expect(onCloseMock).toHaveBeenCalledTimes(1);
  });

  it("não chama onClose ao clicar no conteúdo do modal", () => {
    render(
      <Modal isOpen={true} onClose={onCloseMock} title="Modal">
        <p>Conteúdo</p>
      </Modal>
    );

    const dialog = screen.getByRole("dialog");
    fireEvent.click(dialog);
    expect(onCloseMock).not.toHaveBeenCalled();
  });
});

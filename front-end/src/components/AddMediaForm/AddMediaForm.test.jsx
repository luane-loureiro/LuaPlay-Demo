import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import AddMediaForm from "./index";

describe("AddMediaForm", () => {
  it("renderiza todos os inputs e chama setters ao digitar", () => {
    // Mocks para setters
    const setTitle = vi.fn();
    const setUrl = vi.fn();
    const setDescription = vi.fn();
    const setCoverUrl = vi.fn();
    const setDuration = vi.fn();

    // Renderiza o componente com valores vazios
    render(
      <AddMediaForm
        title=""
        url=""
        description=""
        coverUrl=""
        duration=""
        setTitle={setTitle}
        setUrl={setUrl}
        setDescription={setDescription}
        setCoverUrl={setCoverUrl}
        setDuration={setDuration}
      />
    );

    // Pega cada input pelo label e dispara um change
    const titleInput = screen.getByLabelText("Título");
    fireEvent.change(titleInput, { target: { value: "Novo título" } });
    expect(setTitle).toHaveBeenCalledWith("Novo título");

    const urlInput = screen.getByLabelText("URL");
    fireEvent.change(urlInput, { target: { value: "http://exemplo.com" } });
    expect(setUrl).toHaveBeenCalledWith("http://exemplo.com");

    const descriptionInput = screen.getByLabelText("Descrição");
    fireEvent.change(descriptionInput, { target: { value: "Descrição aqui" } });
    expect(setDescription).toHaveBeenCalledWith("Descrição aqui");

    const coverUrlInput = screen.getByLabelText("Cover URL");
    fireEvent.change(coverUrlInput, { target: { value: "http://cover.com/img.jpg" } });
    expect(setCoverUrl).toHaveBeenCalledWith("http://cover.com/img.jpg");

    const durationInput = screen.getByLabelText("Duração (s)");
    fireEvent.change(durationInput, { target: { value: "120" } });
    expect(setDuration).toHaveBeenCalledWith("120");
  });
});
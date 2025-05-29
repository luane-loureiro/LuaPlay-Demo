import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import Form from "./index";

const playlistsMock = [
  { label: "Playlist 1", value: "1" },
  { label: "Playlist 2", value: "2" },
];

describe("Form", () => {
  it("deve exibir os campos corretamente", () => {
    render(<Form onSubmit={() => {}} playlists={playlistsMock} />);

    expect(screen.getByTestId("textinput-title")).toBeInTheDocument();
    expect(screen.getByRole("combobox", { name: /Playlist/i })).toBeInTheDocument();
    expect(screen.getByTestId("textinput-description")).toBeInTheDocument();
    expect(screen.getByTestId("textinput-image")).toBeInTheDocument();
    expect(screen.getByTestId("textinput-mediaLink")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Limpar/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Salvar/i })).toBeInTheDocument();
  });

  it("deve chamar onSubmit com dados válidos e limpar os campos", () => {
    const onSubmit = vi.fn();
    render(<Form onSubmit={onSubmit} playlists={playlistsMock} />);

    fireEvent.change(screen.getByTestId("textinput-title"), { target: { value: "Vídeo 1" } });
    fireEvent.change(screen.getByRole("combobox", { name: /Playlist/i }), { target: { value: "1" } });
    fireEvent.change(screen.getByTestId("textinput-description"), { target: { value: "Descrição top" } });
    fireEvent.change(screen.getByTestId("textinput-image"), { target: { value: "http://imagem.com/img.jpg" } });
    fireEvent.change(screen.getByTestId("textinput-mediaLink"), { target: { value: "http://video.com/1" } });

    fireEvent.click(screen.getByRole("button", { name: /Salvar/i }));

    expect(onSubmit).toHaveBeenCalledTimes(1);
    expect(onSubmit).toHaveBeenCalledWith({
      title: "Vídeo 1",
      playlist: "1",
      description: "Descrição top",
      image: "http://imagem.com/img.jpg",
      mediaLink: "http://video.com/1",
    });

    // Campos devem estar limpos
    expect(screen.getByTestId("textinput-title").value).toBe("");
    expect(screen.getByRole("combobox", { name: /Playlist/i }).value).toBe("");
    expect(screen.getByTestId("textinput-description").value).toBe("");
    expect(screen.getByTestId("textinput-image").value).toBe("");
    expect(screen.getByTestId("textinput-mediaLink").value).toBe("");
  });

  it("não deve chamar onSubmit se campos obrigatórios estiverem vazios", () => {
    const onSubmit = vi.fn();
    render(<Form onSubmit={onSubmit} playlists={playlistsMock} />);

    fireEvent.click(screen.getByRole("button", { name: /Salvar/i }));

    expect(onSubmit).not.toHaveBeenCalled();
  });

  it("deve limpar todos os campos ao clicar no botão Limpar", () => {
    render(<Form onSubmit={() => {}} playlists={playlistsMock} />);

    fireEvent.change(screen.getByTestId("textinput-title"), { target: { value: "Algum título" } });
    fireEvent.change(screen.getByRole("combobox", { name: /Playlist/i }), { target: { value: "1" } });
    fireEvent.change(screen.getByTestId("textinput-description"), { target: { value: "Desc" } });
    fireEvent.change(screen.getByTestId("textinput-image"), { target: { value: "http://img" } });
    fireEvent.change(screen.getByTestId("textinput-mediaLink"), { target: { value: "http://link" } });

    fireEvent.click(screen.getByRole("button", { name: /Limpar/i }));

    expect(screen.getByTestId("textinput-title").value).toBe("");
    expect(screen.getByRole("combobox", { name: /Playlist/i }).value).toBe("");
    expect(screen.getByTestId("textinput-description").value).toBe("");
    expect(screen.getByTestId("textinput-image").value).toBe("");
    expect(screen.getByTestId("textinput-mediaLink").value).toBe("");
  });
});

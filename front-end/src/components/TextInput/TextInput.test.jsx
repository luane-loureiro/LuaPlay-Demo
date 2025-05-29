import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { vi } from "vitest";
import TextInput from "./index";

describe("TextInput", () => {
  const label = "Nome";
  const placeholder = "Digite seu nome";

  test("renderiza input com label e placeholder", () => {
    render(<TextInput label={label} placeholder={placeholder} value="" onChange={() => {}} />);
    const input = screen.getByLabelText(label);
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute("placeholder", placeholder);
    expect(input).toHaveAttribute("type", "text");
  });

  test("usa id gerado pelo label quando id não é passado", () => {
    render(<TextInput label="Campo de Teste" value="" onChange={() => {}} />);
    const input = screen.getByLabelText("Campo de Teste");
    expect(input.id).toBe("input-campo-de-teste"); // ou ajuste conforme seu componente
  });

  test("renderiza input com type customizado", () => {
    render(<TextInput label={label} type="number" value="10" onChange={() => {}} />);
    const input = screen.getByLabelText(label);
    expect(input).toHaveAttribute("type", "number");
  });

  test("dispara onChange ao alterar valor", () => {
    const handleChange = vi.fn();
    render(<TextInput label={label} value="" onChange={handleChange} />);
    const input = screen.getByLabelText(label);

    fireEvent.change(input, { target: { value: "novo valor" } });
    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  test("renderiza mensagem de erro e atributos ARIA", () => {
    const errorMsg = "Campo obrigatório";
    render(<TextInput label={label} value="" onChange={() => {}} error={errorMsg} />);

    const input = screen.getByLabelText(label);
    expect(input).toHaveAttribute("aria-invalid", "true");
    expect(input).toHaveAttribute("aria-describedby", `${input.id}-error`);
    expect(screen.getByText(errorMsg)).toBeInTheDocument();
  });
});

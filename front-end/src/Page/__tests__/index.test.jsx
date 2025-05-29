import { vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

import Home from "../index.jsx"; // ajuste o caminho conforme seu projeto

vi.mock("../../contexts/AuthContext", () => ({
  useAuth: () => ({
    token: "fake-token",
    logout: vi.fn(),
  }),
}));

it("opens Delete Playlist modal when clicking delete playlist button", async () => {
  render(
    <MemoryRouter>
      <Home />
    </MemoryRouter>
  );

  // seu teste continua aqui...
});

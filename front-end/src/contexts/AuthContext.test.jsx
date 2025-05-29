import React from "react";
import { render, screen, act } from "@testing-library/react";
import { AuthProvider, useAuth } from "./AuthContext";

// Componente auxiliar para acessar contexto e expor valores para teste
function TestComponent() {
  const { user, token, login, logout } = useAuth();

  return (
    <div>
      <span data-testid="user">{user ? user.name : "null"}</span>
      <span data-testid="token">{token || "null"}</span>
      <button onClick={() => login({ userData: { name: "John" }, token: "abc123" })}>
        Login
      </button>
      <button onClick={logout}>Logout</button>
    </div>
  );
}

describe("AuthContext", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test("inicializa com valores do localStorage", () => {
    localStorage.setItem("user", JSON.stringify({ name: "Jane" }));
    localStorage.setItem("token", "token-xyz");

    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    expect(screen.getByTestId("user").textContent).toBe("Jane");
    expect(screen.getByTestId("token").textContent).toBe("token-xyz");
  });

  test("login atualiza estado e localStorage", () => {
    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    const loginBtn = screen.getByText("Login");

    act(() => {
      loginBtn.click();
    });

    expect(screen.getByTestId("user").textContent).toBe("John");
    expect(screen.getByTestId("token").textContent).toBe("abc123");

    expect(localStorage.getItem("user")).toBe(JSON.stringify({ name: "John" }));
    expect(localStorage.getItem("token")).toBe("abc123");
  });

  test("logout limpa estado e localStorage", () => {
    localStorage.setItem("user", JSON.stringify({ name: "Jane" }));
    localStorage.setItem("token", "token-xyz");

    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    const logoutBtn = screen.getByText("Logout");

    act(() => {
      logoutBtn.click();
    });

    expect(screen.getByTestId("user").textContent).toBe("null");
    expect(screen.getByTestId("token").textContent).toBe("null");
    expect(localStorage.getItem("user")).toBeNull();
    expect(localStorage.getItem("token")).toBeNull();
  });
});

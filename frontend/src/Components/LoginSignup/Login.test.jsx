// Login.test.jsx

import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Login from "./Login";
import { MemoryRouter } from "react-router-dom";
import axios from "axios";

// Mock axios
jest.mock("axios");

describe("Login Component", () => {
  test("renders login form", () => {
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    expect(screen.getByPlaceholderText("Email")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Password")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /login/i })).toBeInTheDocument();
  });

  test("successful login", async () => {
    axios.post.mockResolvedValue({
      data: { message: "Login successful" },
    });

    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByPlaceholderText("Email"), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByPlaceholderText("Password"), {
      target: { value: "password123" },
    });

    fireEvent.click(screen.getByRole("button", { name: /login/i }));

    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledWith("http://localhost:3000/login", {
        email: "test@example.com",
        password: "password123",
      });
      expect(localStorage.getItem("isLoggedIn")).toBe("true");
    });
  });
});

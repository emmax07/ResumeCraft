// Signup.test.jsx

import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Signup from "./Signup";
import { MemoryRouter } from "react-router-dom";
import axios from "axios";

// Mock axios
jest.mock("axios");

describe("Signup Component", () => {
  test("renders signup form", () => {
    render(
      <MemoryRouter>
        <Signup />
      </MemoryRouter>
    );

    expect(screen.getByPlaceholderText("Username")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Email")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Password")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /sign up/i })).toBeInTheDocument();
  });

  test("successful signup", async () => {
    axios.post.mockResolvedValue({
      data: { message: "Signup successful" },
    });

    render(
      <MemoryRouter>
        <Signup />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByPlaceholderText("Username"), {
      target: { value: "testuser" },
    });
    fireEvent.change(screen.getByPlaceholderText("Email"), {
      target: { value: "testuser@example.com" },
    });
    fireEvent.change(screen.getByPlaceholderText("Password"), {
      target: { value: "password123" },
    });

    fireEvent.click(screen.getByRole("button", { name: /sign up/i }));

    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledWith("http://localhost:3000/signup", {
        username: "testuser",
        email: "testuser@example.com",
        password: "password123",
      });
    });
  });
});

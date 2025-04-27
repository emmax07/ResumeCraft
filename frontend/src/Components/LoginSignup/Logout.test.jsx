// Logout.test.jsx

import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Logout from "./Logout";
import { MemoryRouter } from "react-router-dom";
import axios from "axios";

// Mock axios
jest.mock("axios");

describe("Logout Component", () => {
  test("logout button click triggers logout", async () => {
    axios.post.mockResolvedValue({
      data: { message: "Logout successful" },
    });

    // Pre-set localStorage
    localStorage.setItem("isLoggedIn", "true");

    render(
      <MemoryRouter>
        <Logout />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByRole("button", { name: /logout/i }));

    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledWith("http://localhost:3000/logout");
      expect(localStorage.getItem("isLoggedIn")).toBeNull(); // Should be removed
    });
  });
});

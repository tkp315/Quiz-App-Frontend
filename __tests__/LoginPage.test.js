import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginThunk } from "../src/redux/slice/userSlice";
import Login from "../src/pages/Login";
import { showErrorToast } from "../src/helpers/toastUtils";



jest.mock("react-redux", () => ({
  useDispatch: jest.fn(),
}));

jest.mock("react-router-dom", () => ({
  useNavigate: jest.fn(),
}));

jest.mock("../src/redux/slice/userSlice", () => ({
  loginThunk: jest.fn(),
}));

jest.mock("../src/helpers/toastUtils", () => ({
  showErrorToast: jest.fn(),
}));

describe("Login Component", () => {
  let mockDispatch;
  let mockNavigate;

  beforeEach(() => {
    mockDispatch = jest.fn();
    mockNavigate = jest.fn();
    useDispatch.mockReturnValue(mockDispatch);
    useNavigate.mockReturnValue(mockNavigate);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("renders Login component", () => {
    render(<Login />);
    expect(screen.getByLabelText("Email")).toBeInTheDocument();
    expect(screen.getByLabelText("Password")).toBeInTheDocument();
    const submitButton = screen.getByRole("button", { name: /login/i });

  });

  test("updates form state on input change", () => {
    render(<Login />);
    const emailInput = screen.getByLabelText("Email");
    const passwordInput = screen.getByLabelText("Password");

    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "password123" } });

    expect(emailInput.value).toBe("test@example.com");
    expect(passwordInput.value).toBe("password123");
  });

  test("handles successful login", async () => {
    const mockResponse = { payload: true }; // Mock successful login response
    loginThunk.mockResolvedValue(mockResponse);

    render(<Login />);

    const emailInput = screen.getByLabelText("Email");
    const passwordInput = screen.getByLabelText("Password");
    const submitButton = screen.getByRole("button", { name: /login/i });
    

    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "password123" } });
    fireEvent.click(submitButton);

  
  });

  // test("handles login failure and shows error toast", async () => {
  //   const mockAxiosError = {
  //     isAxiosError: true,
  //     response: { data: "Login failed. Please try again." },
  //   };
  
  //   // Mock `loginThunk` to reject with the mocked Axios error
  //   loginThunk.mockRejectedValue(mockAxiosError);
  
  //   render(<Login />);
  
  //   const emailInput = screen.getByLabelText("Email");
  //   const passwordInput = screen.getByLabelText("Password");
  //   const submitButton = screen.getByRole("button", { name: /login/i });
  
  //   fireEvent.change(emailInput, { target: { value: "test@example.com" } });
  //   fireEvent.change(passwordInput, { target: { value: "wrongpassword" } });
  //   fireEvent.click(submitButton);
  
  //   // Wait for the error toast to be shown
  //   await waitFor(() =>
  //     expect(showErrorToast).toHaveBeenCalledWith(mockAxiosError.response.data)
  //   );
  // });
  
});

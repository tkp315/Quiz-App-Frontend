import { render, screen } from "@testing-library/react";
import AuthProvider from "../src/context/AuthProvider";
import GoogleLogin from "../src/components/Auth/GoogleLogin";

// Mock the GoogleOAuthProvider
jest.mock("@react-oauth/google", () => ({
  GoogleOAuthProvider: ({ clientId, children }) => (
    <div>
      MockGoogleOAuthProvider - Client ID: {clientId}
      {children}
    </div>
  ),
}));

// Mock the GoogleLogin component
jest.mock("../src/components/Auth/GoogleLogin", () => jest.fn(() => (
  <div>MockGoogleLogin</div>
)));

const GOOGLE_CLIENT_ID = "test-client-id"; 



describe("AuthProvider Component", () => {
  afterEach(() => {
    jest.clearAllMocks(); 
  });

  test("renders GoogleOAuthProvider with the correct client ID", () => {
    render(<AuthProvider role="student" />);
    expect(
      screen.getByText(`MockGoogleOAuthProvider - Client ID: ${GOOGLE_CLIENT_ID}`)
    ).toBeInTheDocument();
  });

  test("renders GoogleLogin with the correct role", () => {
    render(<AuthProvider role="teacher" />);
    expect(screen.getByText("MockGoogleLogin")).toBeInTheDocument();
    expect(GoogleLogin).toHaveBeenCalledWith(
      { role: "teacher" },
      expect.anything() 
    );
  });

  test("throws an error if role prop is missing", () => {
    const consoleError = jest.spyOn(console, "error").mockImplementation(() => {});

    expect(() => render(<AuthProvider />)).toThrow(); 

    expect(consoleError).toHaveBeenCalledWith(
      expect.stringContaining("The prop `role` is marked as required")
    );

    consoleError.mockRestore(); 
  });
});

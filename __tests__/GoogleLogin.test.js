
import { render, screen, fireEvent } from '@testing-library/react';
import { useGoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import GoogleLogin from '../src/components/Auth/GoogleLogin';
import { axiosInstance } from '../src/helpers/axiosInstance';
import { setGoogleUser } from '../src/redux/slice/userSlice';

// Mock required hooks and modules
jest.mock('@react-oauth/google', () => ({
  useGoogleLogin: jest.fn(),
}));
jest.mock('react-router-dom', () => ({
  useNavigate: jest.fn(),
}));
jest.mock('react-redux', () => ({
  useDispatch: jest.fn(),
}));
jest.mock('../src/helpers/axiosInstance', () => ({
  axiosInstance: {
    post: jest.fn(),
  },
}));
jest.mock('../src/redux/slice/userSlice', () => ({
  setGoogleUser: jest.fn(),
}));

describe('GoogleLogin Component', () => {
  const mockNavigate = jest.fn();
  const mockDispatch = jest.fn();
  const mockUseGoogleLogin = jest.fn();
  
  beforeEach(() => {
    jest.clearAllMocks();
    useNavigate.mockReturnValue(mockNavigate);
    useDispatch.mockReturnValue(mockDispatch);
    useGoogleLogin.mockImplementation(() => mockUseGoogleLogin);
  });

  it('renders the Google Login button', () => {
    render(<GoogleLogin role="student" />);
    const button = screen.getByText('Sign in with Google');
    expect(button).toBeInTheDocument();
  });

  it('calls useGoogleLogin when the button is clicked', () => {
    render(<GoogleLogin role="teacher" />);
    const button = screen.getByText('Sign in with Google');
    fireEvent.click(button);

    expect(mockUseGoogleLogin).toHaveBeenCalled();
  });

  it('handles onSuccess callback correctly', async () => {
    const mockResponse = { code: 'auth-code' };
    axiosInstance.post.mockResolvedValue({
      status: 200,
      data: { data: { id: 1, name: 'Test User' } },
    });

    render(<GoogleLogin role="student" />);
    const onSuccess = useGoogleLogin.mock.calls[0][0].onSuccess;

    await onSuccess(mockResponse);

    expect(axiosInstance.post).toHaveBeenCalledWith('/user/google', {
      code: 'auth-code',
      role: 'student',
    });
    expect(mockDispatch).toHaveBeenCalledWith(setGoogleUser({ id: 1, name: 'Test User' }));
    expect(mockNavigate).toHaveBeenCalledWith('/');
  });

  it('handles onError callback correctly', async () => {
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {}); // Mock console.log
  
    render(<GoogleLogin role="student" />);
    const onError = useGoogleLogin.mock.calls[0][0].onError;
  
    const error = new Error('Google login failed');
    await onError(error);
  
    expect(consoleSpy).toHaveBeenCalledWith(error); // Check if console.log is called
    consoleSpy.mockRestore(); // Restore the original console.log
  });
  

  it('uses the provided role in the request', async () => {
    const mockResponse = { code: 'auth-code' };
    axiosInstance.post.mockResolvedValue({ status: 200, data: { data: {} } });

    render(<GoogleLogin role="admin" />);
    const onSuccess = useGoogleLogin.mock.calls[0][0].onSuccess;

    await onSuccess(mockResponse);

    expect(axiosInstance.post).toHaveBeenCalledWith('/user/google', {
      code: 'auth-code',
      role: 'admin',
    });
  });
});

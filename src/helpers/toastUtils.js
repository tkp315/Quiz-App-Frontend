import { toast } from "react-hot-toast";

// Common toast styles
const baseToastStyle = {
  padding: "16px", // Increased padding
  borderRadius: "8px", // Rounded corners
  border: "1px solid",
};

const successStyle = {
  ...baseToastStyle,
  backgroundColor: "#d4edda",
  color: "#155724",
  borderColor: "#c3e6cb",
};

const errorStyle = {
  ...baseToastStyle,
  backgroundColor: "#f8d7da",
  color: "#721c24",
  borderColor: "#f5c6cb",
};

// Utility function to show success toast
export const showSuccessToast = (message, options = {}) =>
  toast.success(message, {
    duration: 3000,
    position: "bottom-right",
    style: successStyle,
    ...options, // Allow overrides
  });

// Utility function to show error toast
export const showErrorToast = (message, options = {}) =>
  toast.error(message, {
    duration: 5000,
    position: "bottom-right",
    style: errorStyle,
    ...options, // Allow overrides
  });

  export const customPromiseStyles = {
    loading: {
        width: '300px',
        background: '#f0f0f0', // Light gray background
        color: '#4a4a4a', // Dark gray text
        padding: '16px',
        borderRadius: '8px',
        border: '1px solid black',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        fontSize: '14px',
        textAlign: 'center',
      },
      success: {
        width: '300px',
        background: '#d4edda', // Light green background
        color: '#155724', // Dark green text
        padding: '16px',
        borderRadius: '8px',
        border: '1px solid black',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        fontSize: '14px',
        textAlign: 'center',
      },
      error: {
        width: '300px',
        background: '#dc3545', // Red background
        color: '#ffffff', // White text
        padding: '16px',
        borderRadius: '8px',
        border: '1px solid black',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        fontSize: '14px',
        textAlign: 'center',
      },
  };
  
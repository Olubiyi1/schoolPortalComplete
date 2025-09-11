export const extractErrorMessage = (error: any): string => {
  // Check for backend error message first
  if (error.response?.data?.message) {
    return error.response.data.message;
  }
  
  // Check for validation errors array
  if (error.response?.data?.errors && Array.isArray(error.response.data.errors)) {
    return error.response.data.errors.join(', ');
  }
  
  // Check for network errors
  if (error.code === 'NETWORK_ERROR') {
    return 'Network error. Please check your connection.';
  }
  
  // Check for timeout
  if (error.code === 'ECONNABORTED') {
    return 'Request timeout. Please try again.';
  }
  
  // Default fallback
  return 'Something went wrong. Please try again.';
};
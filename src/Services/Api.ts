import axios from "axios";

// my backend repo
const API_URL = "http://localhost:3300/api"; 

// Types to match user inputs

type RegisterData = {
  firstname: string;
  surname: string;
  username: string;
  email: string;
  department: string;
  password: string;
  confirmPassword: string;
};

type LoginData = {
  email: string;
  password: string;
};


// register user
export const registerUser = async (userData: RegisterData) => {

    // removing confirm password from being sent to the backend
    // it should only be used in the frontend to validate before sending to backend
    const {confirmPassword,...otherInputs}=userData
  const response = await axios.post(`${API_URL}/signup`, otherInputs);
  return response.data;
};

// login user
export const loginUser = async (credentials: LoginData) => {
  const response = await axios.post(`${API_URL}/login`, credentials);
  return response.data;
};

// verify email
export const verifyUserEmail = async (token: string) => {
  const response = await axios.get(`${API_URL}/verify-email?token=${token}`);
  return response.data;
};

// Additional functions for later use

// export const forgotPassword = async (email: string) => {
//   const response = await axios.post(`${API_URL}/forgot-password`, { email });
//   return response.data;
// };

// export const resetPassword = async (token: string, newPassword: string) => {
//   const response = await axios.post(`${API_URL}/reset-password`, { token, newPassword });
//   return response.data;
// };
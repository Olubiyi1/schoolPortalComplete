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

// API responses
type ApiResponse = {
  status: string;
  message: string;
  data: any;
};

type CourseData={
  code:string,
  title:string,
  level:string,
  department:string,
  semester:string
}

// register user

export const registerUser = async (userData: RegisterData) => {
  // removing confirm password from being sent to the backend
  // it should only be used in the frontend to validate before sending to backend
  const { confirmPassword, ...otherInputs } = userData;
  const response = await axios.post(`${API_URL}/signup`, otherInputs);
  return response.data as ApiResponse;
};

// verify email
export const verifyUserEmail = async (token: string) => {
  const response = await axios.get(`${API_URL}/verify-email?token=${token}`);
  return response.data as ApiResponse;
};

// login user
export const loginUser = async (credentials: LoginData) => {
  const response = await axios.post(`${API_URL}/login`, credentials);
  return response.data as ApiResponse;
};

// admin login

export const admLogin = async(credentials: LoginData)=>{
  const response = await axios.post(`${API_URL}/admin/login`, credentials);
  return response.data as ApiResponse
}



// Add axios interceptor to include token in requests
axios.interceptors.request.use((config) => {
  const token = localStorage.getItem('authToken');
  if (token) {
    // Ensure headers object exists
    // config.headers = config.headers || {}; creates an empty headers object if it doesn't exist
    config.headers = config.headers || {};
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;``
});

// to get current user
export const getCurrentUser = async () => {
  const token = localStorage.getItem("authToken")
  const response = await axios.get(`${API_URL}/profile`);
  return response.data as ApiResponse;
};

// Add course (admin only)
// Add course (admin only)
export const addCourse = async (courseData: CourseData) => {
  // Make sure admin token is being sent
  const token = localStorage.getItem('adminToken');
  
  const config = {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  };

  const response = await axios.post(`${API_URL}/courses/add-courses`, courseData, config);
  return response.data as ApiResponse;
};


export const getStudentCourses = async () => {
  const token = localStorage.getItem("authToken"); // or studentToken
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(`${API_URL}/courses/all`, config);
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

import React, { useState } from "react";
import Button from "../../../Reuseable/ButtonProps/ButtonProps";
import { admLogin } from "../../../Services/Api";
import { useNavigate } from "react-router";
import { extractErrorMessage } from "../../../utils/errorHandlers";
import "./adminLogin.css"
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'
import Visibility from '@mui/icons-material/Visibility'
// import { adminDashboard } from "../adminDashboard/adminDashboard";

type LoginData = {
  email: string;
  password: string;
};

type Errors = {
  email: string;
  password: string;
};

export const AdminLogin = () => {
  const [formData, setFormData] = useState<LoginData>({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<Errors>({
    email: "",
    password: "",
  });

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const payload = {
      email: formData.email.toLowerCase().trim(),
      password: formData.password.trim(),
    };
    const { email, password } = payload;

    let newErrors: Errors = {
      email: "",
      password: "",
    };

    if (!email) {
      newErrors.email = "Email field is required";
    }

    if (!password) {
      newErrors.password = "Password field is required";
    }

    setErrors(newErrors);

    if (newErrors.email || newErrors.password) {
      return;
    }

    try {
      const response = await admLogin(payload);
      console.log("admin logged in successfully", response);

      // store jwt token

      localStorage.setItem("authToken", response.data);

      navigate("/adminDashboard");

      setFormData({
        email: "",
        password: "",
      });
    } catch (error: any) {
      const errorMessage = extractErrorMessage(error);
      alert(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login">
  

      <div className="formDetails">
        <h1>ADMIN LOGIN</h1>

        <div className="formData">
          <form action="" onSubmit={handleSubmit} className="loginInfo">
            <input
              type="email"
              name="email"
              placeholder="Enter email address"
              value={formData.email}
              onChange={handleChange}
            />
            {errors.email && <p className="error">{errors.email}</p>}

            <input
              // toggle between text and password
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Enter password"
              value={formData.password}
              onChange={handleChange}
            />
            <button id="toggleButton"
              type="button"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <VisibilityOffIcon className= "icons"/> : <Visibility className= "icons" />}
            </button>

            {errors.password && <p className="error">{errors.password}</p>}

            <Button type="submit" id="loginButton" disabled={isLoading}>
              {isLoading ? "Logging in..." : "Login"}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

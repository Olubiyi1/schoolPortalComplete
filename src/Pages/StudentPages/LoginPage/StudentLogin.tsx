import React, { useEffect, useState } from "react";
import studentHeroImg from "../../../assets/images/studentHeroImg.png";
import Button from "../../../Reuseable/ButtonProps/ButtonProps";
import "./StudentLogin.css";
import { loginUser } from "../../../Services/Api";
import { useNavigate } from "react-router";
import { extractErrorMessage } from "../../../utils/errorHandlers";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import Visibility from "@mui/icons-material/Visibility";

type LoginData = {
  email: string;
  password: string;
};

type Errors = {
  email: string;
  password: string;
};

export const StudentLogin = () => {
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

  //   handle form submission
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

    // input vaidation

    if (!email) {
      newErrors.email = "Email field cannot be left blank";
    }
    if (!password) {
      newErrors.password = "Password field cannot be left blank";
    }

    setErrors(newErrors);

    // stop if any error message exists

    if (newErrors.email || newErrors.password) {
      return;
    }

    setIsLoading(true);

    try {
      const response = await loginUser(payload);
      console.log("Login succesful", response);
      // alert("Login successful");

      // Store the JWT token
      localStorage.setItem("authToken", response.data);

      navigate("/dashboard");

      // set the form back to empty. the form resets only if login is successful
      setFormData({
        email: "",
        password: "",
      });

      // sends backend error message if any in the if statement
    } catch (error) {
      const errorMessage = extractErrorMessage(error);
      alert(errorMessage);
    } finally {
      setIsLoading(false);
    }

    // console.log("login successful", formData);
    //   alert("login successful");
  };

  return (
    <div className="login">
      <img src={studentHeroImg} alt="img" id="loginImg" />

      <div className="formDetails">
        <h1>Login</h1>

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
            <button
              id="toggleButton"
              type="button"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (<VisibilityOffIcon className="studentIcons" />) : (<Visibility className="studentIcons" />
              )}
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

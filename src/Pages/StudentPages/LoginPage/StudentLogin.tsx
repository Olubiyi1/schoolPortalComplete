import React, { useState } from "react";
import studentHeroImg from "../../../assets/images/studentHeroImg.png";
import Button from "../../../Reuseable/ButtonProps/ButtonProps";
import "./StudentLogin.css";

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  //   handle form submission
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { email, password } = formData;

    let newErrors: Errors = {
      email: "",
      password: "",
    };

    // input vaidation

    if (!email.trim()) {
      newErrors.email = "Email field cannot be left blank";
    }
    if (!password.trim()) {
      newErrors.password = "Password field cannot be left blank";
    }

    setErrors(newErrors);

    // stop if any error message exists

    if (newErrors.email || newErrors.password) {
      return;
    }

    console.log("login successful", formData);
    //   alert("login successful");

    // set the form back to empty
    setFormData({
      email: "",
      password: "",
    });
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
              type="password"
              name="password"
              placeholder="Enter password"
              value={formData.password}
              onChange={handleChange}
            />
            {errors.password && <p className="error">{errors.password}</p>}

            <Button type="submit" id="loginButton">
              Login
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

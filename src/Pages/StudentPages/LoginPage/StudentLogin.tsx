import React, { useState } from "react";
import studentHeroImg from "../../../assets/images/studentHeroImg.png";
import Button from "../../../Reuseable/ButtonProps/ButtonProps";
import "./StudentLogin.css";

type Login = {
  email: string;
  password: string;
};

export const StudentLogin = () => {
  const [formData, setFormData] = useState<Login>({
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

    if (!email.trim() || !password.trim()) {
      //   alert("please fill all fields");

      return;
    }

    // set the form back to empty
    setFormData({
      email: "",
      password: "",
    });

    console.log("login successful", formData);
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

          <input
            type="password"
            name="password"
            placeholder="Enter password"
            value={formData.password}
            onChange={handleChange}
          />

          <Button type="submit" id="loginButton">
            Login
          </Button>
        </form>
      </div>
    </div>
     </div>
  );
};

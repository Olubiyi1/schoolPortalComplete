import React, { useState } from "react";
import studentHeroImg from "../../../assets/images/studentHeroImg.png";
import "./Register.css"


type Department = "Electronics Works" | "RAC";

type StudentProfile = {
  firstName: string;
  surname: string;
  username: string;
  email: string;
  department: Department;
  password: "";
  confirmPassword: "";
};

export const RegisterStudent = () => {
  // using just a single state to collect data
  const [formData, setFormdata] = useState<StudentProfile>({
    firstName: "",
    surname: "",
    username: "",
    email: "",
    department: "RAC", //default value
    password: "",
    confirmPassword: "",
  });

  //   to map the department array
  const departments: Department[] = ["Electronics Works", "RAC"];

  // handle input/select changes

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormdata((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // handle form submission

  const handleSUbmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { firstName, surname, username, email, password, confirmPassword } =
      formData;

    if (
      !firstName.trim() ||
      !surname.trim() ||
      !username.trim() ||
      !email.trim() ||
      !password.trim() ||
      !confirmPassword.trim()
    ) {
      alert("please fill all fields");

      return;
    }

    if (confirmPassword !== password) {
      alert("password doesn't match");
    }

    setFormdata({
      firstName: "",
      surname: "",
      username: "",
      email: "",
      department: "Electronics Works",
      password: "",
      confirmPassword: "",
    });

    console.log("form submitted", formData);
    alert("student data ready for processing");
  };

  return (
    <div className="form-container">

      <img src={studentHeroImg} alt="img" />

      <div className="form">

        <h1>Begin Journey</h1>

        <form action="" onSubmit={handleSUbmit} className="formInfo">

          <label htmlFor="firstname">First name</label>
          <input
            id="firstname"
            type="text"
            name="firstName"
            placeholder="Enter first name"
            value={formData.firstName}
            onChange={handleChange}
          />

          <label htmlFor="surname">Surname</label>
          <input
            id="surname"
            type="text"
            name="surname"
            placeholder="Enter surname"
            value={formData.surname}
            onChange={handleChange}
          />

          <label htmlFor="department">Select department</label> 
          <select
            id="department"
            name="department"
            value={formData.department}
            onChange={handleChange}
          >
            {departments.map((dep) => (
              <option key={dep} value={dep}>
                {dep}
              </option>
            ))}
          </select>
          
          <label htmlFor="username">Username</label>
          <input
            id="username"
            type="text"
            name="username"
            placeholder="Enter username"
            value={formData.username}
            onChange={handleChange}
          />

          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="text"
            name="email"
            placeholder="Enter email"
            value={formData.email}
            onChange={handleChange}
          />

          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            name="password"
            placeholder="Enter password"
            value={formData.password}
            onChange={handleChange}
          />

          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            id="confirmPassword"
            type="password"
            name="confirmPassword"
            placeholder="Confirm password"
            value={formData.confirmPassword}
            onChange={handleChange}
          />

          <button type="submit">Register</button>
        </form>
      </div>
    </div>
  );
};

import React, { useState } from "react";
import studentHeroImg from "../../../assets/images/studentHeroImg.png";
import "./Register.css";
import { registerUser } from "../../../Services/Api";
import { log } from "node:console";

type Department = "Electronics Works" | "RAC";

type StudentFormData = {
  firstName: string;
  surname: string;
  username: string;
  email: string;
  department: Department;
  password: string;
  confirmPassword: string;
};

type Errors = {
  firstName: string;
  surname: string;
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export const RegisterStudent = () => {
  // using just a single state to collect data
  const [formData, setFormdata] = useState<StudentFormData>({
    firstName: "",
    surname: "",
    username: "",
    email: "",
    department: "RAC", //default value
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState<Errors>({
    firstName: "",
    surname: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  //   to map the department array since i am not hardcoding and just want to map
  const departments: Department[] = ["Electronics Works", "RAC"];

  // handle input/select changes since i am using a single useState
  // wouldnt have needed this if it had been individual useState for each input, the function would be inside the input

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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { firstName, surname, username, email, password, confirmPassword } =
      formData;

    let newErrors: Errors = {
      firstName: "",
      surname: "",
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    };

    // validation checks

    if (!firstName.trim()) {
      newErrors.firstName = "First name is required";
    }
    if (!surname.trim()) {
      newErrors.surname = "Surname is required";
    }
    if (!username.trim()) {
      newErrors.username = "Username is required";
    }

 // Check if email is empty
if (!email.trim()) {
  newErrors.email = "Email is required";
}
// Check if email has a valid format: something@something.something
// \S+ = one or more non-space characters
// @   = must have an @ symbol
// \.  = literal dot
// \S+ = one or more non-space characters after the dot
else if (!/\S+@\S+\.\S+/.test(email)) {
  newErrors.email = "Enter a valid email";
}


    if (!password.trim()) {
      newErrors.password = "Password is required";
    } else if (password.length < 8) {
      newErrors.password = "Password must be more than 8 characters";
    }

    if (!confirmPassword.trim()) {
      newErrors.confirmPassword = "Confirm password is required";
    } else if (confirmPassword !== password) {
      newErrors.confirmPassword = "Password does not match";
    }

    setErrors(newErrors);

    // Stop if any error message exists
    if (
      newErrors.firstName ||
      newErrors.surname ||
      newErrors.username ||
      newErrors.email ||
      newErrors.password ||
      newErrors.confirmPassword
    ) {
      return;
    }

    // API call
    try {
      const response = await registerUser(formData);
      console.log(response);
      alert("form submitted successfully");

      // reset form data if onyl signup is successful
      setFormdata({
        firstName: "",
        surname: "",
        username: "",
        email: "",
        department: "Electronics Works",
        password: "",
        confirmPassword: "",
      });

      // send backed error message
    } catch (error: any) {
      if (error.response?.data?.message) {
        alert(error.response.data.message);
      } else {
        alert("Something went wrong. Please try again.");
      }
    }
  };

  return (
    <div className="form-container">
      <img src={studentHeroImg} alt="img" />

      <div className="form">
        <h1>Begin Journey</h1>

        <form action="" onSubmit={handleSubmit} className="formInfo">
          <label htmlFor="firstname">First name</label>
          <input
            id="firstname"
            type="text"
            name="firstName"
            placeholder="Enter first name"
            value={formData.firstName}
            onChange={handleChange}
          />
          {errors.firstName && <p className="error">{errors.firstName}</p>}

          <label htmlFor="surname">Surname</label>
          <input
            id="surname"
            type="text"
            name="surname"
            placeholder="Enter surname"
            value={formData.surname}
            onChange={handleChange}
          />
          {errors.surname && <p className="error">{errors.surname}</p>}

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
          {errors.username && <p className="error">{errors.username}</p>}

          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="text"
            name="email"
            placeholder="Enter email"
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && <p className="error">{errors.email}</p>}

          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            name="password"
            placeholder="Enter password"
            value={formData.password}
            onChange={handleChange}
          />
          {errors.password && <p className="error">{errors.password}</p>}

          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            id="confirmPassword"
            type="password"
            name="confirmPassword"
            placeholder="Confirm password"
            value={formData.confirmPassword}
            onChange={handleChange}
          />
          {errors.confirmPassword && (
            <p className="error">{errors.confirmPassword}</p>
          )}

          <button type="submit">Register</button>
        </form>
      </div>
    </div>
  );
};

import React, { useState } from "react";
import studentHeroImg from "../../../assets/images/studentHeroImg.png";
import "./Register.css";
import { registerUser } from "../../../Services/Api";
import { extractErrorMessage } from "../../../utils/errorHandlers";


type Department = "Electronics Works" | "RAC";
type Level = "Tech 1" | "Tech 2" | "Tech 3";

type StudentFormData = {
  firstname: string;
  surname: string;
  username: string;
  email: string;
  department: string;
  password: string;
  level: string;
  confirmPassword: string;
};

type Errors = {
  firstname: string;
  surname: string;
  username: string;
  email: string;
  password: string;
  department: string;
  level: string;
  confirmPassword: string;
};

export const RegisterStudent = () => {
  // using just a single state to collect data
  const [formData, setFormdata] = useState<StudentFormData>({
    firstname: "",
    surname: "",
    username: "",
    email: "",
    department: "",
    password: "",
    level: "",
    confirmPassword: "",
  });

  // this sets the error messages
  const [errors, setErrors] = useState<Errors>({
    firstname: "",
    surname: "",
    username: "",
    email: "",
    password: "",
    department: "",
    level: "",
    confirmPassword: "",
  });

  // this confirms form submission and changes the display
  const [isRegistered, setIsRegistered] = useState<boolean>(false);

  // this changes button state
  const [isLoading, setIsLoading] = useState<boolean>(false);

  //   to map the department array since i am not hardcoding and just want to map
  const departments: Department[] = ["Electronics Works", "RAC"];
  const levels: Level[] = ["Tech 1", "Tech 2", "Tech 3"];

  // save email
  const [registeredEmail, setRegisteredEmail] = useState<string>("");

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

    // Trim all fields and lowercase email
    const payload = {
      firstname: formData.firstname.trim(),
      surname: formData.surname.trim(),
      username: formData.username.trim(),
      email: formData.email.toLowerCase().trim(),
      department: formData.department,
      password: formData.password,
      level: formData.level,
      confirmPassword: formData.confirmPassword
    };

    const {
      firstname,
      surname,
      username,
      email,
      password,
      confirmPassword,
      level,
      department
    } = payload;

    let newErrors: Errors = {
      firstname: "",
      surname: "",
      username: "",
      email: "",
      password: "",
      department: "",
      level: "",
      confirmPassword: "",
    };

    // validation checks

    if (!firstname.trim()) {
      newErrors.firstname = "First name is required";
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

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (
      !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/.test(
        formData.password
      )
    ) {
      newErrors.password =
        "Password must be at least 8 characters and include uppercase, lowercase, number, and special character";
    }

    if (!confirmPassword.trim()) {
      newErrors.confirmPassword = "Confirm password is required";
    } else if (confirmPassword !== password) {
      newErrors.confirmPassword = "Password does not match";
    }
    if (!formData.department) {
      newErrors.department = "Please select a department";
    }
    if (!formData.level) {
      newErrors.level = "Please select your level";
    }

    setErrors(newErrors);

    console.log("Submitting formData:", formData);
    console.log("Validation errors before submission:", newErrors);

    // Stop if any error message exists
    if (
      newErrors.firstname ||
      newErrors.surname ||
      newErrors.username ||
      newErrors.email ||
      newErrors.password ||
      newErrors.confirmPassword ||
      newErrors.level ||
      newErrors.department
    ) {
      return;
    }

    // API call
    try {
      // User clicks the button.This is set on the button
      setIsLoading(true);

      // calls the API
      const response = await registerUser(payload);
      console.log(response);

      setIsRegistered(true);
      setRegisteredEmail(formData.email); // keeps the original casing for UX cos its needed for the registration successful response

      // reset form data if only signup is successful
      setFormdata({
        firstname: "",
        surname: "",
        username: "",
        email: "",
        department: "",
        password: "",
        level: "",
        confirmPassword: "",
      });

      // send backend error message
    } catch (error) {
      const errorMessage = extractErrorMessage(error);
      alert(errorMessage);

      // stops loading whether success or error
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="form-container">
      <img src={studentHeroImg} alt="img" />

      <div className="form">
        {!isRegistered ? (
          <>
            <h1>Begin Journey</h1>

            <form action="" onSubmit={handleSubmit} className="formInfo">
              <label htmlFor="firstname">First name</label>
              <input
                id="firstname"
                type="text"
                name="firstname"
                placeholder="Enter first name"
                value={formData.firstname}
                onChange={handleChange}
              />
              {errors.firstname && <p className="error">{errors.firstname}</p>}

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
                <option value="" disabled>
                  --Select--
                </option>
                {departments.map((dep) => (
                  <option key={dep} value={dep}>
                    {dep}
                  </option>
                ))}
              </select>
              {errors.department && (
                <p className="error">{errors.department}</p>
              )}

              <label htmlFor="level">Select level</label>
              <select
                name="level"
                id="level"
                value={formData.level}
                onChange={handleChange}
              >
                <option value="" disabled>
                  --Select--
                </option>
                {levels.map((lev) => (
                  <option key={lev} value={lev}>
                    {lev}
                  </option>
                ))}
              </select>
              {errors.level && <p className="error">{errors.level}</p>}

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

              <button type="submit" disabled={isLoading}>
                {isLoading ? "Registering ..." : "Register"}
              </button>
            </form>
          </>
        ) : (
          <div className="success-message">
            <h1>Registration Successful!</h1>
            <p>
              We've sent a verification email to:
              <strong>{registeredEmail}</strong>
            </p>
            <p>Please check your inbox (and spam folder) for next steps.</p>
            <p>The email might take a few minutes to arrive.</p>
          </div>
        )}
      </div>
    </div>
  );
};

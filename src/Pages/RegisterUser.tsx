import React, { useState } from "react";

type Department = "Electronics Works" | "RAC";

type StudentProfile = {
  firstName: string;
  surname: string;
  username: string;
  email: string;
  department: Department;
  password: "";
};

export const SchoolPortalForm = () => {
  // using just a single state to collect data
  const [formData, setFormdata] = useState<StudentProfile>({
    firstName: "",
    surname: "",
    username: "",
    email: "",
    department: "RAC", //default value
    password: "",
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

    const { firstName, surname, username, email, password } = formData;

    if (
      !firstName.trim() ||
      !surname.trim() ||
      !username.trim() ||
      !email.trim() ||
      !password.trim()
    ) {
      alert("please fill all fields");

      return;
    }
      setFormdata({
    firstName: "",
    surname: "",
    username: "",
    email: "",
    department: "Electronics Works",
    password: "",
  });
  };

  console.log("form submitted", formData);
  alert("student data ready for processing");

  //   clear form



  return (
    <div className="form">
      <h1>Registration</h1>

      <form action="" onSubmit={handleSUbmit} className="formInfo">
        <input
          type="text"
          name="firstName"
          placeholder="Enter first name"
          value={formData.firstName}
          onChange={handleChange}
        />

        <input
          type="text"
          name="surname"
          placeholder="Enter surname"
          value={formData.surname}
          onChange={handleChange}
        />

        <select
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

        <input
          type="text"
          name="username"
          placeholder="Enter username"
          value={formData.username}
          onChange={handleChange}
        />

        <input
          type="text"
          name="email"
          placeholder="Enter email"
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

        <button type="submit">Register</button>
      </form>
    </div>
  );
};

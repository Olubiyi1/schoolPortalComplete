import React, { useState } from "react";
import "./Header.css";
import Button from "../ButtonProps/ButtonProps";
import logo from "../../assets/images/logo (4).png"

export const Header = () => {
  type Person = {
    name: string,
    age : number
  }

  const [person, setPerson] = useState<Person>({
    name: "",
    age : 0
  })
  return (
    <div className="main">
      <div className="schoolName">
        <img src={logo} alt="logo" />
        <h1>Government Technical College <br /> Ikorodu</h1>
      </div>

      <div className="links">
        <a href="./">Home</a>
        <a href="./">About</a>
        <a href="./">Academics</a>
      </div>

      <div className="navs">
        <Button type="submit" className="btn" id="student">Student</Button>
        <Button type="reset" className="btn" id="staff" >Staff</Button>
      </div>
    </div>
  );
};

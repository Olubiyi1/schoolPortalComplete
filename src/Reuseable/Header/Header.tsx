import React from "react";
import "./Header.css";
import logo from "../../assets/react.svg";
import {Button} from "../Props/ButtonProps/ButtonProps"

export const Header = () => {
  return (
    <div className="main">
      <div className="schoolName">
        <img src={logo} alt="logo" />
        <h1>Government Technical College Ikorodu</h1>
      </div>

      <div className="links">
        <a href="./">Home</a>
        <a href="./">About</a>
        <a href="./">Academics</a>
      </div>

      <div className="navs">
        <Button children= "Student"/>
        <Button children= "Staff"/>
      </div>
    </div>
  );
};

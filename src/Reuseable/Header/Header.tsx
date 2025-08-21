import React, { useState } from "react";
import "./Header.css";
import Button from "../ButtonProps/ButtonProps";
import logo from "../../assets/images/logo (4).png";
import { Link } from "react-router-dom";

export const Header = () => {
  return (
    <div className="main">
      <div className="schoolName">
        <img src={logo} alt="logo" />
        <h1>
          Government Technical College <br /> Ikorodu
        </h1>
      </div>

      <div className="links">
       <a href="./">Home</a>
        <a href="./AboutPage">About</a>
        <a href="./AcademicsPage">Academics</a>
      </div>

      <div className="navs">
        <Link to="/StudentHomepage">
          <Button type="submit" className="btn" id="student">
            Student
          </Button>
        </Link>
        
        <Button type="reset" className="btn" id="staff">
          Staff
        </Button>
      </div>
    </div>
  );
};

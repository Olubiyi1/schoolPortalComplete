// import React from "react";
import Button from "../../../Reuseable/ButtonProps/ButtonProps";
import StudentImg from "../../../assets/images/studentHeroImg.png";
import "./StudentHomepage.css";
import { Link } from "react-router-dom";

export const StudentHero = () => {
  return (
    <div className="studentHero">
      
      <div className="studentImg">
        <img src={StudentImg} alt="heroImage" id="heroImg" />
      </div>

      <div className="btnstd">
        <h1>Step inside.</h1>

        <Link to="/studentLogin">
          <Button type="submit" className="studentLogin stdbtn">
            Login
          </Button>
        </Link>

        <Link to="/registerstudent">
        <Button type="submit" className="studentSignup stdbtn">
          Sign Up
        </Button>
        </Link>
      </div>
    </div>
  );
};

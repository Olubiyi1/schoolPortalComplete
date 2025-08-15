// import React from "react";
import Button from "../../../Reuseable/ButtonProps/ButtonProps";
import StudentImg from "../../../assets/images/studentHeroImg.png";
import "./StudentHomepage.css";

export const StudentHero = () => {
  return (
    <div className="studentHero">
      <div className="studentImg">
        <img src={StudentImg} alt="" />
      </div>
      <h1>Student hub.</h1>
      <div className="btnstd">
        <Button type="submit" className="studentLogin stdbtn">
          Login
        </Button>
        <Button type="submit" className="studentSignup stdbtn">
          Sign Up
        </Button>
      </div>
    </div>
  );
};

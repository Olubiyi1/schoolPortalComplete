// import React from "react";
import Button from "../../../Reuseable/ButtonProps/ButtonProps";
import StudentImg from "../../../assets/images/studentHeroImg.png";
import BackArrow from "../../../assets/images/back arrow.svg"
import "./StudentHomepage.css";

export const StudentHero = () => {
  return (
      <div className="studentHero">
        <img src={BackArrow} alt="backarrow" id="arrow"/>
        <div className="studentImg">
          <img src={StudentImg} alt="heroImage" id="heroImg" />
        </div>
        
        <div className="btnstd">
          <h1>Step inside.</h1>
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

import React, { useState } from "react";
import "./Header.css";
import Button from "../ButtonProps/ButtonProps";
import logo from "../../assets/images/logo (4).png";
import { Link, NavLink } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";

export const Header = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="main">
      <div className="schoolName">
        <img src={logo} alt="logo" />
        <h1 className="schoolNameDesktop">
          Government Technical College <br /> Ikorodu
        </h1>
        <h1 className="schoolNameMobile">
          Government Technical <br /> College Ikorodu
        </h1>
      </div>

      {/* desktop links */}

      <div className="links">
        <NavLink to="/">Home</NavLink>
        <NavLink to="/AboutPage">About</NavLink>
        <NavLink to="AcademicsPage">Academics</NavLink>
      </div>

      <div className="navs">
        <Link to="/StudentHomepage">
          <Button type="submit" className="btn" id="student">
            Student
          </Button>
        </Link>

        <Button type="submit" className="btn" id="staff">
          Staff
        </Button>
      </div>
      {/* 
      <MenuIcon className="hamburger" />
      <CloseIcon className="closeIcon" />  */}

      <div className="hamburger" onClick={toggleMenu}>
        {isOpen ? <CloseIcon /> : <MenuIcon />}
      </div>

      {/* mobile link */}
      {isOpen && (
        <div className="mobileMenu">
          <NavLink to="/" onClick={toggleMenu}>
            Home
          </NavLink>
          <NavLink to="/AboutPage" onClick={toggleMenu}>
            About
          </NavLink>
          <NavLink to="/AcademicsPage" onClick={toggleMenu}>
            Academics
          </NavLink>
          <Link to="/StudentHomepage" onClick={toggleMenu}>
            <Button type="submit" className="btn" id="student">
              Student
            </Button>
          </Link>
          <Button type="submit" className="btn" id="staff" onClick={toggleMenu}>
            Staff
          </Button>
        </div>
      )}
    </div>
  );
};

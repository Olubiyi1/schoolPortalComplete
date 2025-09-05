import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";

type UserData = {
  firstName: string;
  surname: string;
  email: string;
  department: string;
};

type DashboardSection = "overview" | "courses" | "profile" | "Results";

export const Dashboard = () => {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState<DashboardSection>("overview");

  const userData: UserData = {
    firstName: "Babajide",
    surname: "Olubiyi",
    email: "olubiyibabajide@gmail.com",
    department: "Electronics Works",
  };

  const handleLogout = (): void => {
    navigate("/studentLogin");
  };

  const handleSectionChange = (section: DashboardSection): void => {
    setActiveSection(section);
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <div className="header-top">
          <h1>Student Dashboard</h1>
          <button onClick={handleLogout} className="logout-btn">
            Logout
          </button>
        </div>
        <div className="welcome-message">
          <h2>
            Welcome back, {userData.firstName} {userData.surname}!
          </h2>
          <p>
            {userData.email} • {userData.department}
          </p>
        </div>
      </div>

      <div className="dashboard-nav">
        <button
          className={`nav-btn ${activeSection === "overview" ? "active" : ""}`}
          onClick={() => handleSectionChange("overview")}
        >
          Overview
        </button>

        <button
          className={`nav-btn ${activeSection === "courses" ? "active" : ""}`}
          onClick={() => handleSectionChange("courses")}
        >
          Courses
        </button>
        
        <button
          className={`nav-btn ${activeSection === "profile" ? "active" : ""}`}
          onClick={() => handleSectionChange("profile")}
        >
          Profile
        </button>
        <button
          className={`nav-btn ${
            activeSection === "Results" ? "active" : ""}`}
          onClick={() => handleSectionChange("Results")}
        >
         Result
        </button>
      </div>

      <div className="dashboard-content">
        {activeSection === "overview" && (
          <div className="section-content">
            <div className="dashboard-card">
              <h3>Quick Overview</h3>
              <p>Your dashboard summary appears here.</p>
            </div>
          </div>
        )}

        {activeSection === "courses" && (
          <div className="section-content">
            <div className="dashboard-card">
              <h3>My Courses</h3>
              <p>Mathematics</p>
              <p>English Language</p>
              <p>Physics</p>
              <p>Chemistry</p>
              <p>Entreprenuership</p>
            </div>
          </div>
        )}

        {activeSection === "profile" && (
          <div className="section-content">
            <div className="dashboard-card">
              <h3>Profile Information</h3>
              <p>
                <strong>Name:</strong> {userData.firstName} {userData.surname}
              </p>
              <p>
                <strong>Email:</strong> {userData.email}
              </p>
              <p>
                <strong>Department:</strong> {userData.department}
              </p>
            </div>
          </div>
        )}

        {activeSection === "Results" && (
          <div className="section-content">
            <div className="dashboard-card">
              <h3>No results available</h3>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

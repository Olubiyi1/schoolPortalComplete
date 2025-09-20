// import React, { useState, useEffect, useRef } from "react";
// import { useNavigate } from "react-router-dom";
// import { getCurrentUser } from "../../../Services/Api";
// import "./Dashboard.css";

// type UserData = {
//   firstName: string;
//   surname: string;
//   email: string;
//   department: string;
//   level: string;
//   // semester:string
// };

// type DashboardSection = "overview" | "courses" | "profile" | "Results";

// export const Dashboard = () => {
//   const navigate = useNavigate();
//   const [activeSection, setActiveSection] =
//     useState<DashboardSection>("overview");
//   const [userData, setUserData] = useState<UserData | null>(null);
//   const [isLoading, setIsLoading] = useState<boolean>(true);
//   const [error, setError] = useState<string>("");

//   //prevent duplicate calls
//   // repeated issues . page loads twice in succession thereby causing a bad request

//   const hasFetchedData = useRef(false);

//   useEffect(() => {
//     fetchUserData();
//   }, []);

//   // fetch user data
//   const fetchUserData = async () => {
//     // Prevent duplicate calls
//     if (hasFetchedData.current) {
//       console.log("Data already fetched, skipping");
//       return;
//     }

//     hasFetchedData.current = true;

//     try {
//       setIsLoading(true);
//       const response = await getCurrentUser();

//       // This is based on my API response type in my App.ts
//       setUserData(response.data);
//       setError("");
//       console.log("User data fetched successfully:", response);
//     } catch (error: any) {
//       console.error("Error fetching user data:", error);
//       setError("Failed to load user data");

//       // If authentication fails, redirect to login
//       if (error.response?.status === 401) {
//         navigate("/studentLogin");
//       }
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleLogout = (): void => {
//     // Clear any stored auth tokens here
//     localStorage.removeItem("authToken"); // if you're using tokens
//     navigate("/studentLogin");
//   };

//   const handleSectionChange = (section: DashboardSection): void => {
//     setActiveSection(section);
//   };

//   // Show loading state
//   if (isLoading) {
//     return (
//       <div className="dashboard-container">
//         <div className="loading-message">
//           <h2>Loading your dashboard...</h2>
//           <p>Please wait while we fetch your information.</p>
//         </div>
//       </div>
//     );
//   }

//   // Show error state
//   if (error || !userData) {
//     return (
//       <div className="dashboard-container">
//         <div className="error-message">
//           <h2>Error Loading Dashboard</h2>
//           <p>{error || "Unable to load user data"}</p>
//           <button onClick={fetchUserData}>Try Again</button>
//           <button onClick={handleLogout}>Back to Login</button>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="dashboard-container">
//       <div className="dashboard-header">
//         <div className="header-top">
//           <h1>Student Dashboard</h1>
//           <button onClick={handleLogout} className="logout-btn">
//             Logout
//           </button>
//         </div>
//         <div className="welcome-message">
//           <h2>
//             Welcome back, {userData.firstName} {userData.surname}!
//           </h2>
//           <p>
//             {userData.email} • {userData.department}
//           </p>
//         </div>
//       </div>

//       <div className="dashboard-nav">
//         <button
//           className={`nav-btn ${activeSection === "overview" ? "active" : ""}`}
//           onClick={() => handleSectionChange("overview")}
//         >
//           Overview
//         </button>

//         <button
//           className={`nav-btn ${activeSection === "courses" ? "active" : ""}`}
//           onClick={() => handleSectionChange("courses")}
//         >
//           Courses
//         </button>

//         <button
//           className={`nav-btn ${activeSection === "profile" ? "active" : ""}`}
//           onClick={() => handleSectionChange("profile")}
//         >
//           Profile
//         </button>
//         <button
//           className={`nav-btn ${activeSection === "Results" ? "active" : ""}`}
//           onClick={() => handleSectionChange("Results")}
//         >
//           Results
//         </button>
//       </div>

//       <div className="dashboard-content">
//         {activeSection === "overview" && (
//           <div className="section-content">
//             <div className="dashboard-card">
//               <h3>Welcome, {userData.firstName}!</h3>
//               <p>Your dashboard summary appears here.</p>
//               <p>Department: {userData.department}</p>
//             </div>
//           </div>
//         )}

//         {activeSection === "courses" && (
//           <div className="section-content">
//             <div className="dashboard-card">
//               <h3>My Courses : {userData.level}</h3>
//               <p>Department: {userData.department}</p>
//               {/* not dynamic yet */}
//             </div>
//           </div>
//         )}

//         {activeSection === "profile" && (
//           <div className="section-content">
//             <div className="dashboard-card">
//               <h3>Profile Information</h3>
//               <p>
//                 <strong>Name:</strong> {userData.firstName} {userData.surname}
//               </p>
//               <p>
//                 <strong>Email:</strong> {userData.email}
//               </p>
//               <p>
//                 <strong>Department:</strong> {userData.department}
//               </p>
//             </div>
//           </div>
//         )}

//         {activeSection === "Results" && (
//           <div className="section-content">
//             <div className="dashboard-card">
//               <h3>Academic Results</h3>
//               <p>No results available at this time.</p>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { getCurrentUser } from "../../../Services/Api";
import "./Dashboard.css";

type UserData = {
  firstName: string;
  surname: string;
  email: string;
  department: string;
  level: string;
};

type Course = {
  _id: string;
  code: string;
  title: string;
  department: string;
  level: string;
  semester: string;
};

type DashboardSection = "overview" | "courses" | "profile" | "results";

export const Dashboard = () => {
  const navigate = useNavigate();

  const [activeSection, setActiveSection] =
    useState<DashboardSection>("overview");
  const [userData, setUserData] = useState<UserData | null>(null);
  const [courses, setCourses] = useState<Course[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string>("");

  const [coursesLoading, setCoursesLoading] = useState(false);
  const [coursesError, setCoursesError] = useState("");

  // Prevent duplicate calls
  const hasFetchedUser = useRef(false);

  useEffect(() => {
    fetchUserData();
  }, []);

  useEffect(() => {
    if (activeSection === "courses" && userData) {
      fetchCourses();
    }
  }, [activeSection, userData]);

  // Fetch current user
  const fetchUserData = async () => {
    if (hasFetchedUser.current) return;
    hasFetchedUser.current = true;

    try {
      setIsLoading(true);
      const response = await getCurrentUser();
      setUserData(response.data);
      setError("");
    } catch (err: any) {
      console.error("Error fetching user data:", err);
      setError("Failed to load user data");

      if (err.response?.status === 401) {
        navigate("/studentLogin");
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch student courses
  const fetchCourses = async () => {
    try {
      setCoursesLoading(true);
      setCoursesError("");

      const token = localStorage.getItem("authToken");
      const res = await fetch("http://localhost:3300/api/courses/all", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) throw new Error("Failed to fetch courses");

      const data = await res.json();
      setCourses(data.data || []);
    } catch (err: any) {
      console.error("Error fetching courses:", err);
      setCoursesError("Unable to load courses");
    } finally {
      setCoursesLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/studentLogin");
  };

  const handleSectionChange = (section: DashboardSection) => {
    setActiveSection(section);
  };

  if (isLoading) {
    return (
      <div className="dashboard-container">
        <div className="loading-message">
          <h2>Loading your dashboard...</h2>
          <p>Please wait while we fetch your information.</p>
        </div>
      </div>
    );
  }

  if (error || !userData) {
    return (
      <div className="dashboard-container">
        <div className="error-message">
          <h2>Error Loading Dashboard</h2>
          <p>{error || "Unable to load user data"}</p>
          <button onClick={fetchUserData}>Try Again</button>
          <button onClick={handleLogout}>Back to Login</button>
        </div>
      </div>
    );
  }

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
            Welcome back,{" "}
            {userData.firstName.charAt(0).toUpperCase() +
              userData.firstName.slice(1).toLowerCase() } {""}
            { userData.surname.charAt(0).toUpperCase() + userData.surname.slice(1).toLowerCase()}!
          </h2>
          <p>
            {userData.email} • {userData.department} •{userData.level}
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
          className={`nav-btn ${activeSection === "results" ? "active" : ""}`}
          onClick={() => handleSectionChange("results")}
        >
          Results
        </button>
      </div>

      <div className="dashboard-content">
        {activeSection === "overview" && (
          <div className="section-content">
            <div className="dashboard-card">
              <h3>Welcome, {userData.firstName.toUpperCase()}!</h3>
              <p>Your dashboard summary appears here.</p>
              <p>Department: {userData.department}</p>
              <p>Level: {userData.level}</p>
            </div>
          </div>
        )}

        {activeSection === "courses" && (
          <div className="section-content">
            <div className="dashboard-card">
              <h3>My Courses</h3>
              {/* <p>Department: {userData.department}</p> */}

              {coursesLoading && <p>Loading courses...</p>}
              {coursesError && <p className="error">{coursesError}</p>}
              {!coursesLoading && courses.length === 0 && (
                <p>No courses found for your level/department.</p>
              )}

              <ul>
                {courses.map((course) => (
                  <li key={course._id}>
                    {course.code} - {course.title} ( {course.semester})
                  </li>
                ))}
              </ul>
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
              <p>
                <strong>Level:</strong> {userData.level}
              </p>
            </div>
          </div>
        )}

        {activeSection === "results" && (
          <div className="section-content">
            <div className="dashboard-card">
              <h3>Academic Results</h3>
              <p>No results available at this time.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

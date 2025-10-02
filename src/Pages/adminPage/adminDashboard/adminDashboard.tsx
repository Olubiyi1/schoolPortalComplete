import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
// import { addCourse } from "../../Services/Api";
import { extractErrorMessage } from "../../../utils/errorHandlers";
import { addCourse } from "../../../Services/Api";

type DashboardSection = "overview" | "add-course" | "all-courses" | "students";

type CourseData = {
  code: string;
  title: string;
  department: string;
  level: string;
  semester: string;
};

type CourseErrors = {
  code: string;
  title: string;
  department: string;
  level: string;
  semester: string;
  general: string;
};

export const AdminDashboard = () => {
  const navigate = useNavigate();
   // is loading state
  const [isLoadingCourses, setIsLoadingCourses] = useState<boolean>(false);

  const [activeSection, setActiveSection] =
    useState<DashboardSection>("overview");

  // Course form state
  const [courseData, setCourseData] = useState<CourseData>({
    code: "",
    title: "",
    department: "",
    level: "",
    semester: "",
  });

 

  // all courses state
  const [allCourses, setAllCourses] = useState<CourseData>({
     code: "",
    title: "",
    department: "",
    level: "",
    semester: "",
  })

  const [courseErrors, setCourseErrors] = useState<CourseErrors>({
    code: "",
    title: "",
    department: "",
    level: "",
    semester: "",
    general: "",
  });

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  // Options for dropdowns
  const departments = ["Electronics Works", "RAC"];
  const levels = ["Tech 1", "Tech 2", "Tech 3"];
  const semesters = ["First Term", "Second Term", "Third Term"];

  const handleLogout = (): void => {
    localStorage.removeItem("adminToken");
    navigate("/AdminLogin");
  };

  const handleSectionChange = (section: DashboardSection): void => {
    setActiveSection(section);
  };

  // Handle course form changes
  const handleCourseChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setCourseData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle course form submission
  const handleCourseSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Reset errors
    let newErrors: CourseErrors = {
      code: "",
      title: "",
      department: "",
      level: "",
      semester: "",
      general: "",
    };

    // Validation
    if (!courseData.code.trim()) {
      newErrors.code = "Course code is required";
    }
    if (!courseData.title.trim()) {
      newErrors.title = "Course name is required";
    }
    if (!courseData.department) {
      newErrors.department = "Department is required";
    }
    if (!courseData.level) {
      newErrors.level = "Level is required";
    }
    if (!courseData.semester) {
      newErrors.semester = "Semester is required";
    }

    setCourseErrors(newErrors);

    // Check if there are any errors
    // if (Object.values(newErrors).some(error => error !== "")) {
    //   return;
    // }

    if (
      newErrors.code ||
      newErrors.title ||
      newErrors.department ||
      newErrors.level ||
      newErrors.semester
    ) {
      return; // Stop if any field has an error
    }

    try {
      setIsSubmitting(true);

      await addCourse(courseData);

      // Reset form on success
      setCourseData({
        code: "",
        title: "",
        department: "",
        level: "",
        semester: "",
      });

      // Clear any previous errors
      setCourseErrors({
        code: "",
        title: "",
        department: "",
        level: "",
        semester: "",
        general: "",
      });

      alert("Course added successfully!");
    } catch (error: any) {
      const errorMessage = extractErrorMessage(error);
      setCourseErrors({ ...courseErrors, general: errorMessage });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <div className="header-top">
          <h1>Admin Dashboard</h1>
          <button onClick={handleLogout} className="logout-btn">
            Logout
          </button>
        </div>
        <div className="welcome-message">
          <h2>School Portal Administration</h2>
          <p>Manage courses and students</p>
        </div>
      </div>

      {/* dashboard navs */}

      <div className="dashboard-nav">
        <button
          className={`nav-btn ${activeSection === "overview" ? "active" : ""}`}
          onClick={() => handleSectionChange("overview")}
        >
          Overview
        </button>
        <button
          className={`nav-btn ${
            activeSection === "add-course" ? "active" : ""
          }`}
          onClick={() => handleSectionChange("add-course")}
        >
          Add Course
        </button>
        <button
          className={`nav-btn ${
            activeSection === "all-courses" ? "active" : ""
          }`}
          onClick={() => handleSectionChange("all-courses")}
        >
          All Courses
        </button>
        <button
          className={`nav-btn ${activeSection === "students" ? "active" : ""}`}
          onClick={() => handleSectionChange("students")}
        >
          Students
        </button>
      </div>

{/* dashboard contente */}
      <div className="dashboard-content">
        {activeSection === "overview" && (
          <div className="section-content">
            <div className="dashboard-card">
              <h3>Admin Overview</h3>
              <p>Welcome to the administration panel</p>
              <p>Use the navigation above to manage courses and students</p>
            </div>
          </div>
        )}

{/* add new course */}
        {activeSection === "add-course" && (
          <div className="section-content">
            <div className="dashboard-card">
              <h3>Add New Course</h3>

              {courseErrors.general && (
                <div className="error general-error">
                  {courseErrors.general}
                </div>
              )}

              <form onSubmit={handleCourseSubmit} className="course-form">
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="courseCode">Course Code *</label>
                    <input
                      id="code"
                      type="text"
                      name="code"
                      placeholder="e.g., ELE 101"
                      value={courseData.code}
                      onChange={handleCourseChange}
                    />
                    {courseErrors.code && (
                      <p className="error">{courseErrors.code}</p>
                    )}
                  </div>

    
                </div>

                <div className="form-group">
                  <label htmlFor="courseName">Course Title *</label>
                  <input
                    id="title"
                    type="text"
                    name="title"
                    placeholder="e.g., Introduction to Electronics"
                    value={courseData.title}
                    onChange={handleCourseChange}
                  />
                  {courseErrors.title && (
                    <p className="error">{courseErrors.title}</p>
                  )}
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="department">Department *</label>
                    <select
                      id="department"
                      name="department"
                      value={courseData.department}
                      onChange={handleCourseChange}
                    >
                      <option value="">Select Department</option>
                      {departments.map((dept) => (
                        <option key={dept} value={dept}>
                          {dept}
                        </option>
                      ))}
                    </select>
                    {courseErrors.department && (
                      <p className="error">{courseErrors.department}</p>
                    )}
                  </div>

                  <div className="form-group">
                    <label htmlFor="level">Level *</label>
                    <select
                      id="level"
                      name="level"
                      value={courseData.level}
                      onChange={handleCourseChange}
                    >
                      <option value="">Select Level</option>
                      {levels.map((level) => (
                        <option key={level} value={level}>
                          {level}
                        </option>
                      ))}
                    </select>
                    {courseErrors.level && (
                      <p className="error">{courseErrors.level}</p>
                    )}
                  </div>

                  <div className="form-group">
                    <label htmlFor="semester">Semester *</label>
                    <select
                      id="semester"
                      name="semester"
                      value={courseData.semester}
                      onChange={handleCourseChange}
                    >
                      <option value="">Select Semester</option>
                      {semesters.map((sem) => (
                        <option key={sem} value={sem}>
                          {sem}
                        </option>
                      ))}
                    </select>
                    {courseErrors.semester && (
                      <p className="error">{courseErrors.semester}</p>
                    )}
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="submit-btn"
                >
                  {isSubmitting ? "Adding Course..." : "Add Course"}
                </button>
              </form>
            </div>
          </div>
        )}


{/* all course */}
        {activeSection === "all-courses" && (
          <div className="section-content">
            <div className="dashboard-card">
              <h3>All Courses</h3>
              <p>Course list will go here</p>
            </div>
          </div>
        )}

        {activeSection === "students" && (
          <div className="section-content">
            <div className="dashboard-card">
              <h3>Student Management</h3>
              <p>Student list will go here</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

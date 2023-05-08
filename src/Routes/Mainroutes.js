import LoginPage from "../pages/Loginpage";
import React from "react";
import ReactDOM from "react-dom/client";
import StudentPage from "../pages/StudentPage";
import { Route, Routes } from "react-router-dom";
import TimetablePage from "../pages/TimeTablePage";
import CourseRegistrationPage from "../pages/CourseRegistrationPage";
import AcademicRecordPage from "../pages/AcademicRecordPage";

const MainRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/student" element={<StudentPage />} />
      <Route path="/student/timetable" element={<TimetablePage />} />
      <Route path="/student/academic-record" element={<AcademicRecordPage />} />
      <Route
        path="/student/course-registration"
        element={<CourseRegistrationPage />}
      />
    </Routes>
  );
};

export default MainRoutes;

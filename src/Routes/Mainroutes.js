import LoginPage from "../pages/Loginpage";
import React from "react";
import ReactDOM from "react-dom/client";
import StudentPage from "../pages/StudentPage";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import TimetablePage from "../pages/TimeTablePage";
import CourseRegistrationPage from "../pages/CourseRegistrationPage";
import AcademicRecordPage from "../pages/AcademicRecordPage";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// ==============================|| MAIN ROUTING ||============================== //

const router = createBrowserRouter([
  {
    path: "/",
    element: <LoginPage />,
  },
  {
    path: "/student",
    element: <StudentPage />,
  },
  {
    path: "/student/timetable",
    element: <TimetablePage />,
  },
  {
    path: "/student/academic-record",
    element: <AcademicRecordPage />,
  },
  {
    path: "/student/course-registration",
    element: <CourseRegistrationPage />,
  },
]);
export default router;

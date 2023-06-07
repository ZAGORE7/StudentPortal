import LoginPage from "../pages/Loginpage";
import React from "react";
import StudentPage from "../pages/StudentPage";
import { Route, Routes } from "react-router-dom";
import TimetablePage from "../pages/TimeTablePage";
import CourseRegistrationPage from "../pages/CourseRegistrationPage";
import AcademicRecordPage from "../pages/AcademicRecordPage";
import AdvisorStudentPage from "../pages/AdvisorStudenPage";
import AdvisorStudentView from "../pages/AdvisorStudentView";
import ClassroomTimetable from "../pages/ClassroomTimeTable";
import AssignAdvisor from "../pages/AssignAdvisor";
import CoursesPage from "../pages/CoursePage";
const MainRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/advisor" element={<AdvisorStudentPage />} />
      <Route path="/advisor/students" element={<AdvisorStudentPage />} />
      <Route
        path="/advisor/classroom-timetable"
        element={<ClassroomTimetable />}
      />
      <Route path="/student/:id" element={<AdvisorStudentView />} />
      <Route path="/student" element={<StudentPage />} />
      <Route path="/student/timetable" element={<TimetablePage />} />
      <Route path="/student/profile" element={<AcademicRecordPage />} />
      <Route
        path="/student/course-registration"
        element={<CourseRegistrationPage />}
      />
      <Route path="/admin/assign" element={<AssignAdvisor />} />
      <Route path="/admin/courses" element={<CoursesPage />} />
    </Routes>
  );
};

export default MainRoutes;

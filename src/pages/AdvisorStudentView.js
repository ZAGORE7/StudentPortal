// AdvisorStudentView.js
import React from "react";
import AcademicRecord from "../components/AcademicRecord";
import Timetable from "../components/TimeTableComp";
import ConfirmCourses from "./ConfirmCourses";
import { Box } from "@mui/material";

const studentData = [
  {
    studentId: 1,
    studentName: "John",
    studentSurname: "Doe",
    department: "Computer Science",
    email: "john.doe@example.com",
  },
  {
    studentId: 2,
    studentName: "Berke",
    studentSurname: "Çelik",
    department: "Computer Science",
    email: "berke@example.com",
  },
  {
    studentId: 3,
    studentName: "Fatih",
    studentSurname: "Altaylı",
    department: "Computer Science",
    email: "Fato@example.com",
  },

  //... other students
];
const AdvisorStudentView = ({ studentData }) => {
  return (
    <div>
      <Box sx={{ m: 10 }}>
        <AcademicRecord studentData={studentData} />
      </Box>
      <Box>
        <Timetable studentData={studentData} />
      </Box>
    </div>
  );
};

export default AdvisorStudentView;

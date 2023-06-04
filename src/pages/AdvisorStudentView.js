// AdvisorStudentView.js
import React from "react";
import AcademicRecord from "../components/AcademicRecord";
import Timetable from "../components/TimeTableComp";
import ConfirmCourses from "./ConfirmCourses";
import { Box } from "@mui/material";
import StudentCourseTable from "../components/StudentCourseTable";
const courses = [
  {
    id: 1,
    code: "CMPE101",
    name: "Logic Design",
    instructor: "Mohammed Salamah",
    classroom: "Classroom A",
    status: "Confirmed",
    periods: [
      { day: "Monday", startTime: "08:30", endTime: "09:20" },
      // ... other periods
    ],
  },
  // ... other courses
];

// Filter the courses to only include confirmed ones
const confirmedCourses = courses.filter(
  (course) => course.status === "Confirmed"
);

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
        <Timetable studentData={confirmedCourses} />
      </Box>
      <Box>
        <StudentCourseTable />
      </Box>
    </div>
  );
};

export default AdvisorStudentView;

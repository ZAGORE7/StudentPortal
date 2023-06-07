// AdvisorStudentView.js
import React from "react";
import AcademicRecord from "../components/AcademicRecord";
import Timetable from "../components/TimeTableComp";
import ConfirmCourses from "./ConfirmCourses";
import { Box } from "@mui/material";
import StudentCourseTable from "../components/StudentCourseTable";
import NavBarA from "../components/NavbarA";
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
const student = [
  {
    name: "John Doe",
    advisor: "Dr. Smith",
    advisorEmail: "dr.smith@example.com",

    courses: [
      { code: "CMPE101", name: "Intro to Computer Engineering", mark: "A" },
      { code: "CMPE102", name: "Data Structures", mark: "B+" },
      { code: "CMPE103", name: "Algorithms", mark: "A-" },
      { code: "CMPE104", name: "Computer Networks", mark: "B" },
      { code: "CMPE105", name: "Operating Systems", mark: "C+" },
      { code: "CMPE106", name: "Software Engineering", mark: "D" }, // Failed course
      { code: "CMPE107", name: "Artificial Intelligence", mark: "A+" },
      { code: "CMPE108", name: "Machine Learning", mark: "B-" },
      { code: "CMPE109", name: "Embedded Systems", mark: "F" }, // Failed course
      { code: "CMPE110", name: "Computer Graphics", mark: "D-" }, // Failed course
    ],
  },
  {
    name: "Berke Çelik",
    studentId: 2,
    advisor: "Dr. Selo",
    advisorEmail: "dr.selo@example.com",

    courses: [
      { code: "CMPE101", name: "Intro to Computer Engineering", mark: "C" },
      { code: "CMPE102", name: "Data Structures", mark: "C+" },
      { code: "CMPE103", name: "Algorithms", mark: "B-" },
      { code: "CMPE104", name: "Computer Networks", mark: "B" },
      { code: "CMPE105", name: "Operating Systems", mark: "D+" },
      { code: "CMPE106", name: "Software Engineering", mark: "A" }, // Failed course
      { code: "CMPE107", name: "Artificial Intelligence", mark: "B+" },
      { code: "CMPE108", name: "Machine Learning", mark: "F" },
      { code: "CMPE109", name: "Embedded Systems", mark: "F" }, // Failed course
      { code: "CMPE110", name: "Computer Graphics", mark: "B-" }, // Failed course
    ],
  },
];

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
      <NavBarA />
      <Box sx={{ m: 10 }}>
        <AcademicRecord student={student} />
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

import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
} from "@mui/material";
import NavBarA from "../components/NavbarA";
const advisorData = [
  {
    advisorId: 1,
    advisorName: "John Doe",
    advisorEmail: "advisor1@example.com",
    students: [
      {
        studentId: 1,
        studentName: "Alice",
        studentEmail: "alice@example.com",
        academicRecord: [
          { courseId: 1, courseName: "Math", grade: "A" },
          { courseId: 2, courseName: "Physics", grade: "B" },
          { courseId: 3, courseName: "Chemistry", grade: "C" },
        ],
      },
      {
        studentId: 2,
        studentName: "Bob",
        studentEmail: "bob@example.com",
        academicRecord: [
          { courseId: 1, courseName: "Math", grade: "C" },
          { courseId: 2, courseName: "Physics", grade: "D" },
          { courseId: 3, courseName: "Chemistry", grade: "B" },
        ],
      },
      // Add more students as needed
    ],
  },
  {
    advisorId: 2,
    advisorName: "Jane Smith",
    advisorEmail: "advisor2@example.com",
    students: [
      {
        studentId: 3,
        studentName: "Charlie",
        studentEmail: "charlie@example.com",
        academicRecord: [
          { courseId: 1, courseName: "Math", grade: "A" },
          { courseId: 2, courseName: "Physics", grade: "A" },
          { courseId: 3, courseName: "Chemistry", grade: "A" },
        ],
      },
      {
        studentId: 4,
        studentName: "Diana",
        studentEmail: "diana@example.com",
        academicRecord: [
          { courseId: 1, courseName: "Math", grade: "B" },
          { courseId: 2, courseName: "Physics", grade: "C" },
          { courseId: 3, courseName: "Chemistry", grade: "D" },
        ],
      },
      // Add more students as needed
    ],
  },
  // Add more advisors as needed
];

const AdvisorPage = () => {
  // Assuming advisorId is passed as a prop or retrieved from the user's session
  const advisorId = 1; // Replace with the correct advisorId
  const advisor = advisorData.find(
    (advisor) => advisor.advisorId === advisorId
  );

  return (
    <div>
      <NavBarA />
      <Typography variant="h4" gutterBottom>
        {advisor.advisorName}'s Students
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Student Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Course Name</TableCell>
              <TableCell>Grade</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {advisor.students.map((student) => {
              return student.academicRecord.map((record, index) => (
                <TableRow key={record.courseId}>
                  {index === 0 && (
                    <>
                      <TableCell rowSpan={student.academicRecord.length}>
                        {student.studentName}
                      </TableCell>
                      <TableCell rowSpan={student.academicRecord.length}>
                        {student.studentEmail}
                      </TableCell>
                    </>
                  )}
                  <TableCell>{record.courseName}</TableCell>
                  <TableCell>{record.grade}</TableCell>
                </TableRow>
              ));
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default AdvisorPage;

import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import React from "react";

const StudentCourseTable = () => {
  const studentCourses = [
    { id: 1, courseCode: "CMPE101", status: "Pending" },
    { id: 2, courseCode: "PHYS101", status: "Confirmed" },
    { id: 3, courseCode: "CHEM101", status: "Pending" },
    { id: 4, courseCode: "MATH101", status: "Confirmed" },
  ];

  const confirmCourse = (id) => {
    // Write your confirmation logic here
    console.log(`Confirming course with id: ${id}`);
  };

  const removeCourse = (id) => {
    // Write your removal logic here
    console.log(`Removing course with id: ${id}`);
  };

  return (
    <Table aria-label="simple table">
      <TableHead>
        <TableRow>
          <TableCell>Course Code</TableCell>
          <TableCell>Status</TableCell>
          <TableCell>Action</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {studentCourses.map((course) => (
          <TableRow key={course.id}>
            <TableCell>{course.courseCode}</TableCell>
            <TableCell>{course.status}</TableCell>
            <TableCell>
              {course.status === "Pending" && (
                <Button
                  size="small"
                  color="primary"
                  onClick={() => confirmCourse(course.id)}
                >
                  Confirm
                </Button>
              )}
              <Button
                size="small"
                color="secondary"
                onClick={() => removeCourse(course.id)}
              >
                Remove
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default StudentCourseTable;

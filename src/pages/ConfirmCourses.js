// ConfirmCourses.js
import React from "react";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
} from "@mui/material";

const ConfirmCourses = ({ selectedCourses }) => {
  const confirmCourse = (courseId) => {
    // Implement your course confirmation logic here.
    console.log(`Course ${courseId} confirmed.`);
  };

  return (
    <div>
      <h2>Confirm Courses</h2>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Course Code</TableCell>
            <TableCell>Course Name</TableCell>
            <TableCell>Instructor</TableCell>
            <TableCell>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {selectedCourses.map((course) => (
            <TableRow key={course.id}>
              <TableCell component="th" scope="row">
                {course.code}
              </TableCell>
              <TableCell>{course.name}</TableCell>
              <TableCell>{course.instructor}</TableCell>
              <TableCell>
                <Button
                  size="small"
                  color="primary"
                  onClick={() => confirmCourse(course.id)}
                >
                  Confirm
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ConfirmCourses;

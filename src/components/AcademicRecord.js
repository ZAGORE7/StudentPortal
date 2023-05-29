import React from "react";
import {
  Container,
  Typography,
  Grid,
  TableCell,
  Box,
  Paper,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

const AcademicRecord = () => {
  const markBackgroundColor = (mark) => {
    if (mark === "F" || mark === "D" || mark === "D-") {
      return "red";
    }
    return "transparent";
  };
  const student = {
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
  };

  return (
    <div>
      <Container maxWidth="md">
        <Typography variant="h4" gutterBottom>
          Academic Record Sheet
        </Typography>
        <Grid justifyContent={"center"}>
          <Grid>
            <TableContainer component={Paper}>
              <Table aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Course Code</TableCell>
                    <TableCell>Course Name</TableCell>
                    <TableCell>Grade</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {student.courses.map((course, index) => (
                    <TableRow key={index}>
                      <TableCell>{course.code}</TableCell>
                      <TableCell>{course.name}</TableCell>
                      <TableCell
                        style={{
                          backgroundColor: markBackgroundColor(course.mark),
                        }}
                      >
                        {course.mark}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default AcademicRecord;

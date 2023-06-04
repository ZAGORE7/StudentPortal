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
  Container,
} from "@mui/material";

const timePeriods = [
  "08:30-09:20",
  "09:30-10:20",
  "10:30-11:20",
  "11:30-12:20",
  "12:30-13:20",
  "13:30-14:20",
  "14:30-15:20",
  "15:30-16:20",
  "16:30-17:20",
  "17:30-18:20",
];

const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

const ClassTable = ({ selectedClassroom, courses }) => {
  const selectedCourses = courses.filter(
    (course) => course.classroom === selectedClassroom
  );

  const hasLesson = (day, period) => {
    const [startTime, endTime] = period.split("-").map((time) => {
      const [hour, minute] = time.split(":");
      return parseInt(hour) * 60 + parseInt(minute);
    });

    return selectedCourses.some((course) => {
      return course.periods.some((p) => {
        if (p.day !== day) {
          return false;
        }

        const pStartTime =
          parseInt(p.startTime.split(":")[0]) * 60 +
          parseInt(p.startTime.split(":")[1]);
        const pEndTime =
          parseInt(p.endTime.split(":")[0]) * 60 +
          parseInt(p.endTime.split(":")[1]);

        return startTime < pEndTime && endTime > pStartTime;
      });
    });
  };

  const cellBackgroundColor = (day, period) => {
    const lessons = selectedCourses.filter((course) =>
      course.periods.some(
        (p) => p.day === day && p.startTime === period.split("-")[0]
      )
    );

    if (lessons.length === 0) {
      return "transparent";
    } else if (lessons.length === 1) {
      return "#ADD8E6";
    } else {
      return "red";
    }
  };

  return (
    <Container maxWidth="md">
      <Typography variant="h4" gutterBottom>
        Timetable for classroom {selectedClassroom}
      </Typography>
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Time</TableCell>
              {daysOfWeek.map((day, index) => (
                <TableCell key={index}>{day}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {timePeriods.map((period, index) => (
              <TableRow key={index}>
                <TableCell component="th" scope="row">
                  {period}
                </TableCell>
                {daysOfWeek.map((day, dayIndex) => {
                  const cellHasLesson = hasLesson(day, period);
                  const cellStyles = {
                    backgroundColor: cellBackgroundColor(day, period),
                  };
                  return (
                    <TableCell key={dayIndex} style={cellStyles}>
                      {selectedCourses.map((course) => {
                        const coursePeriod = course.periods.find(
                          (p) =>
                            p.day === day &&
                            p.startTime === period.split("-")[0]
                        );
                        // Display only the course code
                        return coursePeriod ? `${course.code}` : "";
                      })}
                    </TableCell>
                  );
                })}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default ClassTable;

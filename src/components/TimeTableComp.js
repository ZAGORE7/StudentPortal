import React, { useEffect, useState } from "react";

import {
  Container,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

import { useContext } from "react";
import { CourseContext } from "../components/CourseContext";

const apiKey="u8n2KZv8tMdsZTFH"
const stdid = JSON.parse(localStorage.getItem("user"));

const timeColumnStyles = {
  width: "100px",
  borderRight: "1px solid rgba(224, 224, 224, 1)",
  borderLeft: "1px solid rgba(224, 224, 224, 1)",
};

const dayColumnStyles = {
  width: "150px",
  borderRight: "1px solid rgba(224, 224, 224, 1)",
  borderLeft: "1px solid rgba(224, 224, 224, 1)",
};
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

const Timetable = ({ studentData }) => {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [courses, setCourses] = useState({})

  //get courses from api /enrolled/:api/:uid
  const getCourses = async (stdid) => {
    try {
      const response = await fetch(`http://localhost:8080/enrolled/${apiKey}/${stdid}`)
      const data = await response.json()
      setCourses(data)
    } catch (e) {
      setError(true)
    }
    setLoading(false)
  }

  useEffect(() => {
    getCourses(stdid)
  }, [])

  if (loading) {
    return (
      <div>
        Loading...
      </div>
    )
  }
  
  if (error) {
    return (
      <div>
        Error...
      </div>
    )
  }
  
  const hasLesson = (day, period) => {
    const [startTime, endTime] = period.split("-").map((time) => {
      const [hour, minute] = time.split(":");
      return parseInt(hour) * 60 + parseInt(minute);
    });

    return courses.some((course) => {
      return course.periods.some((p) => {
        if (p.day !== day) {
          return 0;
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
    const lessons = courses.filter((course) =>
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
    <div>
      <Container maxWidth="md">
        <Typography variant="h4" gutterBottom>
          Timetable
        </Typography>
        <TableContainer component={Paper}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell style={timeColumnStyles}>Time</TableCell>
                {daysOfWeek.map((day, index) => (
                  <TableCell key={index} style={dayColumnStyles}>
                    {day}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {timePeriods.map((period, index) => (
                <TableRow key={index}>
                  <TableCell
                    component="th"
                    scope="row"
                    style={timeColumnStyles}
                  >
                    {period}
                  </TableCell>
                  {daysOfWeek.map((day, dayIndex) => {
                    const cellHasLesson = hasLesson(day, period);
                    const cellStyles = {
                      ...dayColumnStyles,
                      backgroundColor: cellBackgroundColor(day, period),
                    };
                    return (
                      <TableCell key={dayIndex} style={cellStyles}>
                        {courses.map((course) => {
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
    </div>
  );
};

export default Timetable;

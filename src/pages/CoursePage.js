import React, { useState } from "react";
import {
  Container,
  Typography,
  Table,
  TableContainer,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from "@mui/material";

import NavigationBar from "../components/NavigationBar";

const apiKey="u8n2KZv8tMdsZTFH"

const mockCourses = [
  // Existing course data
];

const periodOptions = [
  { day: "Monday", startTime: "08:30", endTime: "09:20" },
  { day: "Monday", startTime: "09:30", endTime: "10:20" },
  { day: "Monday", startTime: "10:30", endTime: "11:20" },
  { day: "Monday", startTime: "11:30", endTime: "12:20" },
  { day: "Monday", startTime: "12:30", endTime: "13:20" },
  { day: "Monday", startTime: "13:30", endTime: "14:20" },
  { day: "Monday", startTime: "14:30", endTime: "15:20" },
  { day: "Monday", startTime: "15:30", endTime: "16:20" },
  { day: "Monday", startTime: "16:30", endTime: "17:20" },
  { day: "Monday", startTime: "17:30", endTime: "18:20" },

  { day: "Tuesday", startTime: "08:30", endTime: "09:20" },
  { day: "Tuesday", startTime: "09:30", endTime: "10:20" },
  { day: "Tuesday", startTime: "10:30", endTime: "11:20" },
  { day: "Tuesday", startTime: "11:30", endTime: "12:20" },
  { day: "Tuesday", startTime: "12:30", endTime: "13:20" },
  { day: "Tuesday", startTime: "13:30", endTime: "14:20" },
  { day: "Tuesday", startTime: "14:30", endTime: "15:20" },
  { day: "Tuesday", startTime: "15:30", endTime: "16:20" },
  { day: "Tuesday", startTime: "16:30", endTime: "17:20" },
  { day: "Tuesday", startTime: "17:30", endTime: "18:20" },

  { day: "Wednesday", startTime: "08:30", endTime: "09:20" },
  { day: "Wednesday", startTime: "09:30", endTime: "10:20" },
  { day: "Wednesday", startTime: "10:30", endTime: "11:20" },
  { day: "Wednesday", startTime: "11:30", endTime: "12:20" },
  { day: "Wednesday", startTime: "12:30", endTime: "13:20" },
  { day: "Wednesday", startTime: "13:30", endTime: "14:20" },
  { day: "Wednesday", startTime: "14:30", endTime: "15:20" },
  { day: "Wednesday", startTime: "15:30", endTime: "16:20" },
  { day: "Wednesday", startTime: "16:30", endTime: "17:20" },
  { day: "Wednesday", startTime: "17:30", endTime: "18:20" },

  { day: "Thursday", startTime: "08:30", endTime: "09:20" },
  { day: "Thursday", startTime: "09:30", endTime: "10:20" },
  { day: "Thursday", startTime: "10:30", endTime: "11:20" },
  { day: "Thursday", startTime: "11:30", endTime: "12:20" },
  { day: "Thursday", startTime: "12:30", endTime: "13:20" },
  { day: "Thursday", startTime: "13:30", endTime: "14:20" },
  { day: "Thursday", startTime: "14:30", endTime: "15:20" },
  { day: "Thursday", startTime: "15:30", endTime: "16:20" },
  { day: "Thursday", startTime: "16:30", endTime: "17:20" },
  { day: "Thursday", startTime: "17:30", endTime: "18:20" },

  { day: "Friday", startTime: "08:30", endTime: "09:20" },
  { day: "Friday", startTime: "09:30", endTime: "10:20" },
  { day: "Friday", startTime: "10:30", endTime: "11:20" },
  { day: "Friday", startTime: "11:30", endTime: "12:20" },
  { day: "Friday", startTime: "12:30", endTime: "13:20" },
  { day: "Friday", startTime: "13:30", endTime: "14:20" },
  { day: "Friday", startTime: "14:30", endTime: "15:20" },
  { day: "Friday", startTime: "15:30", endTime: "16:20" },
  { day: "Friday", startTime: "16:30", endTime: "17:20" },
  { day: "Friday", startTime: "17:30", endTime: "18:20" },
];

const CoursesPage = () => {
  const [courses, setCourses] = useState(mockCourses);
  const [openDialog, setOpenDialog] = useState(false);
  const [newCourse, setNewCourse] = useState({
    id: "",
    code: "",
    name: "",
    instructor: "",
    periods: [],
  });
  
  const generateId = () => {
    // Generate a unique ID (replace with your own logic)
    return Math.random().toString(36).substr(2, 9);
  };

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setNewCourse({ id: "", code: "", name: "", instructor: "", periods: [] });
  };

  const isSelectedPeriod = (period) => {
    return newCourse.periods.some(
      (p) =>
        p.day === period.day &&
        p.startTime === period.startTime &&
        p.endTime === period.endTime
    );
  };

  const handleTogglePeriod = (period) => {
    if (isSelectedPeriod(period)) {
      setNewCourse((prevCourse) => ({
        ...prevCourse,
        periods: prevCourse.periods.filter(
          (p) =>
            p.day !== period.day ||
            p.startTime !== period.startTime ||
            p.endTime !== period.endTime
        ),
      }));
    } else {
      setNewCourse((prevCourse) => ({
        ...prevCourse,
        periods: [...prevCourse.periods, period],
      }));
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    if (name === "periods") {
      const periodsInput = value.trim();
      setNewCourse((prevCourse) => ({
        ...prevCourse,
        periods: periodsInput,
      }));
    } else {
      setNewCourse((prevCourse) => ({
        ...prevCourse,
        [name]: value,
      }));
    }
  };

  const handleAddCourse = () => {
    const courseId = generateId();
    setCourses((prevCourses) => [
      ...prevCourses,
      { ...newCourse, id: courseId },
    ]);
    handleCloseDialog();
  };

  const handleRemoveCourse = (courseId) => {
    setCourses((prevCourses) =>
      prevCourses.filter((course) => course.id !== courseId)
    );
  };

  return (
    <div>
      <NavigationBar />
      <Container maxWidth="md">
        <Typography variant="h4" gutterBottom>
          Courses
        </Typography>
        <Button variant="contained" onClick={handleOpenDialog}>
          Add Course
        </Button>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Code</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Instructor</TableCell>
                <TableCell>Periods</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {courses.map((course) => (
                <TableRow key={course.id}>
                  <TableCell>{course.code}</TableCell>
                  <TableCell>{course.name}</TableCell>
                  <TableCell>{course.instructor}</TableCell>
                  <TableCell>
                    {course.periods.map((period, index) => (
                      <div key={index}>
                        {`${period.day}: ${period.startTime} - ${period.endTime}`}
                      </div>
                    ))}
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={() => handleRemoveCourse(course.id)}
                    >
                      Remove
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Add Course</DialogTitle>
        <DialogContent>
          <TextField
            label="Code"
            name="code"
            value={newCourse.code}
            onChange={handleInputChange}
          />
          <TextField
            label="Name"
            name="name"
            value={newCourse.name}
            onChange={handleInputChange}
          />
          <TextField
            label="Instructor"
            name="instructor"
            value={newCourse.instructor}
            onChange={handleInputChange}
          />
          <div>
            <Typography variant="subtitle1">Periods:</Typography>
            {periodOptions.map((period) => (
              <Button
                key={`${period.day}-${period.startTime}-${period.endTime}`}
                variant={isSelectedPeriod(period) ? "contained" : "outlined"}
                onClick={() => handleTogglePeriod(period)}
              >
                {`${period.day}: ${period.startTime} - ${period.endTime}`}
              </Button>
            ))}
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleAddCourse}>Add</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default CoursesPage;

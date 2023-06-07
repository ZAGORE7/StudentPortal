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
import NavBarAdmin from "../components/NavTabsAdmin";

const mockCourses = [
  // Existing course data
];

const CoursesPage = () => {
  const [courses, setCourses] = useState(mockCourses);
  const [openDialog, setOpenDialog] = useState(false);
  const [newCourse, setNewCourse] = useState({
    code: "",
    name: "",
    instructor: "",
    periods: "",
  });

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setNewCourse({ code: "", name: "", instructor: "", periods: "" });
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewCourse((prevCourse) => ({
      ...prevCourse,
      [name]: value,
    }));
  };

  const handleAddCourse = () => {
    setCourses((prevCourses) => [...prevCourses, newCourse]);
    handleCloseDialog();
  };

  return (
    <div>
      <NavBarAdmin />
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
              </TableRow>
            </TableHead>
            <TableBody>
              {courses.map((course, index) => (
                <TableRow key={index}>
                  <TableCell>{course.code}</TableCell>
                  <TableCell>{course.name}</TableCell>
                  <TableCell>{course.instructor}</TableCell>
                  <TableCell>{course.periods}</TableCell>
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
          <TextField
            label="Periods"
            name="periods"
            value={newCourse.periods}
            onChange={handleInputChange}
          />
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

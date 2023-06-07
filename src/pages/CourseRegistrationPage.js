import React, { useState, useContext, useEffect } from "react";
import { CourseContext } from "../components/CourseContext";
import {Delete, Add} from '@mui/icons-material';
import {
  Container,
  Grid,
  Typography,
  Card,
  CardContent,
  CardActions,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  DialogContentText,
} from "@mui/material";
import Navbar from "../components/Navbar";

const apiKey="u8n2KZv8tMdsZTFH"
const stdid = JSON.parse(localStorage.getItem("user"));

const CourseRegistrationPage = () => {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [mockCourses, setMockCourses] = useState({})

  const {selectedCourses, setSelectedCourses } = useContext(CourseContext);
  const [warningMessage, setWarningMessage] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [clashingCourse, setClashingCourse] = useState(null);
  const [courseExistsDialogOpen, setCourseExistsDialogOpen] = useState(false);
  const [maxCoursesDialogOpen, setMaxCoursesDialogOpen] = useState(false);

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setClashingCourse(null);
  };
  const isCourseClashing = (newCourse) => {
    return selectedCourses.some((selectedCourse) =>
      selectedCourse.periods.some((selectedPeriod) =>
        newCourse.periods.some(
          (newPeriod) =>
            selectedPeriod.day === newPeriod.day &&
            ((selectedPeriod.startTime <= newPeriod.startTime &&
              newPeriod.startTime < selectedPeriod.endTime) ||
              (newPeriod.startTime <= selectedPeriod.startTime &&
                selectedPeriod.startTime < newPeriod.endTime))
        )
      )
    );
  };
  const handleConfirmClashingCourse = async () => {
    setSelectedCourses([...selectedCourses, clashingCourse]);
    await fetch(`http://localhost:8080/enroll/${apiKey}/${stdid}/${clashingCourse.id}`)
    setDialogOpen(false);
    setClashingCourse(null);
  };
  const isCourseAlreadySelected = (course) => {
    return selectedCourses.some(
      (selectedCourse) => selectedCourse.id === course.id
    );
  };

  const addCourse = async (course) => {
    if (isCourseAlreadySelected(course)) {
      setCourseExistsDialogOpen(true);
      return;
    }
    if (selectedCourses.length >= 5) {
      setMaxCoursesDialogOpen(true);
      return;
    }

    if (isCourseClashing(course)) {
      setClashingCourse(course);
      setDialogOpen(true);
    } else {
      setSelectedCourses([...selectedCourses, course]);
      await fetch(`http://localhost:8080/enroll/${apiKey}/${stdid}/${course.id}`)
    }
  };
  const removeCourse = async (courseId) => {
    setSelectedCourses(
      selectedCourses.filter((course) => course.id !== courseId)
    );
    await fetch(`http://localhost:8080/unenroll/${apiKey}/${stdid}/${courseId}`)
  };

    // get selected courses from '/enrolled/:api/:uid'
    const getSelectedCourses = async () => {
      try {
        const response = await fetch(`http://localhost:8080/enrolled/${apiKey}/${stdid}`)
        const data = await response.json()
        console.log(data)
        setSelectedCourses(data)
      } catch (e) {
        setError(true)
      }
      setLoading(false)
    }

  const getCourses = async () => {
    try {
      const response = await fetch(`http://localhost:8080/courses/${apiKey}`)
      const data = await response.json()
      setMockCourses(data)
    } catch (e) {
      setError(true)
    }
    setLoading(false)
  }

  useEffect(() => {
    getCourses()
    getSelectedCourses()
  }, [])
  
  if (loading) {
    return (
      <div>
        <Navbar />
        Loading...
      </div>
    )
  }
  
  if (error) {
    return (
      <div>
        <Navbar />
        Error...
      </div>
    )
  }
        
  return (
    <div>
      <Navbar />
      <Container maxWidth="md">
        <Typography variant="h4" gutterBottom textAlign={"center"}>
          Avaliable Courses
        </Typography>
        <Grid container spacing={2}>
          {mockCourses.map((course) => (
            <Grid item xs={12} sm={6} md={4} key={course.id}>
              <Card
                sx={{
                  minWidth: 275,
                  marginBottom: 2,
                }}
              >
                <CardContent>
                  <Typography variant="h5" component="h2">
                    {course.code}
                  </Typography>
                  <Typography variant="h5" component="h2">
                    {course.name}
                  </Typography>
                  <Typography variant="h5" component="h2">
                    {course.instructor}
                  </Typography>
                  {course.periods.map((period, index) => (
                    <Typography
                      key={index}
                      variant="body2"
                      color="textSecondary"
                      gutterBottom
                    >
                      {`${period.day}, ${period.startTime}-${period.endTime}`}
                    </Typography>
                  ))}
                </CardContent>
                <CardActions>
                    <Button
                      startIcon={<Add />}
                      color="primary"
                      variant="outlined"
                      onClick={() => addCourse(course)}
                    >
                      Add
                    </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
        <Typography
          align={"center"}
          variant="h5"
          gutterBottom
          style={{ marginTop: "20px" }}
        >
          Courses Selected
        </Typography>
        <TableContainer component={Paper} sx={{ m: 4 }}>
          <Dialog
            open={maxCoursesDialogOpen}
            onClose={() => setMaxCoursesDialogOpen(false)}
            aria-labelledby="max-courses-dialog-title"
            aria-describedby="max-courses-dialog-description"
          >
            <DialogTitle id="max-courses-dialog-title">Warning</DialogTitle>
            <DialogContent>
              <DialogContentText id="max-courses-dialog-description">
                You can select a maximum of 5 courses.
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button
                onClick={() => setMaxCoursesDialogOpen(false)}
                color="primary"
              >
                Ok
              </Button>
            </DialogActions>
          </Dialog>

          <Dialog
            open={courseExistsDialogOpen}
            onClose={() => setCourseExistsDialogOpen(false)}
            aria-labelledby="course-exists-dialog-title"
            aria-describedby="course-exists-dialog-description"
          >
            <DialogTitle id="course-exists-dialog-title">Warning</DialogTitle>
            <DialogContent>
              <DialogContentText id="course-exists-dialog-description">
                You have already added this course.
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button
                onClick={() => setCourseExistsDialogOpen(false)}
                color="primary"
              >
                Ok
              </Button>
            </DialogActions>
          </Dialog>
          <Dialog
            open={dialogOpen}
            onClose={handleCloseDialog}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">
              <Typography variant="h6" color="error">
                Warning
              </Typography>
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                {`The course ${clashingCourse?.name} has clashing hours. Do you still want to take it?`}
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseDialog} color="error">
                Cancel
              </Button>
              <Button
                onClick={handleConfirmClashingCourse}
                color="primary"
                autoFocus
              >
                Confirm
              </Button>
            </DialogActions>
          </Dialog>

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
                      startIcon={<Delete />}
                      color="error"
                      variant="outlined"
                      onClick={() => removeCourse(course.id)}
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
    </div>
  );
}

export default CourseRegistrationPage;

import React, { useState, useContext } from "react";
import { CourseContext } from "../components/CourseContext";
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

const mockCourses = [
  {
    id: 1,
    code: "CMPE101",
    name: "Logic Design",
    instructor: "John Doe",
    periods: [
      { day: "Monday", startTime: "08:30", endTime: "09:20" },
      { day: "Monday", startTime: "09:30", endTime: "10:20" },
      { day: "Wednesday", startTime: "08:30", endTime: "09:20" },
      { day: "Wednesday", startTime: "09:30", endTime: "10:20" },
      { day: "Friday", startTime: "08:30", endTime: "09:20" },
      { day: "Friday", startTime: "09:30", endTime: "10:20" },
    ],
  },
  {
    id: 2,
    code: "CMPE312",
    name: "Software eng",
    instructor: "Bodur",
    periods: [
      { day: "Monday", startTime: "10:30", endTime: "11:20" },
      { day: "Monday", startTime: "11:30", endTime: "12:20" },
      { day: "Tuesday", startTime: "10:30", endTime: "11:20" },
      { day: "Tuesday", startTime: "11:30", endTime: "12:20" },
      { day: "Friday", startTime: "10:30", endTime: "11:20" },
      { day: "Friday", startTime: "11:30", endTime: "12:20" },
    ],
  },
  {
    id: 3,
    code: "CMPE115",
    name: "Netwrok",
    instructor: "Arifler",
    periods: [
      { day: "Tuesday", startTime: "14:30", endTime: "15:20" },
      { day: "Tuesday", startTime: "15:30", endTime: "16:20" },
      { day: "Thursday", startTime: "14:30", endTime: "15:20" },
      { day: "Thursday", startTime: "15:30", endTime: "16:20" },
      { day: "Friday", startTime: "14:30", endTime: "15:20" },
      { day: "Friday", startTime: "15:30", endTime: "16:20" },
    ],
  },
  {
    id: 4,
    code: "CMPE301",
    name: "Highend Embeded",
    instructor: "John Doe",
    periods: [
      { day: "Tuesday", startTime: "16:30", endTime: "17:20" },
      { day: "Tuesday", startTime: "17:30", endTime: "18:20" },
      { day: "Thursday", startTime: "16:30", endTime: "17:20" },
      { day: "Thursday", startTime: "17:30", endTime: "18:20" },
      { day: "Friday", startTime: "16:30", endTime: "17:20" },
      { day: "Friday", startTime: "17:30", endTime: "18:20" },
    ],
  },
  {
    id: 5,
    code: "CMPE342",
    name: "Client/Server Prog",
    instructor: "John Doe",
    periods: [
      { day: "Tuesday", startTime: "16:30", endTime: "17:20" },
      { day: "Tuesday", startTime: "17:30", endTime: "18:20" },
      { day: "Wednesday", startTime: "08:30", endTime: "09:20" },
      { day: "Wednesday", startTime: "09:30", endTime: "10:20" },
      { day: "Friday", startTime: "12:30", endTime: "13:20" },
      { day: "Friday", startTime: "13:30", endTime: "14:20" },
    ],
  },
  {
    id: 6,
    code: "CMPE344",
    name: "Computer Networks",
    instructor: "John Doe",
    periods: [
      { day: "Monday", startTime: "16:30", endTime: "17:20" },
      { day: "Monday", startTime: "17:30", endTime: "18:20" },
      { day: "Thursday", startTime: "10:30", endTime: "11:20" },
      { day: "Thursday", startTime: "11:30", endTime: "12:20" },
      { day: "Friday", startTime: "18:30", endTime: "19:20" },
      { day: "Friday", startTime: "19:30", endTime: "20:20" },
    ],
  },
  {
    id: 7,
    code: "SCIE223",
    name: "Patterns of Drug Use",
    instructor: "John Doe",
    periods: [
      { day: "Tuesday", startTime: "08:30", endTime: "09:20" },
      { day: "Tuesday", startTime: "09:30", endTime: "10:20" },
      { day: "Thursday", startTime: "14:30", endTime: "15:20" },
      { day: "Thursday", startTime: "15:30", endTime: "16:20" },
      { day: "Friday", startTime: "12:30", endTime: "13:20" },
      { day: "Friday", startTime: "13:30", endTime: "14:20" },
    ],
  },
];

function CourseRegistrationPage() {
  const { selectedCourses, setSelectedCourses } = useContext(CourseContext);
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
  const handleConfirmClashingCourse = () => {
    setSelectedCourses([...selectedCourses, clashingCourse]);
    setDialogOpen(false);
    setClashingCourse(null);
  };
  const isCourseAlreadySelected = (course) => {
    return selectedCourses.some(
      (selectedCourse) => selectedCourse.id === course.id
    );
  };

  const addCourse = (course) => {
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
    }
  };
  const removeCourse = (courseId) => {
    setSelectedCourses(
      selectedCourses.filter((course) => course.id !== courseId)
    );
  };

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
                    size="small"
                    color="primary"
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
        </TableContainer>
      </Container>
    </div>
  );
}

export default CourseRegistrationPage;

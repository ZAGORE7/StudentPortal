import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import React, { useState, useContext, useMemo, useEffect } from "react";



const apiKey="u8n2KZv8tMdsZTFH"
const target_user = JSON.parse(localStorage.getItem("target_user"));

const StudentCourseTable = () => {

  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [studentCourses, setStudentCourses] = useState({})

  // Get studentcourses from /enrolled/:api/:uid api
  const getStudentCourses = async (id) => {
    try {
      const response = await fetch(`http://localhost:8080/enrolled/${apiKey}/${id}`)
      const data = await response.json()
      setStudentCourses(data)
    } catch (e) {
      setError(true)
    }
    setLoading(false)
  }
    

  useEffect(() => {
    getStudentCourses(target_user)
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


  // confirm course with /enroll/:api/:id/:status 
  const confirmCourse = async (id) => {
    try {
      const response = await fetch(`http://localhost:8080/enrollstat/${apiKey}/${id}/confirmed`)
    } catch (e) {
      setError(true)
    }
    setLoading(false)
  }

  const removeCourse = async (id) => {
    try {
      const response = await fetch(`http://localhost:8080/unenroll/${apiKey}/${target_user}/${id}`)
    } catch (e) {
      setError(true)
    }
    setLoading(false)
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
            <TableCell>{course.code}</TableCell>
            <TableCell>{course.status}</TableCell>
            <TableCell>
              {course.status === "pending" && (
                <Button
                  size="small"
                  color="primary"
                  onClick={() => confirmCourse(course.endorllmentId)}
                >
                  Confirm
                </Button>
              )}
              <Button
                size="small"
                color="secondary"
                onClick={() => removeCourse(course.endorllmentId)}
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

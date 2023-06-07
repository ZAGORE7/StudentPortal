import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { Grid, Typography, Box, Paper } from "@mui/material";

const apiKey="u8n2KZv8tMdsZTFH"

// get user from local storage
const id = JSON.parse(localStorage.getItem("user"));

const StudentPage = () => {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [student, setStudent] = useState({})
  
  const getUser = async (id) => {
    try {
      const response = await fetch(`http://localhost:8080/user/${apiKey}/${id}`)
      const data = await response.json()
      setStudent(data)
    } catch (e) {
      setError(true)
    }
    setLoading(false)
  }
  
  useEffect(() => {
    getUser(id)
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
      <Grid item xs={12} md={6}>
        <Box component={Paper} p={2}>
          <Typography variant="h6">Personal Information</Typography>
          <Typography>Name: {student.name}</Typography>
          <Typography>Advisor: {student.name}</Typography>
          <Typography>Advisor Mail: {student.name}</Typography>

        </Box>
      </Grid>
    </div>
  );
};

export default StudentPage;

import React from "react";
import Navbar from "../components/Navbar";
import { Grid, Typography, Box, Paper } from "@mui/material";

const StudentPage = () => {
  const student = {
    name: "John Doe",
    advisor: "Dr. Smith",
    advisorEmail: "dr.smith@example.com",
  };
  return (
    <div>
      <Navbar />
      <Grid item xs={12} md={6}>
        <Box component={Paper} p={2}>
          <Typography variant="h6">Personal Information</Typography>
          <Typography>Name: {student.name}</Typography>
          <Typography>Advisor: {student.advisor}</Typography>
          <Typography>Advisor Email: {student.advisorEmail}</Typography>
        </Box>
      </Grid>
    </div>
  );
};

export default StudentPage;

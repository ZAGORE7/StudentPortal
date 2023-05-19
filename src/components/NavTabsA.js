import * as React from "react";
import Box from "@mui/material/Box";
import { Link } from "react-router-dom";

const NavTabsA = ({ currentLocation }) => {
  const linkStyles = (to) => ({
    textDecoration: "none",
    color: "inherit",
    transition: "background-color 0.3s",
    padding: "16px",
    backgroundColor: to === currentLocation ? "#0077b3" : "#f0f0f0",
    borderRadius: "4px",
    marginRight: "8px",
    cursor: "pointer",
    "&:hover": {
      backgroundColor: "#e0e0e0",
    },
  });

  return (
    <Box sx={{ width: "100%" }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Link to="/advisor/students" style={linkStyles("/advisor/students")}>
          Students
        </Link>
        <Link
          to="/advisor/classroom-timetable"
          style={linkStyles("/advisor/classrom-timetable")}
        >
          Classroom Timetable
        </Link>
        <Link to="/advisor/profile" style={linkStyles("/advisor/profile")}>
          Profile Page
        </Link>
      </Box>
    </Box>
  );
};

export default NavTabsA;

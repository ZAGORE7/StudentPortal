import * as React from "react";
import Box from "@mui/material/Box";
import { Link } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";

const NavTabs = ({ currentLocation }) => {
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
        <Link to="/student" style={{ display: "flex", alignItems: "center" }}>
          <HomeIcon
            style={{
              color: "white",
              fontSize: 40,
              justifyContent: "flex-start",
            }}
          />
        </Link>
        <Link
          to="/student/course-registration"
          style={linkStyles("/student/course-registration")}
        >
          Course Registration
        </Link>
        <Link to="/student/timetable" style={linkStyles("/student/timetable")}>
          Timetable
        </Link>
        <Link to="/student/profile" style={linkStyles("/student/profile")}>
          Academic Record Page
        </Link>
        <Link to="/" style={linkStyles("/")}>
          Logout
        </Link>
      </Box>
    </Box>
  );
};

export default NavTabs;

import * as React from "react";
import Box from "@mui/material/Box";
import { Link } from "react-router-dom";

const NavigationBarTabs = ({ currentLocation }) => {
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
        <Link to="/admin/assign" style={linkStyles("/admin/assign")}>
          Assign Advisor
        </Link>
        <Link to="/admin/courses" style={linkStyles("/admin/courses")}>
          Courses
        </Link>
      </Box>
    </Box>
  );
};

export default NavigationBarTabs;

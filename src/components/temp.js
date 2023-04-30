import React from "react";
import { useNavigate } from "react-router-dom";
import { Container, Tab, Tabs } from "@mui/material";

const Navbar = () => {
  const navigate = useNavigate();

  const handleTabClick = (to) => {
    navigate(to);
  };

  return (
    <div style={styles.navbarContainer}>
      <Container maxWidth="sm">
        <Tabs
          variant="fullWidth"
          TabIndicatorProps={{ style: { display: "none" } }}
          style={styles.tabs}
        >
          <Tab
            label="Course Registration"
            onClick={() => handleTabClick("/student/course-registration")}
            style={styles.tab}
          />
          <Tab
            label="Timetable"
            onClick={() => handleTabClick("/student/timetable")}
            style={styles.tab}
          />
          <Tab
            label="Academic Record"
            onClick={() => handleTabClick("/student/academic-record")}
            style={styles.tab}
          />
        </Tabs>
      </Container>
    </div>
  );
};

const styles = {
  navbarContainer: {
    backgroundColor: "#2196f3",
    borderRadius: "4px",
    padding: "16px",
    display: "flex",
    alignItems: "center",
  },
  tabs: {
    flexGrow: 1,
    justifyContent: "space-between", // Spread tabs evenly
  },
  tab: {
    color: "#fff",
  },
};

export default Navbar;

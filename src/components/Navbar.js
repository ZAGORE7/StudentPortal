import React from "react";
import { useNavigate } from "react-router-dom";
import { Container, Tab, Tabs } from "@mui/material";
import NavTabs from "./Tabs";

const Navbar = () => {
  const navigate = useNavigate();

  const handleTabClick = (to) => {
    navigate(to);
  };

  return (
    <div style={styles.navbarContainer}>
      <Container maxWidth="sm">
        <NavTabs />
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

import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Container } from "@mui/material";
import NavigationBarTabs from "./NavigationBarTabs";

const NavgationBar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleTabClick = (to) => {
    navigate(to);
  };

  return (
    <div style={styles.navbarContainer}>
      <Container maxWidth="sm">
        <NavigationBarTabs currentLocation={location.pathname} />
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

export default NavgationBar;

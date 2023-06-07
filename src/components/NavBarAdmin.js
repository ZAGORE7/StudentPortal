import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Container } from "@mui/material";
import NavTabsAdmin from "./NavTabsAdmin";

const NavBarAdmin = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleTabClick = (to) => {
    navigate(to);
  };

  return (
    <div sx={styles.navbarContainer}>
      <Container maxWidth="sm">
        <NavTabsAdmin currentLocation={location.pathname} />
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
};

export default NavBarAdmin;

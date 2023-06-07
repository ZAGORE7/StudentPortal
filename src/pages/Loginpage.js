import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Container,
  TextField,
  Button,
  Snackbar,
  Alert,
} from "@mui/material";
import { useContext } from "react";
import { UserContext } from "../components/UseContext";

const LoginApi = "http://localhost:8080/login"

const LoginPage = () => {
  const { setCurrentUser } = useContext(UserContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [open, setOpen] = useState(false);

  const navigate = useNavigate();

  
  async function loginevent(emal, passwrd) {
    const response = await fetch(LoginApi, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({email: emal, password: passwrd})
    })
    const data = await response.json()
    console.log(data.role)
    return data
  }


  const handleSubmit = async (event) => {
    event.preventDefault();

    const user = await loginevent(email, password)
    
    if (user) {
      setCurrentUser(user);
      if (user.role === "student") {
        navigate("/student");
      } else if (user.role === "advisor") {
        navigate("/advisor");
      } else if (user.role === "admin") {
        navigate("/admin/courses");
      }
      // save user to local storage
      localStorage.setItem("user", JSON.stringify(user.id));
    } else {
      setError("Invalid email or password");
      setOpen(true);
    }
  };
  
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div style={styles.root}>
      <Container style={styles.container} maxWidth="xs" alignItems="center">
        <Box sx={{ m: 2 }}>
          <img
            src="https://cdn.onlinewebfonts.com/svg/img_241918.png"
            alt="Login Logo"
            style={styles.loginLogo}
          />
        </Box>
        <form style={styles.form} onSubmit={handleSubmit}>
          <TextField
            label="Email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            label="Password"
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            style={styles.button}
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
          >
            Login
          </Button>
        </form>
        <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
          <Alert severity="error" onClose={handleClose}>
            {error}
          </Alert>
        </Snackbar>
      </Container>
    </div>
  );
};

const styles = {
  root: {
    height: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f8f8f8",
    backgroundImage:
      "url('https://www.emu.edu.tr/media/gallery_media/media_814_3.jpg')",
    backgroundSize: "cover",
  },
  container: {
    backgroundColor: "#fff",
    padding: "2rem",
    borderRadius: "0.5rem",
    boxShadow: "0 0.25rem 0.5rem rgba(0, 0, 0, 0.1)",
    textAlign: "center",
  },
  loginLogo: {
    width: "6rem",
    height: "6rem",
    margin: "0 auto 1.5rem",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
  },
  button: {
    marginTop: "1rem",
  },
};

export default LoginPage;

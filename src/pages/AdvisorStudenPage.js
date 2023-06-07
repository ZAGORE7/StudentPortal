import React, { useState, useContext, useMemo, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  Link,
  Grid,
  Box,
} from "@mui/material";
import advisorData from "../components/advisorData";
import NavBarA from "../components/NavbarA";
import { styled } from "@mui/system";
import { UserContext } from "../components/UseContext";
import { useNavigate } from "react-router-dom";

const apiKey="u8n2KZv8tMdsZTFH"

const AdvisorStudentsPage = () => {

  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [studentData, setstudentData] = useState({})

  const getStudents = async () => {
    try {
      const response = await fetch(`http://localhost:8080/students/${apiKey}`)
      const data = await response.json()
      setstudentData(data)
    } catch (e) {
      setError(true)
    }
    setLoading(false)
  }

  useEffect(() => {
    getStudents()
  }, [])

  const advisorId = 1; // Replace with the correct advisorId
  const { currentUser, setCurrentUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleStudentClick = (id) => {
    setCurrentUser({ ...currentUser, id: id });
    localStorage.setItem("target_user", JSON.stringify(id));
    navigate(`/student/${id}`);
  };
  const advisor = advisorData.find(
    (advisor) => advisor.advisorId === advisorId
  );
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (event) => {
    setSearchTerm(String(event.target.value));
  };

  const StyledTableContainer = styled(TableContainer)({
    margin: "20px",
    border: "1px solid #ddd",
  });

  const StyledTableCell = styled(TableCell)({
    padding: "15px",
    textAlign: "center",
    border: "1px solid #ddd",
    color: "darkblue",
    fontWeight: "bold",
  });

  if (loading) {
    return (
      <div>
        Loading...
      </div>
    )
  }
  
  if (error) {
    return (
      <div>
        Error...
      </div>
    )
  }


  return (
    <div>
      <NavBarA />
      <Box>
        <Box
          sx={{
            width: "90%",
            margin: "auto",
            marginTop: 2,
            border: "1px solid rgba(224, 224, 224, 1)",
            borderRadius: 1,
          }}
        >
          <Grid container>
            <Grid item xs={12}>
              <TextField
                label="Search"
                variant="outlined"
                value={searchTerm}
                onChange={handleSearchChange}
                sx={{ margin: 1 }}
              />
            </Grid>
          </Grid>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Student ID</TableCell>
                  <TableCell>Full Name</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Department</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {studentData.map((student) => (
                  <TableRow key={student.id}>
                    <TableCell>{student.id}</TableCell>
                    <TableCell>
                      <Link
                        href={`/student/${student.id}`}
                        onClick={(event) => {
                          event.preventDefault();
                          handleStudentClick(student.id);
                        }}
                      >
                        {student.name}
                      </Link>
                    </TableCell>
                    <TableCell>{student.email}</TableCell>
                    <TableCell>{student.department}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Box>
    </div>
  );
};

export default AdvisorStudentsPage;

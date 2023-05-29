import React, { useState, useMemo } from "react";
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
import SearchBar from "../components/SearchBar";
const studentData = [
  {
    studentId: 1,
    studentName: "John",
    studentSurname: "Doe",
    department: "Computer Science",
    email: "john.doe@example.com",
  },
  {
    studentId: 2,
    studentName: "Berke",
    studentSurname: "Çelik",
    department: "Computer Science",
    email: "berke@example.com",
  },
  {
    studentId: 3,
    studentName: "Fatih",
    studentSurname: "Altaylı",
    department: "Computer Science",
    email: "Fato@example.com",
  },

  //... other students
];

const AdvisorStudentsPage = () => {
  const advisorId = 1; // Replace with the correct advisorId
  const advisor = advisorData.find(
    (advisor) => advisor.advisorId === advisorId
  );
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (event) => {
    setSearchTerm(String(event.target.value));
  };

  const filteredStudents = useMemo(
    () =>
      studentData.filter((student) =>
        `${student.studentName} ${student.studentSurname}`
          .toLowerCase()
          .includes(searchTerm.toLowerCase())
      ),
    [searchTerm, studentData]
  );

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
                {filteredStudents.map((student) => (
                  <TableRow key={student.studentId}>
                    <TableCell>{student.studentId}</TableCell>
                    <TableCell>
                      <Link href={`/student/${student.studentId}`}>
                        {student.studentName} {student.studentSurname}
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

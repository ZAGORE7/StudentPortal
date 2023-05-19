import React, { useState } from "react";
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
} from "@mui/material";
import advisorData from "../components/advisorData";
import NavBarA from "../components/NavbarA";

const AdvisorStudentsPage = () => {
  const advisorId = 1; // Replace with the correct advisorId
  const advisor = advisorData.find(
    (advisor) => advisor.advisorId === advisorId
  );
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredStudents = advisor.students.filter((student) =>
    `${student.studentName} ${student.studentSurname}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <NavBarA />
      <TextField
        label="Search"
        variant="outlined"
        value={searchTerm}
        onChange={handleSearchChange}
      />
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Student ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Surname</TableCell>
              <TableCell>Department</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredStudents.map((student) => (
              <TableRow key={student.studentId}>
                <TableCell>{student.studentId}</TableCell>
                <TableCell>
                  <Link href={`/student/${student.studentId}`}>
                    {student.studentName}
                  </Link>
                </TableCell>
                <TableCell>{student.studentSurname}</TableCell>
                <TableCell>{student.department}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default AdvisorStudentsPage;

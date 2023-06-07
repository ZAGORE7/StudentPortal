import React, { useState } from "react";
import {
  Container,
  Typography,
  Table,
  TableContainer,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Select,
  MenuItem,
} from "@mui/material";
import NavBarAdmin from "../components/NavTabsAdmin";
import NavBarA from "../components/NavbarA";

const studentData = [
  { id: 1, name: "John Doe", advisor: "Advisor A" },
  { id: 2, name: "Jane Smith", advisor: "Advisor B" },
  { id: 3, name: "Mike Johnson", advisor: "Advisor C" },
  // Add more students as needed
];

const advisorOptions = ["Advisor A", "Advisor B", "Advisor C", "Advisor D"];

const AssignAdvisor = () => {
  const [students, setStudents] = useState(studentData);

  const handleChangeAdvisor = (studentId, advisor) => {
    setStudents((prevStudents) =>
      prevStudents.map((student) =>
        student.id === studentId ? { ...student, advisor } : student
      )
    );
  };

  return (
    <div>
      <NavBarAdmin />
      <Container maxWidth="md">
        <Typography variant="h4" gutterBottom>
          Assign Advisor
        </Typography>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Student</TableCell>
                <TableCell>Advisor</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {students.map((student) => (
                <TableRow key={student.id}>
                  <TableCell>{student.name}</TableCell>
                  <TableCell>
                    <Select
                      value={student.advisor}
                      onChange={(e) =>
                        handleChangeAdvisor(student.id, e.target.value)
                      }
                    >
                      {advisorOptions.map((advisor) => (
                        <MenuItem key={advisor} value={advisor}>
                          {advisor}
                        </MenuItem>
                      ))}
                    </Select>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </div>
  );
};

export default AssignAdvisor;

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

import NavgationBar from "../components/NavigationBar";

const studentData = [
  { id: 1, name: "Berke Çelik", advisor: "Jhon Doe" },
  { id: 2, name: "Buse Alasköz", advisor: "Doğu Arifler" },
  { id: 3, name: "Mike Tyson", advisor: "Hakan Altınçay" },
  // Add more students as needed
];

const advisorOptions = ["Doğu Arifler", "Hakan Altınçay", "Jhon Doe", "Bodur"];

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
      <NavgationBar />
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

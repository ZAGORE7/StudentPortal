import React, { useState } from "react";
import ClassTable from "../components/ClassTable";
import NavBarA from "../components/NavbarA";

const ClassroomTimetable = () => {
  const [selectedClassroom, setSelectedClassroom] = useState("");

  const handleChange = (event) => {
    setSelectedClassroom(event.target.value);
  };
  const mockCourses = [
    {
      id: 1,
      code: "CMPE101",
      name: "Logic Design",
      instructor: "Mohammed Salamah",
      classroom: "Classroom A",
      periods: [
        { day: "Monday", startTime: "08:30", endTime: "09:20" },
        { day: "Monday", startTime: "09:30", endTime: "10:20" },
        { day: "Wednesday", startTime: "08:30", endTime: "09:20" },
        { day: "Wednesday", startTime: "09:30", endTime: "10:20" },
        { day: "Friday", startTime: "08:30", endTime: "09:20" },
        { day: "Friday", startTime: "09:30", endTime: "10:20" },
      ],
    },
    {
      id: 1,
      code: "CMPE321",
      name: "31Dersi",
      instructor: "Mohammed Salamah",
      classroom: "Classroom A",
      periods: [
        { day: "Monday", startTime: "10:30", endTime: "11:20" },
        { day: "Monday", startTime: "11:30", endTime: "12:20" },
        { day: "Wednesday", startTime: "12:30", endTime: "13:20" },
        { day: "Wednesday", startTime: "13:30", endTime: "14:20" },
        { day: "Friday", startTime: "14:30", endTime: "15:20" },
        { day: "Friday", startTime: "15:30", endTime: "16:20" },
      ],
    },
    {
      id: 2,
      code: "CMPE312",
      name: "Software Engineering",
      instructor: "Felix Babalola",
      classroom: "Classroom B",
      periods: [
        { day: "Monday", startTime: "10:30", endTime: "11:20" },
        { day: "Monday", startTime: "11:30", endTime: "12:20" },
        { day: "Tuesday", startTime: "10:30", endTime: "11:20" },
        { day: "Tuesday", startTime: "11:30", endTime: "12:20" },
        { day: "Friday", startTime: "10:30", endTime: "11:20" },
        { day: "Friday", startTime: "11:30", endTime: "12:20" },
      ],
    },
    {
      id: 3,
      code: "CMPE344",
      name: "Computer Networks",
      instructor: "Doğu Arifler",
      classroom: "Classroom C",
      periods: [
        { day: "Tuesday", startTime: "14:30", endTime: "15:20" },
        { day: "Tuesday", startTime: "15:30", endTime: "16:20" },
        { day: "Thursday", startTime: "14:30", endTime: "15:20" },
        { day: "Thursday", startTime: "15:30", endTime: "16:20" },
        { day: "Friday", startTime: "14:30", endTime: "15:20" },
        { day: "Friday", startTime: "15:30", endTime: "16:20" },
      ],
    },
    {
      id: 4,
      code: "CMPE301",
      name: "Highend Embeded Systems",
      instructor: "Mohammed Salamah",
      classroom: "Classroom D",
      periods: [
        { day: "Tuesday", startTime: "16:30", endTime: "17:20" },
        { day: "Tuesday", startTime: "17:30", endTime: "18:20" },
        { day: "Thursday", startTime: "16:30", endTime: "17:20" },
        { day: "Thursday", startTime: "17:30", endTime: "18:20" },
        { day: "Friday", startTime: "16:30", endTime: "17:20" },
        { day: "Friday", startTime: "17:30", endTime: "18:20" },
      ],
    },
    {
      id: 5,
      code: "CMPE342",
      name: "Client/Server Programming",
      instructor: "Yıltan Bitirim",
      classroom: "Classroom E",
      periods: [
        { day: "Tuesday", startTime: "16:30", endTime: "17:20" },
        { day: "Tuesday", startTime: "17:30", endTime: "18:20" },
        { day: "Wednesday", startTime: "08:30", endTime: "09:20" },
        { day: "Wednesday", startTime: "09:30", endTime: "10:20" },
        { day: "Friday", startTime: "12:30", endTime: "13:20" },
        { day: "Friday", startTime: "13:30", endTime: "14:20" },
      ],
    },
    {
      id: 6,
      code: "CMPE231",
      name: "Object Oriented Programming",
      instructor: "Hakan Altınçay",
      classroom: "Classroom F",
      periods: [
        { day: "Monday", startTime: "16:30", endTime: "17:20" },
        { day: "Monday", startTime: "17:30", endTime: "18:20" },
        { day: "Thursday", startTime: "10:30", endTime: "11:20" },
        { day: "Thursday", startTime: "11:30", endTime: "12:20" },
        { day: "Friday", startTime: "18:30", endTime: "19:20" },
        { day: "Friday", startTime: "19:30", endTime: "20:20" },
      ],
    },
    {
      id: 7,
      code: "SCIE223",
      name: "Patterns of Drug Use",
      instructor: "Duygu Uzun",
      classroom: "Classroom G",
      periods: [
        { day: "Tuesday", startTime: "08:30", endTime: "09:20" },
        { day: "Tuesday", startTime: "09:30", endTime: "10:20" },
        { day: "Thursday", startTime: "14:30", endTime: "15:20" },
        { day: "Thursday", startTime: "15:30", endTime: "16:20" },
        { day: "Friday", startTime: "12:30", endTime: "13:20" },
        { day: "Friday", startTime: "13:30", endTime: "14:20" },
      ],
    },
  ];

  const selectedCourses = mockCourses.filter(
    (course) => course.classroom === selectedClassroom
  );

  return (
    <div>
      <NavBarA />
      <select value={selectedClassroom} onChange={handleChange}>
        <option value="">Select a classroom</option>
        <option value="Classroom A">Classroom A</option>
        <option value="Classroom B">Classroom B</option>
        <option value="Classroom C">Classroom C</option>
        {/* Add more options for additional classrooms */}
      </select>
      <ClassTable selectedClassroom={selectedClassroom} courses={mockCourses} />
    </div>
  );
};

export default ClassroomTimetable;

import { createContext, useState } from "react";

export const CourseContext = createContext();

export const CourseProvider = ({ children }) => {
  const [selectedCourses, setSelectedCourses] = useState([]);

  return (
    <CourseContext.Provider value={{ selectedCourses, setSelectedCourses }}>
      {children}
    </CourseContext.Provider>
  );
};

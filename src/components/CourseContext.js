import { createContext, useState } from "react";

const CourseContext = createContext();

export const CourseProvider = ({ children }) => {
  const [selectedCourses, setSelectedCourses] = useState([]);

  return (
    <CourseContext.Provider value={{ selectedCourses, setSelectedCourses }}>
      {children}
    </CourseContext.Provider>
  );
};

export default CourseContext;

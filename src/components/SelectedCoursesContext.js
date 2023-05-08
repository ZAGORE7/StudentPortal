import React from "react";

const SelectedCoursesContext = React.createContext();

export const SelectedCoursesProvider = SelectedCoursesContext.Provider;
export const SelectedCoursesConsumer = SelectedCoursesContext.Consumer;

export default SelectedCoursesContext;

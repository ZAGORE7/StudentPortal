import React from "react";
import "./App.css";
import MainRoutes from "./Routes/Mainroutes";
import { BrowserRouter as Router } from "react-router-dom";
import { CourseProvider } from "./components/CourseContext";

function App() {
  return (
    <Router>
      <div className="App">
        <CourseProvider>
          <MainRoutes />
        </CourseProvider>
      </div>
    </Router>
  );
}

export default App;

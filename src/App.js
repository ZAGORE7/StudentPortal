import React from "react";
import "./App.css";
import MainRoutes from "./Routes/Mainroutes";
import { BrowserRouter as Router } from "react-router-dom";
import { CourseProvider } from "./components/CourseContext";
import { UserProvider } from "./components/UseContext";

function App() {
  return (
    <Router>
      <div className="App">
        <UserProvider>
          <CourseProvider>
            <MainRoutes />
          </CourseProvider>
        </UserProvider>
      </div>
    </Router>
  );
}

export default App;

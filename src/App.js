import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  RouterProvider,
} from "react-router-dom";
import { CourseProvider } from "./components/CourseContext";
import router from "./Routes/Mainroutes";

function App() {
  return (
    <CourseProvider>
      <RouterProvider router={router} />
    </CourseProvider>
  );
}

export default App;

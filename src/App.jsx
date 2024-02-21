import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage/LoginPage";
import StudentList from "./pages/studentList";
import ClassList from "./pages/classList";
import "./App.css";
import MainPage from "./pages/MainPage/MainPage";
import ScoreManagement from "./pages/ScoreManagement/ScoreManagement"
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/login-register" element={<LoginPage />} />
          <Route path="/student-list" element={<StudentList />} />
          <Route path="/score-management" element={<ScoreManagement />} />
          <Route path="/reserve-list" />
          <Route path="/view-syllabus" />
          <Route path="/create-syllabus" />
          <Route path="/view-problem" />
          <Route path="/create-problem" />
          <Route path="/view-class" element={<ClassList />}/>
          <Route path="/create-class" />
          <Route path="/training-calender" />
          <Route path="/user-list" />
          <Route path="/user-permission" />
          <Route path="/learning materials" />
          <Route path="/Calendar" />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

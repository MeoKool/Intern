import { BrowserRouter, Routes, Route, Router } from "react-router-dom";
import LoginPage from "./pages/LoginPage/LoginPage";
import StudentList from "./pages/studentList";
import ClassList from "./pages/classList";
import "./App.css";
import MainPage from "./pages/MainPage/MainPage";
import StudentDetails from "./components/student-details/StudentDetails";
import StudentDetailsCommon from "./components/student-details/StudentDetailsCommon";
import StudentDetailEditCommon from "./components/student-details/student-detail-edit/StudentDetailEdit";
import ScoreManagement from "./pages/ScoreManagement/ScoreManagement";
import ReserverList from "./pages/ReseverList";
import ErrorPage from "./pages/ErrorPage";
function App() {
  const createRoute = (path, page) => (
    <Route path={path} element={<MainPage page={page} />} />
  );

  return (
    <>
      <BrowserRouter>
        <Routes>
          {createRoute("/", <ErrorPage />)}
          {createRoute("/home", <ErrorPage />)}
          {createRoute("*", <ErrorPage />)}
          {createRoute("/login-register", <LoginPage />)}
          {createRoute("/student-list", <StudentList />)}
          {createRoute("/score-management", <ScoreManagement />)}
          {createRoute("/reserve-list", <ReserverList />)}
          {createRoute("/view-syllabus", <ErrorPage />)}
          {createRoute("/create-syllabus", <ErrorPage />)}
          {createRoute("/create-program", <ErrorPage />)}
          {createRoute("/view-problem", <ErrorPage />)}
          {createRoute("/create-problem", <ErrorPage />)}
          {createRoute("/view-class", <ClassList />)}
          {createRoute("/create-class", <ErrorPage />)}
          {createRoute("/training-calendar", <ErrorPage />)}
          {createRoute("/user-list", <ErrorPage />)}
          {createRoute("/user-permission", <ErrorPage />)}
          {createRoute("/learning-materials", <ErrorPage />)}
          {createRoute("/calendar-setting", <ErrorPage />)}
          {createRoute("/view-program", <ErrorPage />)}
          {createRoute("/home", <ErrorPage />)}
          {createRoute("/class/student-detail/:id", <StudentDetails />)}
          {createRoute("/student-detail/:id", <StudentDetailsCommon />)}
          {createRoute("/student-detail/:id/edit", <StudentDetailEditCommon />)}

          {/* <Route path="/" element={<MainPage />} />
           <Route path="/login-register" element={<LoginPage />} />
           <Route path="/student-list" element={<StudentList />} />
           <Route path="/score-management" element={<ScoreManagement />} />
          <Route path="/reserve-list" element={<ReserverList />} />
          <Route path="/view-syllabus" />
           <Route path="/create-syllabus" />
           <Route path="/view-problem" />
          <Route path="/create-problem" />
           <Route path="/view-class" element={<ClassList />} />
          <Route path="/create-class" />
           <Route path="/training-calender" />
           <Route path="/user-list" />
           <Route path="/user-permission" />
           <Route path="/learning materials" />
           <Route path="/Calendar" /> */}
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

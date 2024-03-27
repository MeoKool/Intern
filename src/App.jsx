import { BrowserRouter, Routes, Route, Router } from "react-router-dom";
import LoginPage from "./pages/LoginPage/LoginPage";
import StudentList from "./pages/studentList";
import ClassList from "./pages/classList";
import "./App.scss";
import MainPage from "./pages/MainPage/MainPage";
import ClassStudentDetail from "./components/Class/StudentDetail/ClassStudentDetail";
import StudentDetailsCommon from "./components/student-details/StudentDetailsCommon";
import StudentDetailEditCommon from "./components/student-details/student-detail-edit/StudentDetailEdit";
import ReserverList from "./pages/ReseverList";
import ErrorPage from "./pages/ErrorPage";
import EmailPage from "./pages/EmailPage";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import ClassDetail from "./components/ClassDetail/ClassDetail";
import { GlobalProvider } from "./context/GlobalContext";
import LandingPage from "./pages/LandingPage";

function RouteChangeTracker() {
  const location = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return null;
}

function App() {
  const createRoute = (path, page) => (
    <Route path={path} element={<MainPage page={page} />} />
  );

  return (
    <GlobalProvider>
      <BrowserRouter>
        <RouteChangeTracker />
        <Routes>
          {createRoute("/", <LandingPage />)}
          {createRoute("/home", <LandingPage />)}
          {createRoute("*", <ErrorPage />)}
          {createRoute("/student-list", <StudentList />)}
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
          {createRoute("/email-template", <EmailPage />)}
          {createRoute("/class/:id", <ClassDetail />)}
          {createRoute(
            "/class/:classId/student-detail/:id",
            <ClassStudentDetail />
          )}
          {createRoute("/student-detail/:id", <StudentDetailsCommon />)}
          {createRoute("/student-detail/:id/edit", <StudentDetailEditCommon />)}
        </Routes>
      </BrowserRouter>
    </GlobalProvider>
  );
}

export default App;

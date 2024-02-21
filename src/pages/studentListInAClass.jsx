import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import StudentList from "../components/studentList/StudentList";
import StudentListInClassHeader from "../components/ClassList/StudentListInClassHeader";

export default function studentListInAClass() {
  return (
    <>
      <Header />
      <StudentListInClassHeader />
      <StudentList/>
      <Footer />
    </>
  );
}

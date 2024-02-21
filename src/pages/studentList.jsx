import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import StudentList from "../components/studentList/StudentList";
import Navbar from "../components/navbar/Navbar";
import ContentContainer from "../components/ContentContainer/ContentContainer";
import StudentListInClassHeader from "../components/ClassList/StudentListInClassHeader";

export default function studentList() {
  return (
    <>
      <Header />
      <Navbar />
      <ContentContainer>
        <StudentListInClassHeader />
        <StudentList />
      </ContentContainer>
      <Footer />
    </>
  );
}

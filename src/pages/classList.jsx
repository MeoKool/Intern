import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import ClassList from "../components/ClassList/ClassList";
import Navbar from "../components/navbar/Navbar";
import ContentContainer from "../components/ContentContainer/ContentContainer";

export default function classList() {
  return (
    <>
      <Header />
      <Navbar />
      <ContentContainer>
        <ClassList />
      </ContentContainer>
      <Footer />
    </>
  );
}

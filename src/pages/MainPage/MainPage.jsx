import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import Navbar from "../../components/navbar/Navbar";
import ImportButton from "../../components/ImportButton/ImportButton";
import ContentContainer from "../../components/ContentContainer/ContentContainer";

const MainPage = () => {
  return (
    <>
      <Header />
      <Navbar />
      <ContentContainer>
        <div style={{ paddingTop: "100px", paddingLeft: "70px" }}>
          <ImportButton />
        </div>
      </ContentContainer>
      <Footer />
    </>
  );
};

export default MainPage;

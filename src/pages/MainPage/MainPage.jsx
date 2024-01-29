import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import Navbar from "../../components/navbar/Navbar";

export default function MainPage() {
  return (
    <>
      <Header />
      <Navbar isSidebarOpen={false} />
      <Footer />
    </>
  );
}

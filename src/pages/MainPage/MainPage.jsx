import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import Navbar from "../../components/navbar/Navbar";
import ImportButton from "../../components/ImportButton/ImportButton";
import { Box, Grid } from "@mui/material";
import { useState, useEffect, useRef } from "react";

const MainPage = ({ page }) => {
  const [gridCol, setGridCol] = useState("0.1fr 1fr");

  const changeWidth = (width) => {
    const totalWidthInPixels = window.innerWidth;
    const pixels = width;
    const frValue = pixels / totalWidthInPixels;
    setGridCol(`${frValue}fr ${1 - frValue}fr`);
  };

  useEffect(() => {
    const navbarDiv = document.getElementById("navbar");

    const resizeObserver = new ResizeObserver((entries) => {
      changeWidth(navbarDiv.clientWidth);
    });

    resizeObserver.observe(navbarDiv);
  }, []);

  return (
    <>
      {gridCol && (
        <>
          <Header />
          <div
            style={{
              display: "grid",
              gridTemplateColumns: `${gridCol}`,
            }}
          >
            <Box>
              <Navbar />
            </Box>
            <Box sx={{ marginTop: "80px" }}>
              {page}
              <Footer />
            </Box>
          </div>
        </>
      )}
    </>
  );
};

export default MainPage;

import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import Navbar from "../../components/navbar/Navbar";
import { Box, Grid } from "@mui/material";
import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";

const MainPage = ({ page }) => {

  const navbarHeight = 80

  const [navbarWidth, setNavbarWidth] = useState(0)
  const [pageHeight, setPageHeight] = useState(0);

  const changeWidth = (width) => {
    setNavbarWidth(width)
  };

  useEffect(() => {
    const navbarDiv = document.getElementById("navbar");

    const resizeObserver = new ResizeObserver((entries) => {
      changeWidth(navbarDiv.clientWidth);
    });

    window.addEventListener("resize", (e) => {
      changeWidth(navbarDiv.clientWidth);
    });

    resizeObserver.observe(navbarDiv)

    const totalHeightInPixels = window.innerHeight
    setPageHeight(totalHeightInPixels - navbarHeight)
  }, []);

  return (
    <>
      {(
        <>
          <Header height={navbarHeight} />
          <div>
            <Box>
              <Navbar sx={{ marginTop: `${navbarHeight}px` }} />
            </Box>
            <Box sx={{
              marginLeft: `${navbarWidth}px`,
              marginTop: `${navbarHeight}px`,
              display: 'flex',
              flexDirection: 'column',
              minHeight: pageHeight,
              justifyContent: 'space-between',
            }}>
              <Box sx={{ overflowX: 'auto' }}>
                {page}
              </Box>
              <Footer />
            </Box>
          </div>
        </>
      )}
    </>
  );
};

export default MainPage;

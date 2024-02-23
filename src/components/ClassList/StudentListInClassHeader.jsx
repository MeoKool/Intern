import React, { useEffect, useState } from "react";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import axios from "axios";
import { Box } from "@mui/material";

export default function StudentListInClassHeader() {
  const [classData, setClassData] = useState({});

  useEffect(() => {
    fetchClassData();
  }, []);

  const fetchClassData = async () => {
    try {
      const response = await axios.get(
        "https://65b9c15fb71048505a8b1ebb.mockapi.io/class"
      );
      const firstClass = response.data[0];
      setClassData(firstClass);
    } catch (error) {
      console.log("Fetching class data failed!");
    }
  };

  return (
    <>
      <div
        className="ClassHeader"
        style={{
          fontSize: "26px",
          marginBottom: "30px",

          fontFamily: "Arial, sans-serif",
          backgroundColor: "#2d3748",
          fontWeight: "bold",
          color: "white",
          padding: "50px",
        }}
      >
        <h1 style={{ fontSize: "20px" }}>Class</h1>

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Box>
            <h2>{classData.class}</h2>
            <h3 style={{ fontSize: "20px", position: "relative" }}>
              {classData.class_code}
              <span
                style={{
                  position: "absolute",
                  bottom: "-10px",
                  left: "0",
                  width: "50%",
                  borderBottom: "2px solid white",
                }}
              ></span>
            </h3>
            <h4 style={{ fontSize: "18px", color: "white", marginTop: "25px" }}>
              31 Days (97 Hours)
            </h4>
          </Box>
          <Box>
            <MoreHorizIcon
              style={{
                color: "white",
                position: "absolute",
                top: "160px",
                fontSize: "30px",
              }}
            />
          </Box>
        </Box>
      </div>
    </>
  );
}

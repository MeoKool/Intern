import { useEffect, useState } from "react";
import axios from "axios";
import { Box } from "@mui/material";
import { GetClassById } from "../../api/APIConfigure";

export default function StudentListInClassHeader({ id }) {
  const [classData, setClassData] = useState({});
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    fetchClassData();
  }, []);

  const fetchClassData = async () => {
    try {
      const response = await GetClassById(id);
      const firstClass = response.data;
      setClassData(firstClass);
      setLoading(false);
    } catch (error) {
      console.log("Fetching class data failed!");
    }
  };

  if (isLoading) return <></>;

  return (
    <>
      <div
        className="ClassHeader"
        style={{
          fontSize: "26px",
          marginBottom: "30px",
          marginTop: "1px",
          fontFamily: "Inter, sans-serif",
          backgroundColor: "#2d3748",
          fontWeight: "bold",
          color: "white",
          padding: "40px 0 40px 20px",
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
            <h2>{classData.program.programName}</h2>
            <h3 style={{ fontSize: "20px", position: "relative" }}>
              {classData.className}
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
              {classData.duration}
            </h4>
          </Box>
        </Box>
      </div>
    </>
  );
}

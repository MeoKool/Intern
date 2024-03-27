import Tab from "@mui/material/Tab";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Box } from "@mui/material";
import { useState } from "react";
import StudentListInClass from "../studentListInClass/StudentListInClass";
import StudentListInClassHeader from "../ClassList/StudentListInClassHeader";
import ScoreManagement from "../ScoreManagement/ScoreManagement";
import { useParams } from "react-router-dom";

export default function ClassDetail() {
  const [value, setValue] = useState("1");
  const { id } = useParams();

  const tabStyle = {
    background: "#2D3748",
    color: "#fff!important",
    borderTopLeftRadius: "12px",
    borderTopRightRadius: "12px",
    marginRight: "1px",
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <StudentListInClassHeader id={id} />
      <TabContext value={value}>
        <Box>
          <TabList
            sx={{
              margin: "1rem 0 0",
            }}
            onChange={handleChange} // Attach the handleChange function to the onChange prop
            aria-label="lab API tabs example"
          >
            <Tab sx={tabStyle} label="Student List" value="1" />
            <Tab sx={tabStyle} label="Score management" value="2" />
          </TabList>
        </Box>
        <TabPanel sx={{ padding: "0" }} value="1">
          <StudentListInClass />
        </TabPanel>
        <TabPanel sx={{ padding: "0" }} value="2">
          <ScoreManagement />
        </TabPanel>
      </TabContext>
    </>
  );
}

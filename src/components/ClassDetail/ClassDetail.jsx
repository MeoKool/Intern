import Tab from "@mui/material/Tab";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Box } from "@mui/material";
import { useState } from "react";
import StudentListInClass from "../studentListInClass/StudentListInClass";

export default function ClassDetail() {
  const [value, setValue] = useState("2"); // Use state to manage the selected tab

  const tabStyle = {
    background: "#2D3748",
    color: "#fff",
    borderTopLeftRadius: "1rem",
    borderTopRightRadius: "1rem",
    marginRight: "4px",
  };

  const tabIndicatorStyle = {};

  const handleChange = (event, newValue) => {
    setValue(newValue);
    console.log("Selected tab:", newValue);
  };

  return (
    <TabContext value={value}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <TabList
          sx={{
            margin: "1.5rem 1.5rem 0",
          }}
          onChange={handleChange} // Attach the handleChange function to the onChange prop
          aria-label="lab API tabs example"
        >
          <Tab sx={tabStyle} label="Training Program" value="1" />
          <Tab sx={tabStyle} label="Student List" value="2" />
          <Tab sx={tabStyle} label="Budget" value="3" />
          <Tab sx={tabStyle} label="Others" value="4" />{" "}
        </TabList>
      </Box>
      <TabPanel value="1">Item one</TabPanel>
      <TabPanel value="2">
        <StudentListInClass />
      </TabPanel>
      <TabPanel value="3">Item Three</TabPanel>
      <TabPanel value="4">Item Four</TabPanel>{" "}
      {/* Add a TabPanel for the "Others" tab */}
    </TabContext>
  );
}

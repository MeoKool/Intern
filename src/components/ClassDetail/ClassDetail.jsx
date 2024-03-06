import Tab from "@mui/material/Tab";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Box } from "@mui/material";
import { useState } from "react";
import StudentListInClass from "../studentListInClass/StudentListInClass";

export default function ClassDetail() {
  const [value, setValue] = useState("2");

  const tabStyle = {
    background: "#2D3748",
    color: "#fff!important",
    borderTopLeftRadius: "12px",
    borderTopRightRadius: "12px",
    marginRight: "1px",
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
    console.log("Selected tab:", newValue);
  };

  return (
    <TabContext value={value}>
      <Box>
        <TabList
          sx={{
            margin: "1rem 0 0",
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
      <TabPanel sx={{ padding: "0" }} value="1">
        Item one
      </TabPanel>
      <TabPanel sx={{ padding: "0" }} value="2">
        <StudentListInClass />
      </TabPanel>
      <TabPanel sx={{ padding: "0" }} value="3">
        Item Three
      </TabPanel>
      <TabPanel sx={{ padding: "0" }} value="4">
        Item Four
      </TabPanel>{" "}
    </TabContext>
  );
}

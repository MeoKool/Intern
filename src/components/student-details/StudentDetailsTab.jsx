import Tab from "@mui/material/Tab";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Box } from "@mui/material";
import { useState } from "react";
import StudentDetails from "../student-details/StudentDetails";
import Active from "../ActiveLog/ActiveLog";

export default function StudentDetailsTab() {
  const [value, setValue] = useState("1");

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
          onChange={handleChange}
          aria-label="lab API tabs example"
        >
          <Tab sx={tabStyle} label="Student Details" value="1" />
          <Tab sx={tabStyle} label="Active Log" value="2" />{" "}
        </TabList>
      </Box>
      <TabPanel sx={{ padding: "0" }} value="1">
        <StudentDetails />
      </TabPanel>
      <TabPanel sx={{ padding: "0" }} value="2">
      <Active />
      </TabPanel>{" "}
    </TabContext>
  );
}

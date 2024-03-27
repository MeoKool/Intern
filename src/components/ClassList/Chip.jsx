import React from "react";
import PropTypes from "prop-types";
import Chip from "@mui/material/Chip";

const AttendeeChip = ({ type }) => {
  let backgroundColor = "";
  let label = "";

  switch (type) {
    case "fresher":
      backgroundColor = "pink";
      label = "Fresher";
      break;
    case "online fee-fresher":
      backgroundColor = "green";
      label = "Online Fee-Fresher";
      break;
    case "intern":
      backgroundColor = "darkblue";
      label = "Intern";
      break;
    default:
      backgroundColor = "grey";
      label = "Unknown";
  }

  return (
    <Chip
      label={label}
      style={{ backgroundColor: backgroundColor, color: "white" }}
    />
  );
};

AttendeeChip.propTypes = {
  type: PropTypes.string.isRequired,
};
export default AttendeeChip;

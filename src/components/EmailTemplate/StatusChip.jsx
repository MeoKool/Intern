import React from "react";
import PropTypes from "prop-types";
import Chip from "@mui/material/Chip";

const StatusChip = ({ status }) => {
  const getChipProps = () => {
    const chipProps = {
      label: status,
      color: "default",
    };

    if (status === "active") {
      chipProps.color = "success";
    } else {
      chipProps.color = "default";
    }

    return chipProps;
  };

  return <Chip {...getChipProps()} />;
};

StatusChip.propTypes = {
  status: PropTypes.string.isRequired,
};

export default StatusChip;

import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Select,
  MenuItem,
} from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";

export default function SendEmailButton() {
  const [open, setOpen] = React.useState(false);
  const [error, setError] = React.useState(null);
  const [showOptions, setShowOptions] = useState(false);
  const [template, setTemplate] = useState(1);
  const [apitempale, setApiTempale] = useState();
  const handleChange = (event) => {
    setTemplate(event.target.value);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setError(null);
  };

  const fetchTemplates = async () => {
    try {
      const response = await axios.get(
        "http://fams-net05-02.somee.com/api/email/email-templates/all-minimal"
      );
      setApiTempale(response.data);
      console.log(apitempale);
    } catch (error) {
      console.error(error);
    }
  };

  // Call the function when needed
  useEffect(() => {
    fetchTemplates();
  }, []);
  return (
    <div
      style={{
        float: "right",
        marginRight: "10px",
        marginTop: "10px",
        borderRadius: "4px",
      }}
    >
      <Button
        sx={{
          padding: "10px",
          backgroundColor: "#2d3748",
        }}
        variant="contained"
        onClick={handleClickOpen}
      >
        <EmailIcon />
        Send Email
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle
          style={{
            textAlign: "center",
            background: "#2D3748",
            color: "#fff",
            paddingTop: "0.5rem",
            paddingBottom: "0.5rem",
          }}
        >
          Select Mail Template
        </DialogTitle>

        <DialogContent>
          {/* Import Setting Section */}

          <div className="import-setting">
            <div className="setting-title">
              <h4>Categories</h4>
            </div>
            <div>
              <div className="setting-content">
                <p className="title">Reserve</p>
                <div className="option"></div>
              </div>
            </div>
          </div>

          <div className="import-setting">
            <div className="setting-title">
              <h4>Apply to</h4>
            </div>
            <div>
              <div className="setting-content">
                <p className="title">Trainer</p>
                <div className="option"></div>
              </div>
            </div>
          </div>

          <div className="import-setting">
            <div className="setting-title">
              <h4>Send to</h4>
            </div>
            <div>
              <div className="setting-content">
                <p className="title">Quangtsse160326@fpt.edu.vn</p>
                <div className="option"></div>
              </div>
            </div>
          </div>

          <div className="import-setting">
            <div
              className="setting-title"
              onClick={() => setShowOptions(!showOptions)}
            >
              <h4>Template Name</h4>
            </div>
            <div>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={template}
                onChange={handleChange}
                sx={{ m: 0, minWidth: 300 }}
                inputProps={{ "aria-label": "Without label" }}
              >
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>
            </div>
          </div>
          {/* Duplicate Control Section */}
        </DialogContent>

        <DialogActions>
          {error && <p style={{ color: "red" }}>{error}</p>}
          <Button variant="contained" onClick={handleClose} color="secondary">
            Submit
          </Button>
          <Button
            style={{ color: "#E74A3B", textDecoration: "underline" }}
            onClick={handleClose}
            color="secondary"
          >
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

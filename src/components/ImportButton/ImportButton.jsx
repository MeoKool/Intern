import React from "react";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";
import "./ImportButton.css";
import { useParams } from "react-router-dom";

export default function ImportButton() {
  const id = useParams() || 1;
  const [open, setOpen] = React.useState(false);
  const [duplicateHandle, setDuplicateHandle] = React.useState("Allow");
  const [selectedFile, setSelectedFile] = React.useState(null);
  const [error, setError] = React.useState(null);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setError(null);
  };

  const handleDuplicateHandleChange = (event) => {
    setDuplicateHandle(event.target.value);
  };

  const handleFileChange = (event) => {
    // Assuming you only want to handle a single file selection
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  const handleImport = () => {
    if (!selectedFile) {
      setError("Please select a file");
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedFile);
    formData.append("duplicateHandle", duplicateHandle);

    fetch(`http://localhost:8080/api/classes/${id}/add-students-by-excel`, {
      method: "POST",
      body: formData,
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to import students");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Import successful", data);
        handleClose();
      })
      .catch((error) => {
        console.error("Import failed", error);
        setError("Failed to import students");
      });
  };

  return (
    <div>
      <Button variant="contained" color="primary" onClick={handleClickOpen}>
        Import
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
          Import Student
        </DialogTitle>

        <DialogContent>
          {/* Import Setting Section */}

          <div className="import-setting">
            <div className="setting-title">
              <h4>Import setting</h4>
            </div>
            <div>
              <div className="setting-content">
                <p className="title">File</p>
                <div className="option">
                  <Button
                    style={{
                      background: "#2D3748",
                      color: "#fff",
                      padding: "2px 1rem",
                    }}
                    variant="contained"
                    component="label"
                  >
                    {selectedFile
                      ? selectedFile.name.substring(0, 10) + "..."
                      : "Select"}
                    <input type="file" hidden onChange={handleFileChange} />
                  </Button>
                </div>
              </div>

              <div className="setting-content">
                <p className="title">Import template</p>
                <div className="option">
                  <a href="student-template.xlsx">Download</a>
                </div>
              </div>
            </div>
          </div>

          {/* Duplicate Control Section */}

          <div className="duplicate-control">
            <div className="setting-title">
              <h4>Duplicate control</h4>
            </div>
            <div>
              <p className="title">Duplicate handle</p>
              <div>
                <FormControl component="fieldset">
                  <RadioGroup
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      marginTop: "0.5rem",
                    }}
                    aria-label="duplicate-handle"
                    name="duplicate-handle"
                    value={duplicateHandle}
                    onChange={handleDuplicateHandleChange}
                  >
                    <FormControlLabel
                      value="Allow"
                      control={<Radio />}
                      label="Allow"
                    />
                    <FormControlLabel
                      value="Replace"
                      control={<Radio />}
                      label="Replace"
                    />
                    <FormControlLabel
                      value="Skip"
                      control={<Radio />}
                      label="Skip"
                    />
                  </RadioGroup>
                </FormControl>
              </div>
            </div>
          </div>
        </DialogContent>

        <DialogActions>
          {error && <p style={{ color: "red" }}>{error}</p>}
          <Button
            style={{ color: "#E74A3B", textDecoration: "underline" }}
            onClick={handleClose}
            color="secondary"
          >
            Cancel
          </Button>
          <Button
            style={{
              background: "#2D3748",
              color: "#fff",
              padding: "4px 1rem",
            }}
            onClick={handleImport}
            color="primary"
          >
            Import
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

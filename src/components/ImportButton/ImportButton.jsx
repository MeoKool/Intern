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
import { FileUpload } from "@mui/icons-material";
import { showErrorAlertModal, showSuccessModal } from "../../utils/Message";

export default function ImportButton({ file, postFile, idObj }) {
  const [open, setOpen] = React.useState(false);
  const [duplicateHandle, setDuplicateHandle] = React.useState("Replace");
  const [selectedFile, setSelectedFile] = React.useState(null);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDuplicateHandleChange = (event) => {
    setDuplicateHandle(event.target.value);
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  const handleImport = () => {
    if (!selectedFile) {
      showErrorAlertModal("Please select a file");
      return;
    }

    const formData = new FormData();
    formData.append("excelFile", selectedFile);

    postFile(idObj, formData, duplicateHandle)
      .then(() => {
        showSuccessModal(
          "Import students successfully, the page will refresh automatically after 2 seconds"
        );
        handleClose();
        setTimeout(() => window.location.reload(), 2222);
      })
      .catch((error) => {
        showErrorAlertModal(error.response);
      });
  };

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
          backgroundColor: "#2F903F",
        }}
        variant="contained"
        onClick={handleClickOpen}
      >
        <FileUpload />
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
                  <a href={file}>Download</a>
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

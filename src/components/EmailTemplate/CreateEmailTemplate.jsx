import { useState } from "react";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Select, MenuItem } from "@mui/material";

const CreateEmailTemplate = ({ open, handleClose }) => {
    const [emailName, setEmailName] = useState("");
    const [emailDescription, setEmailDescription] = useState("");
    const [recipient, setRecipient] = useState("");
    const [category, setCategory] = useState("");

    const handleCreate = () => {
        console.log("Creating email template...");
        console.log("Email Name:", emailName);
        console.log("Email Description:", emailDescription);
        console.log("Recipient:", recipient);
        console.log("Category:", category);
        handleClose();
    };

    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Create New Email Template</DialogTitle>
            <DialogContent>
                <TextField
                    autoFocus
                    margin="dense"
                    label="Email Name"
                    fullWidth
                    value={emailName}
                    onChange={(e) => setEmailName(e.target.value)}
                />
                <TextField
                    margin="dense"
                    label="Email Description"
                    fullWidth
                    value={emailDescription}
                    onChange={(e) => setEmailDescription(e.target.value)}
                />
                <Select
                    value={recipient}
                    onChange={(e) => setRecipient(e.target.value)}
                    fullWidth
                    margin="dense"
                    label="Recipient"
                >
                    <MenuItem value="Trainer">Trainer</MenuItem>
                    <MenuItem value="Student">Student</MenuItem>
                </Select>
                <Select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    fullWidth
                    margin="dense"
                    label="Category"
                >
                    {recipient === "Trainer"
                        ? [
                              <MenuItem key="inform" value="Inform">
                                  Inform
                              </MenuItem>,
                              <MenuItem key="remind" value="Remind">
                                  Remind
                              </MenuItem>,
                          ]
                        : recipient === "Student"
                        ? [
                              <MenuItem key="inform" value="Inform">
                                  Inform
                              </MenuItem>,
                              <MenuItem key="remind" value="Remind">
                                  Remind
                              </MenuItem>,
                              <MenuItem key="score" value="Score">
                                  Score
                              </MenuItem>,
                              <MenuItem key="reservation" value="Reservation">
                                  Reservation
                              </MenuItem>,
                          ]
                        : null}
                </Select>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Discard</Button>
                <Button onClick={handleCreate}>Create</Button>
            </DialogActions>
        </Dialog>
    );
};

export default CreateEmailTemplate;

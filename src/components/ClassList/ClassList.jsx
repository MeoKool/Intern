import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  InputAdornment,
  Menu,
  MenuItem,
  Paper,
  Popover,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import FilterListIcon from "@mui/icons-material/FilterList";
import AddCircleOutline from "@mui/icons-material/AddCircleOutline";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import EditIcon from "@mui/icons-material/Edit";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import AttendeeChip from "./Chip";
import { GlobalContext } from "../../context/GlobalContext";
import StudentListInClassHeader from "./StudentListInClassHeader";
import { GetAllClasses } from "../../api/APIConfigure";


const ClassList = () => {
  const [users, setUsers] = useState([]);
  const { totalClasses } = useContext(GlobalContext);
  const [searchItem, setSearchItem] = useState("");
  const [moreHorizAnchorEls, setMoreHorizAnchorEls] = useState({});
  const [anchorEl, setAnchorEl] = useState(null);
  const [deleteConfirmation, setDeleteConfirmation] = useState(null);
  const [selectedOption, setSelectedOption] = useState("class_code");
  const [selectedClassID, setSelectedClassID] = useState(null);
  const [classDetails, setClassDetails] = useState(null);

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    try {
      const response = await GetAllClasses(totalClasses);
      setUsers(Array.isArray(response.data.items) ? response.data.items : []);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(
        `http://fams-net05-02.somee.com/api/classes/${deleteConfirmation}`
      );
      closeDeleteConfirmation();
      fetchUser();
    } catch (error) {
      console.error("Error deleting class:", error);
    }
  };

  const handleMenuClick = (event, userId) => {
    setMoreHorizAnchorEls((prevEls) => ({
      ...prevEls,
      [userId]: event.currentTarget,
    }));
  };

  const handleMenuClose = (userId) => {
    setMoreHorizAnchorEls((prevEls) => ({
      ...prevEls,
      [userId]: null,
    }));
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const openDeleteConfirmation = (userId) => {
    setDeleteConfirmation(userId);
  };

  const closeDeleteConfirmation = () => {
    setDeleteConfirmation(null);
  };

  const handleDuplicateClass = async (userId) => {
    try {
      const response = await axios.get(
        `https://65b9c15fb71048505a8b1ebb.mockapi.io/class/${userId}`
      );

      const confirmDuplicate = window.confirm(
        "Are you sure you want to duplicate this class?"
      );

      if (confirmDuplicate) {
        await axios.post(
          "https://65b9c15fb71048505a8b1ebb.mockapi.io/class",
          response.data
        );

        fetchUser();
      }
    } catch (error) {
      console.error("Error duplicating class:", error);
    }
  };

  const filteredUsers = users.filter((user) => {
    if (selectedOption === "class" && typeof user.className === "string") {
      return user.className.toLowerCase().includes(searchItem.toLowerCase());
    } else if (selectedOption === "class_code") {
      return user.id.toString().includes(searchItem.toLowerCase());
    } else if (selectedOption === "created_by") {
      return user.createdUserId.toString().includes(searchItem);
    }
    return true;
  });

  return (
    <>
      <h1
        style={{
          fontSize: "25px",
          marginBottom: "20px",
          fontWeight: "bold",
          backgroundColor: "#2d3748",
          color: "white",
          padding: "20px",
          marginTop: "2px",
        }}
      >
        Training Class
      </h1>
      <Box sx={{ display: "flex" }}>
        <Box component={"main"} sx={{ flexGrow: 1, p: 5 }}>
          <div className="main">
            <TableContainer component={Paper} className="top-container">
              <div className="header-list">
                <TextField
                  label="Search by"
                  value={searchItem}
                  onChange={(e) => setSearchItem(e.target.value)}
                  style={{
                    width: "300px",
                    marginBottom: "10px",
                    marginRight: "10px",
                  }}
                  inputProps={{
                    endAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon />
                      </InputAdornment>
                    ),
                  }}
                />
                <Button
                  variant="contained"
                  style={{
                    backgroundColor: "#2d3748",
                    padding: "10px",
                    marginLeft: "10px",
                    marginTop: "10px",
                  }}
                  onClick={handleClick}
                >
                  <FilterListIcon />
                  Filter
                </Button>
                <Popover
                  open={Boolean(anchorEl)}
                  anchorEl={anchorEl}
                  onClose={handleClose}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "center",
                  }}
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "center",
                  }}
                >
                  <Select
                    value={selectedOption}
                    onChange={(e) => setSelectedOption(e.target.value)}
                    style={{
                      width: "150px",
                    }}
                  >
                    <MenuItem value={"class"}>Class</MenuItem>
                    <MenuItem value={"class_code"}>Class code</MenuItem>
                    <MenuItem value={"created_by"}>Create by</MenuItem>
                  </Select>
                </Popover>
                <Button
                  variant="contained"
                  style={{
                    float: "right",
                    backgroundColor: "#2d3748",
                    padding: "10px",
                    marginTop: "10px",
                  }}
                >
                  <AddCircleOutline style={{ marginRight: "10px" }} />
                  Add new
                </Button>
              </div>
              <Table
                sx={{ minWidth: 650 }}
                aria-label="simple table"
                className="staff-table"
              >
                <TableHead style={{ backgroundColor: "#2d3748" }}>
                  <TableRow>
                    <TableCell
                      style={{
                        fontSize: "20px",
                        fontFamily: "Arial, sans-serif",
                        color: "white",
                        textAlign: "center",
                      }}
                    >
                      Class
                    </TableCell>
                    <TableCell
                      style={{
                        fontSize: "20px",
                        fontFamily: "Arial, sans-serif",
                        color: "white",
                        textAlign: "center",
                      }}
                    >
                      Class Code
                    </TableCell>
                    <TableCell
                      style={{
                        fontSize: "20px",
                        fontFamily: "Arial, sans-serif",
                        color: "white",
                        textAlign: "center",
                      }}
                    >
                      Create On
                    </TableCell>
                    <TableCell
                      style={{
                        fontSize: "20px",
                        fontFamily: "Arial, sans-serif",
                        color: "white",
                        textAlign: "center",
                      }}
                    >
                      Create By
                    </TableCell>
                    <TableCell
                      style={{
                        fontSize: "20px",
                        fontFamily: "Arial, sans-serif",
                        color: "white",
                        textAlign: "center",
                      }}
                    >
                      Duration
                    </TableCell>

                    <TableCell
                      style={{
                        fontSize: "20px",
                        fontFamily: "Arial, sans-serif",
                        color: "white",
                        textAlign: "center",
                      }}
                    >
                      Location
                    </TableCell>

                    <TableCell></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredUsers.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell style={{ fontSize: "15px" }} align="center">
                        {user.className}
                      </TableCell>
                      <TableCell style={{ fontSize: "15px" }} align="center">
                        {user.id}
                      </TableCell>
                      <TableCell style={{ fontSize: "15px" }} align="center">
                        {new Date(user.createdDate).toLocaleDateString()}
                      </TableCell>
                      <TableCell style={{ fontSize: "15px" }} align="center">
                        {user.createdUserId}
                      </TableCell>
                      <TableCell style={{ fontSize: "15px" }} align="center">
                        {user.duration}
                      </TableCell>

                      <TableCell style={{ fontSize: "15px" }} align="center">
                        {user.location}
                      </TableCell>

                      <TableCell align="center">
                        <MoreHorizIcon
                          onClick={(event) => handleMenuClick(event, user.id)}
                        />
                        <Menu
                          anchorEl={moreHorizAnchorEls[user.id]}
                          open={Boolean(moreHorizAnchorEls[user.id])}
                          onClose={() => handleMenuClose(user.id)}
                        >
                          <MenuItem
                            component={Link}
                            to={{
                              pathname: `/class/${user.id}`,
                              state: { classData: user },
                            }}
                            onClick={() => handleMenuClose(user.id)}
                          >
                            <EditIcon style={{ marginRight: "8px" }} />
                            View class
                          </MenuItem>
                          <MenuItem
                            onClick={() => handleDuplicateClass(user.id)}
                          >
                            <ContentCopyIcon style={{ marginRight: "8px" }} />
                            Duplicate class
                          </MenuItem>
                          <MenuItem
                            onClick={() => openDeleteConfirmation(user.id)}
                          >
                            <DeleteForeverIcon style={{ marginRight: "8px" }} />
                            Delete class
                          </MenuItem>
                        </Menu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        </Box>
      </Box>
      <Dialog
        open={Boolean(deleteConfirmation)}
        onClose={closeDeleteConfirmation}
      >
        <DialogTitle>Delete Confirmation</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this class?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDeleteConfirmation}>Cancel</Button>
          <Button onClick={handleDelete} color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
      {selectedClassID && classDetails && (
        <StudentListInClassHeader classDetails={classDetails} />
      )}
    </>
  );
};

export default ClassList;

import {
  AddCircleOutline,
  Search as SearchIcon,
  FilterList as FilterListIcon,
} from "@mui/icons-material";
import {
  Box,
  InputAdornment,
  Paper,
  TableContainer,
  TextField,
  Button,
  Popover,
  Select,
  MenuItem,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";
import ModeIcon from "@mui/icons-material/Mode";
import axios from "axios";
import React, { useEffect, useState } from "react";
import StatusChip from "./StatusChip";
import CreateEmailTemplate from "./CreateEmailTemplate";

const EmailTemplate = () => {
  const [users, setUsers] = useState([]);
  const [searchItem, setSearchItem] = useState("");
  const [moreHorizAnchorEls, setMoreHorizAnchorEls] = useState({});
  const [anchorE1, setAnchorE1] = useState(null);
  const [selectOption, setSelectOption] = useState("email_name");
  const [openCreateDialog, setOpenCreateDialog] = useState(false);
  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    try {
      const response = await axios.get(
        "https://65b9c15fb71048505a8b1ebb.mockapi.io/email"
      );
      setUsers(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleClose = () => {
    setAnchorE1(null);
  };

  const handleClick = (event) => {
    setAnchorE1(event.currentTarget);
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
  const handleCreateDialogOpen = () => {
    setOpenCreateDialog(true);
  };

  const handleCreateDialogClose = () => {
    setOpenCreateDialog(false);
  };
  const filteredUsers = users.filter((user) => {
    if (selectOption === "email_name") {
      return user.email_name.toLowerCase().includes(searchItem.toLowerCase());
    } else if (selectOption === "apply_to") {
      return user.apply_to.toLowerCase().includes(searchItem.toLowerCase());
    }
    return true;
  });

  return (
    <>
      <h2
        style={{
          fontSize: "30px",
          marginBottom: "20px",
          fontFamily: "Arial, sans-serif",
          fontWeight: "bold",
          backgroundColor: "#2d3748",
          color: "white",
          padding: "20px",
          marginTop: "1px",
        }}
      >
        Email Template
      </h2>
      <Box sx={{ display: "flex" }}>
        <a
          href="#"
          style={{
            marginRight: "10px",
            textDecoration: "none",
            fontSize: "10px",
            color: "inherit",
          }}
        >
          <h1>All Category</h1>
        </a>
        <a
          href="#"
          style={{
            marginRight: "10px",
            textDecoration: "none",
            fontSize: "15px",
            color: "inherit",
          }}
        >
          <h2>Reserve</h2>
        </a>
        <a
          href="#"
          style={{
            marginRight: "10px",
            textDecoration: "none",
            fontSize: "20px",
            color: "inherit",
          }}
        >
          <h3>Notice</h3>
        </a>
        <a
          href="#"
          style={{
            marginRight: "10px",
            textDecoration: "none",
            fontSize: "24px",
            color: "inherit",
          }}
        >
          <h4>Remind</h4>
        </a>
        <a
          href="#"
          style={{
            textDecoration: "none",
            fontSize: "29px",
            color: "inherit",
          }}
        >
          <h5>Other</h5>
        </a>
      </Box>
      <Box sx={{ display: "flex" }}>
        <Box component={"main"} sx={{ flexGrow: 1, p: 5 }}>
          <div className="main">
            <TableContainer component={Paper} className="top-container">
              <div className="header-list">
                <TextField
                  label="Search by..."
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
                  open={Boolean(anchorE1)}
                  anchorEl={anchorE1}
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
                    value={selectOption}
                    onChange={(e) => setSelectOption(e.target.value)}
                    style={{
                      width: "150px",
                    }}
                  >
                    <MenuItem value={"email_name"}>Email name</MenuItem>
                    <MenuItem value={"apply_to"}>Apply</MenuItem>
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
                  onClick={handleCreateDialogOpen}
                >
                  <AddCircleOutline style={{ marginRight: "10px" }} />
                  Add new
                </Button>
                <CreateEmailTemplate
                  open={openCreateDialog}
                  handleClose={handleCreateDialogClose}
                />
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
                      Name
                    </TableCell>
                    <TableCell
                      style={{
                        fontSize: "20px",
                        fontFamily: "Arial, sans-serif",
                        color: "white",
                        textAlign: "center",
                      }}
                    >
                      Status
                    </TableCell>
                    <TableCell
                      style={{
                        fontSize: "20px",
                        fontFamily: "Arial, sans-serif",
                        color: "white",
                        textAlign: "center",
                      }}
                    >
                      Description
                    </TableCell>
                    <TableCell
                      style={{
                        fontSize: "20px",
                        fontFamily: "Arial, sans-serif",
                        color: "white",
                        textAlign: "center",
                      }}
                    >
                      Categories
                    </TableCell>
                    <TableCell
                      style={{
                        fontSize: "20px",
                        fontFamily: "Arial, sans-serif",
                        color: "white",
                        textAlign: "center",
                      }}
                    >
                      Apply to
                    </TableCell>
                    <TableCell></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredUsers.map((user) => (
                    <TableRow key={user.Id}>
                      <TableCell style={{ fontSize: "15px" }} align="center">
                        {user.email_name}
                      </TableCell>
                      <TableCell style={{ fontSize: "15px" }} align="center">
                        <StatusChip status={user.status} />
                      </TableCell>
                      <TableCell style={{ fontSize: "15px" }} align="center">
                        {user.description}
                      </TableCell>
                      <TableCell style={{ fontSize: "15px" }} align="center">
                        {user.categories}
                      </TableCell>
                      <TableCell style={{ fontSize: "15px" }} align="center">
                        {user.apply_to}
                      </TableCell>
                      <TableCell align="center">
                        <ModeIcon
                          onClick={(event) => handleMenuClick(event, user.Id)}
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        </Box>
      </Box>
    </>
  );
};

export default EmailTemplate;

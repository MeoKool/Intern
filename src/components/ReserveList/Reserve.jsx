import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  TextField,
  InputAdornment,
  Select,
  Popover,
  Button,
  Menu,
  MenuItem,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import FilterListIcon from "@mui/icons-material/FilterList";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import PublishIcon from "@mui/icons-material/Publish";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import StopCircleOutlinedIcon from "@mui/icons-material/StopCircleOutlined";
import { Link } from "react-router-dom";
import PanToolOutlinedIcon from "@mui/icons-material/PanToolOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";

const Reserve = () => {
  const [users, setUsers] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [moreHorizAnchorEl, setMoreHorizAnchorEl] = useState(null);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [page, setPage] = React.useState(0);
  const [searchTerm, setSearchTerm] = React.useState("");
  const [selectedOption, setSelectedOption] = useState("fullName");

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleMenuClick = (event) => {
    setMoreHorizAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setMoreHorizAnchorEl(null);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get(
        "https://6535e093c620ba9358ecba91.mockapi.io/Resrver"
      );
      setUsers(Array.isArray(response.data) ? response.data : []);
    } catch (err) {
      setUsers([]);
    }
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const filteredStatus = users.filter((user) => {
    if (
      searchTerm &&
      user[selectedOption] &&
      !user[selectedOption].toLowerCase().includes(searchTerm.toLowerCase())
    ) {
      return false;
    }

    return true;
  });

  const slicedUser = filteredStatus.slice(
    page * rowsPerPage,
    (page + 1) * rowsPerPage
  );

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
        Reserve List
      </h2>
      <Box sx={{ display: "flex" }}>
        <Box component="main" sx={{ flexGrow: 1, p: 5 }}>
          <div className="main">
            <TableContainer component={Paper} className="dashboard-container">
              <div className="header-list">
                <TextField
                  label="Search by ..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  style={{
                    width: "500px",
                    marginBottom: "40px",
                    marginTop: "10px",
                  }}
                  InputProps={{
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
                  Advanced search
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
                    <MenuItem value={"studentId"}>Student code</MenuItem>
                    <MenuItem value={"fullName"}>Full Name</MenuItem>
                    <MenuItem value={"Email"}>Email</MenuItem>
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
                  <AddCircleOutlineIcon style={{ marginRight: "10px" }} />
                  Add new
                </Button>
                <Button
                  variant="contained"
                  style={{
                    float: "right",
                    backgroundColor: "#d45b13",
                    padding: "10px",
                    marginRight: "10px",
                    marginTop: "10px",
                  }}
                >
                  <PublishIcon />
                  Import
                </Button>
              </div>
              <Table
                sx={{ minWidth: 650 }}
                aria-label="simple table"
                className="staff-table"
              >
                <TableHead style={{ backgroundColor: "#2d3748" }}>
                  <TableRow>
                    <TableCell></TableCell>
                    <TableCell
                      style={{
                        fontSize: "20px",
                        fontFamily: "Arial, sans-serif",
                        color: "white",
                      }}
                      align="center"
                    >
                      Full name
                    </TableCell>
                    <TableCell
                      style={{
                        fontSize: "20px",
                        fontFamily: "Arial, sans-serif",
                        color: "white",
                      }}
                      align="center"
                    >
                      Student code
                    </TableCell>
                    <TableCell
                      style={{
                        fontSize: "20px",
                        fontFamily: "Arial, sans-serif",
                        color: "white",
                      }}
                      align="center"
                    >
                      Gender
                    </TableCell>
                    <TableCell
                      style={{
                        fontSize: "20px",
                        fontFamily: "Arial, sans-serif",
                        color: "white",
                      }}
                      align="center"
                    >
                      Birthday
                    </TableCell>
                    <TableCell
                      style={{
                        fontSize: "20px",
                        fontFamily: "Arial, sans-serif",
                        color: "white",
                      }}
                      align="center"
                    >
                      Hometown
                    </TableCell>
                    <TableCell
                      style={{
                        fontSize: "20px",
                        fontFamily: "Arial, sans-serif",
                        color: "white",
                      }}
                      align="center"
                    >
                      Class
                    </TableCell>
                    <TableCell
                      style={{
                        fontSize: "20px",
                        fontFamily: "Arial, sans-serif",
                        color: "white",
                      }}
                      align="center"
                    >
                      Reserve module
                    </TableCell>
                    <TableCell
                      style={{
                        fontSize: "20px",
                        fontFamily: "Arial, sans-serif",
                        color: "white",
                      }}
                      align="center"
                    >
                      Reason
                    </TableCell>
                    <TableCell
                      style={{
                        fontSize: "20px",
                        fontFamily: "Arial, sans-serif",
                        color: "white",
                      }}
                      align="center"
                    >
                      Reserve time
                    </TableCell>
                    <TableCell
                      style={{
                        fontSize: "20px",
                        fontFamily: "Arial, sans-serif",
                        color: "white",
                      }}
                      align="center"
                    >
                      Status
                    </TableCell>
                    <TableCell
                      style={{
                        fontSize: "20px",
                        fontFamily: "Arial, sans-serif",
                        color: "white",
                      }}
                      align="center"
                    ></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {slicedUser.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell
                        style={{ fontSize: "13px" }}
                        align="center"
                      ></TableCell>
                      <TableCell style={{ fontSize: "13px" }} align="center">
                        {user.studentId}
                      </TableCell>
                      <TableCell style={{ fontSize: "13px" }} align="center">
                        {user.studentId}
                      </TableCell>
                      <TableCell style={{ fontSize: "13px" }} align="center">
                        {user.gender}
                      </TableCell>
                      <TableCell style={{ fontSize: "13px" }} align="center">
                        {new Date(user.dob).toLocaleDateString()}
                      </TableCell>
                      <TableCell style={{ fontSize: "13px" }} align="center">
                        {user.studentId}
                      </TableCell>
                      <TableCell style={{ fontSize: "13px" }} align="center">
                        {user.classId}
                      </TableCell>
                      <TableCell style={{ fontSize: "13px" }} align="center">
                        {user.module}
                      </TableCell>
                      <TableCell style={{ fontSize: "13px" }} align="center">
                        {user.reason}
                      </TableCell>
                      <TableCell style={{ fontSize: "13px" }} align="center">
                        {new Date(user.startDate).toLocaleDateString()} -{" "}
                        {new Date(user.endDate).toLocaleDateString()}
                      </TableCell>
                      <TableCell style={{ fontSize: "13px" }} align="center">
                        {user.status}
                      </TableCell>
                      <TableCell align="center">
                        <MoreHorizIcon onClick={handleMenuClick} />
                        <Menu
                          anchorEl={moreHorizAnchorEl}
                          open={Boolean(moreHorizAnchorEl)}
                          onClose={handleMenuClose}
                        >
                          <MenuItem>
                            <PanToolOutlinedIcon
                              style={{ marginRight: "8px" }}
                            />
                            Re-class
                          </MenuItem>
                          <MenuItem component={Link} to="/score-management">
                            <EmailOutlinedIcon style={{ marginRight: "8px" }} />
                            Remind
                          </MenuItem>
                          <MenuItem>
                            <StopCircleOutlinedIcon
                              style={{ marginRight: "8px" }}
                            />
                            Drop class
                          </MenuItem>
                          <MenuItem>
                            <CancelOutlinedIcon
                              style={{ marginRight: "8px" }}
                            />
                            Remove reserve
                          </MenuItem>
                        </Menu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={users.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </TableContainer>
          </div>
        </Box>
      </Box>
    </>
  );
};

export default Reserve;

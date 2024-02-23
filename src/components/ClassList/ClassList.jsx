import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import {
  Box,
  Button,
  InputAdornment,
  Menu,
  MenuItem,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import FilterListIcon from "@mui/icons-material/FilterList";
import AddCircleOutline from "@mui/icons-material/AddCircleOutline";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";

const ClassList = () => {
  const [users, setUsers] = useState([]);
  const [rowOfPage, setRowOfPage] = useState();
  const [page, setPage] = React.useState(0);
  const [searchItem, setSearchItem] = React.useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const [moreHorizAnchorEl, setMoreHorizAnchorEl] = useState(null);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangePageRow = (event) => {
    setRowOfPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    try {
      const response = await axios.get(
        "https://65b9c15fb71048505a8b1ebb.mockapi.io/class"
      );
      setUsers(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      // console.log("SliceUser:", SliceUser);
    }
  };

  // const SliceUser = filtered.slice(page * rowOfPage, (page + 1) * rowOfPage);
  const handleMenuClick = (event) => {
    setMoreHorizAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setMoreHorizAnchorEl(null);
  };
  return (
    <>
      <h1
        style={{
          fontSize: "25px",
          marginBottom: "20px",
          fontFamily: "Arial, sans-serif",
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
                      <InputAdornment>
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
                    marginTop: "10px",
                  }}
                >
                  <FilterListIcon />
                  Filter
                </Button>
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
                    <TableCell></TableCell>
                    <TableCell
                      style={{
                        fontSize: "20px",
                        fontFamily: "Arial, sans-serif",
                        color: "white",
                      }}
                    >
                      Class
                    </TableCell>
                    <TableCell
                      style={{
                        fontSize: "20px",
                        fontFamily: "Arial, sans-serif",
                        color: "white",
                      }}
                    >
                      Class Code
                    </TableCell>
                    <TableCell
                      style={{
                        fontSize: "20px",
                        fontFamily: "Arial, sans-serif",
                        color: "white",
                      }}
                    >
                      Create On
                    </TableCell>
                    <TableCell
                      style={{
                        fontSize: "20px",
                        fontFamily: "Arial, sans-serif",
                        color: "white",
                      }}
                    >
                      Create By
                    </TableCell>
                    <TableCell
                      style={{
                        fontSize: "20px",
                        fontFamily: "Arial, sans-serif",
                        color: "white",
                      }}
                    >
                      Duration
                    </TableCell>
                    <TableCell
                      style={{
                        fontSize: "20px",
                        fontFamily: "Arial, sans-serif",
                        color: "white",
                      }}
                    >
                      Attendee
                    </TableCell>
                    <TableCell
                      style={{
                        fontSize: "20px",
                        fontFamily: "Arial, sans-serif",
                        color: "white",
                      }}
                    >
                      Location
                    </TableCell>
                    <TableCell
                      style={{
                        fontSize: "20px",
                        fontFamily: "Arial, sans-serif",
                        color: "white",
                      }}
                    >
                      FSU
                    </TableCell>
                    <TableCell></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {users.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell style={{ fontSize: "15px" }} align="center">
                        {user.class}
                      </TableCell>
                      <TableCell style={{ fontSize: "15px" }} align="center">
                        {user.class_code}
                      </TableCell>
                      <TableCell style={{ fontSize: "15px" }} align="center">
                        {user.created_on}
                      </TableCell>
                      <TableCell style={{ fontSize: "15px" }} align="center">
                        {user.created_by}
                      </TableCell>
                      <TableCell style={{ fontSize: "15px" }} align="center">
                        {user.duration}
                      </TableCell>
                      <TableCell style={{ fontSize: "15px" }} align="center">
                        {user.attendee}
                      </TableCell>
                      <TableCell style={{ fontSize: "15px" }} align="center">
                        {user.location}
                      </TableCell>
                      <TableCell style={{ fontSize: "15px" }} align="center">
                        {user.fsu}
                      </TableCell>
                      <TableCell align="center">
                        <MoreHorizIcon onClick={handleMenuClick} />
                        <Menu
                          anchorEl={moreHorizAnchorEl}
                          open={Boolean(moreHorizAnchorEl)}
                          onClose={handleMenuClose}
                        >
                          <MenuItem
                            component={Link}
                            to={{
                              pathname: "/student-list",
                              state: { classData: user },
                            }}
                            onClick={handleMenuClose}
                          >
                            View Student List
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
                rowsPerPage={rowOfPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangePageRow}
              />
            </TableContainer>
          </div>
        </Box>
      </Box>
    </>
  );
};

export default ClassList;

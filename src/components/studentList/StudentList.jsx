import React, { useEffect, useState } from "react";
import axios from "axios";
import * as XLSX from "xlsx";
import { Link } from "react-router-dom";
import "./StudentList.scss";

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
  Checkbox,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import FilterListIcon from "@mui/icons-material/FilterList";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import DownloadIcon from "@mui/icons-material/Download";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import SettingsIcon from "@mui/icons-material/Settings";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import ImportContactsIcon from "@mui/icons-material/ImportContacts";
import AddUser from "./AddUser";

const StudentList = () => {
  const [users, setUsers] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [moreHorizAnchorEl, setMoreHorizAnchorEl] = useState(null);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [page, setPage] = React.useState(0);
  const [searchTerm, setSearchTerm] = React.useState("");
  const [checked, setChecked] = useState({});
  const [selectedOption, setSelectedOption] = useState("fullName");
  const [deleteConfirmation, setDeleteConfirmation] = useState(null);
  const [showForm, setShowForm] = useState(false);
  //1 state lưu các giá trị status checkbox
  const [selectedStatus, setSelectedStatus] = useState({});
  //popup when different status
  const [showDifferentStatusDialog, setShowDifferentStatusDialog] =
    useState(false);
  //pop-up when edit status
  const [showEditStatusDialog, setShowEditStatusDialog] = useState(false);

  const handleButtonClick = () => {
    setShowForm(true);
  };

  const handleFormClose = () => {
    setShowForm(false);
  };
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleCheck = (event) => {
    const studentId = event.target.name;
    const isChecked = event.target.checked;

    // Xóa phần tử khỏi selectedStatus nếu checkbox bị hủy chọn
    if (!isChecked) {
      const updatedStatus = { ...selectedStatus };
      delete updatedStatus[studentId];
      setSelectedStatus(updatedStatus);
    } else {
      setSelectedStatus((prevStatus) => ({
        ...prevStatus,
        [studentId]: users.find((user) => user.id === studentId)?.status || "",
      }));
    }

    // Cập nhật checked state
    setChecked({ ...checked, [studentId]: isChecked });
  };
  console.log(selectedStatus);
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
        "https://6535e093c620ba9358ecba91.mockapi.io/student"
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

  const openDeleteConfirmation = (userId) => {
    setDeleteConfirmation(userId);
  };

  const closeDeleteConfirmation = () => {
    setDeleteConfirmation(null);
  };
  const cancelDialogEditStatus = () => {
    setShowEditStatusDialog(false);
  };

  const handleDelete = async () => {
    try {
      await axios.delete(
        `https://6535e093c620ba9358ecba91.mockapi.io/student/${deleteConfirmation}`
      );
      closeDeleteConfirmation();
      fetchUsers();
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const exportToExcel = () => {
    const selectedRows = users.filter((user) => checked[user.id]);

    const dataToExport = selectedRows.map((user) => ({
      id: user.id,
      "Full name": user.fullName,
      "Date of birth": user.dateOfBirth,
      Email: user.Email,
      Phone: user.Phone,
      GPA: user.gpa,
      RECer: user.reCer,
      address: user.address,
      classCode: user.classCode,
      gender: user.gender,
      graduatedDate: user.graduatedDate,
      joinedDate: user.joinedDate,
      major: user.major,
      university: user.university,
      status: user.status,
    }));

    const ws = XLSX.utils.json_to_sheet(dataToExport);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Student Data");
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const fileName = "student_data.xlsx";
    const blob = new Blob([excelBuffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", fileName);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
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

  const updateStatus = () => {
    const selectedCount = Object.values(checked).filter(
      (value) => value
    ).length;

    if (selectedCount > 0) {
      const uniqueStatuses = [...new Set(Object.values(selectedStatus))];

      if (uniqueStatuses.length === 1) {
        // Open the edit status dialog
        setShowEditStatusDialog(true);
      } else {
        // Hiển thị Dialog thông báo lỗi
        setShowDifferentStatusDialog(true);
      }
    } else {
      // Hiển thị Dialog thông báo nếu không có sinh viên nào được chọn
      alert("Vui lòng chọn ít nhất một sinh viên để chỉnh sửa trạng thái");
    }
  };
  const disableEditButton = Object.values(checked).filter(
    (value) => value
  ).length;

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
        Student List
      </h2>
      <Box sx={{ display: "flex" }}>
        <Box component="main" sx={{ flexGrow: 1, p: 5 }}>
          <div className="main">
            <TableContainer component={Paper} className="dashboard-container">
              <div className="header-list">
                <TextField
                  label="Search by"
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
                    <MenuItem value={"id"}>ID</MenuItem>

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
                  onClick={handleButtonClick}
                >
                  <AddCircleOutlineIcon style={{ marginRight: "10px" }} />
                  Add new
                </Button>
                {showForm && <AddUser onFormClose={handleFormClose} />}
                <Button
                  variant="contained"
                  style={{
                    float: "right",
                    backgroundColor: "#d45b13",
                    padding: "10px",
                    marginRight: "10px",
                    marginTop: "10px",
                  }}
                  onClick={exportToExcel}
                >
                  <DownloadIcon />
                  Export
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
                      Date of birth
                    </TableCell>
                    <TableCell
                      style={{
                        fontSize: "20px",
                        fontFamily: "Arial, sans-serif",
                        color: "white",
                      }}
                      align="center"
                    >
                      Email
                    </TableCell>
                    <TableCell
                      style={{
                        fontSize: "20px",
                        fontFamily: "Arial, sans-serif",
                        color: "white",
                      }}
                      align="center"
                    >
                      Phone
                    </TableCell>
                    <TableCell
                      style={{
                        fontSize: "20px",
                        fontFamily: "Arial, sans-serif",
                        color: "white",
                      }}
                      align="center"
                    >
                      GPA
                    </TableCell>
                    <TableCell
                      style={{
                        fontSize: "20px",
                        fontFamily: "Arial, sans-serif",
                        color: "white",
                      }}
                      align="center"
                    >
                      STATUS
                    </TableCell>
                    <TableCell
                      style={{
                        fontSize: "20px",
                        fontFamily: "Arial, sans-serif",
                        color: "white",
                      }}
                      align="center"
                    >
                      <SettingsIcon />
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {slicedUser.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell style={{ fontSize: "13px" }} align="center">
                        <Checkbox
                          checked={checked[user.id] || false}
                          onChange={handleCheck}
                          name={user.id.toString()}
                        />
                      </TableCell>
                      <TableCell style={{ fontSize: "13px" }} align="center">
                        <Link
                          style={{ color: "black" }}
                          to={`/student-detail/${user.id}`}
                        >
                          {user.fullName}
                        </Link>
                      </TableCell>
                      <TableCell style={{ fontSize: "13px" }} align="center">
                        {user.dateOfBirth}
                      </TableCell>
                      <TableCell style={{ fontSize: "13px" }} align="center">
                        {user.Email}
                      </TableCell>
                      <TableCell style={{ fontSize: "13px" }} align="center">
                        {user.Phone}
                      </TableCell>
                      <TableCell style={{ fontSize: "13px" }} align="center">
                        {user.gpa}
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
                          <MenuItem
                            component={Link}
                            to={`/student-detail/${user.id}/edit`}
                          >
                            <EditIcon style={{ marginRight: "8px" }} />
                            Edit Student
                          </MenuItem>
                          <MenuItem
                            onClick={() => openDeleteConfirmation(user.id)}
                          >
                            <DeleteForeverIcon style={{ marginRight: "8px" }} />
                            Delete Student
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
            {disableEditButton === 0 ? (
              <Button
                className="edit-button-disabled"
                variant="contained"
                onClick={updateStatus}
                disabled={disableEditButton === 0}
              >
                ✎ Update status student
              </Button>
            ) : (
              <Button
                className="edit-button"
                variant="contained"
                style={{ float: "right" }}
                onClick={updateStatus}
              >
                ✎ Update status student
              </Button>
            )}
          </div>
        </Box>
      </Box>
      {/* Dialog for Edit status when same states */}
      <Dialog
        style={{ padding: "3rem" }}
        open={Boolean(showEditStatusDialog)}
        onClose={() => setShowEditStatusDialog(false)}
      >
        <DialogTitle className="student-status-edit--title-update">
          Update Status
        </DialogTitle>

        <DialogContent>
          <hr />
          <DialogContentText className="student-status-edit--notification">
            Are you to update status {Object.keys(selectedStatus).length}{" "}
            students?
          </DialogContentText>

          <DialogContent className="student-status-edit--new-status-se">
            <DialogContentText className="student-status-edit--new-status-title">
              New Status:
            </DialogContentText>
            <Select className="student-status-edit--new-status-select">
              <MenuItem value={"Inactive"}>Inactive</MenuItem>
              <MenuItem value={"Off"}>Off</MenuItem>
              <MenuItem value={"Keep-Class"}>Keep Class</MenuItem>
            </Select>
          </DialogContent>
        </DialogContent>
        <DialogActions>
          <Button
            style={{ color: "red" }}
            onClick={cancelDialogEditStatus}
            className="student-status-edit--btn-action-cancel"
          >
            Cancel
          </Button>
          <Button
            onClick={cancelDialogEditStatus}
            className="student-status-edit--btn-action-save"
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>

      {/* Dialog for Edit status when different states */}
      <Dialog
        open={showDifferentStatusDialog}
        onClose={() => setShowDifferentStatusDialog(false)}
      >
        <DialogTitle>Different Status</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please select students with the same attending status.
          </DialogContentText>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={Boolean(deleteConfirmation)}
        onClose={closeDeleteConfirmation}
      >
        <DialogTitle>Delete Confirmation</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this student?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDeleteConfirmation}>Cancel</Button>
          <Button onClick={handleDelete} color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default StudentList;

import React, { useEffect, useState } from "react";
import axios from "axios";
import * as XLSX from "xlsx";
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
import { Link } from "react-router-dom";

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
        setChecked({ ...checked, [event.target.name]: event.target.checked });
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
            const response = await axios.get("https://6535e093c620ba9358ecba91.mockapi.io/student");
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

    const handleDelete = async () => {
        try {
            await axios.delete(`https://6535e093c620ba9358ecba91.mockapi.io/student/${deleteConfirmation}`);
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

    const slicedUser = filteredStatus.slice(page * rowsPerPage, (page + 1) * rowsPerPage);

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
                            <Table sx={{ minWidth: 650 }} aria-label="simple table" className="staff-table">
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
                                            RECer
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
                                                {user.fullName}
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
                                                {user.reCer}
                                            </TableCell>
                                            <TableCell align="center">
                                                <MoreHorizIcon onClick={handleMenuClick} />
                                                <Menu
                                                    anchorEl={moreHorizAnchorEl}
                                                    open={Boolean(moreHorizAnchorEl)}
                                                    onClose={handleMenuClose}
                                                >
                                                    <MenuItem>
                                                        <EditIcon style={{ marginRight: "8px" }} />
                                                        Edit Student
                                                    </MenuItem>
                                                    <MenuItem component={Link} to="/score-management">
                                                         <ImportContactsIcon
                                                             style={{ marginRight: "8px" }}
                                                 />
                                                                Score Management
                                                    </MenuItem>
                                                    <MenuItem onClick={() => openDeleteConfirmation(user.id)}>
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
                    </div>
                </Box>
            </Box>

            {/* Delete Confirmation Dialog */}
            <Dialog open={Boolean(deleteConfirmation)} onClose={closeDeleteConfirmation}>
                <DialogTitle>Delete Confirmation</DialogTitle>
                <DialogContent>
                    <DialogContentText>Are you sure you want to delete this student?</DialogContentText>
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

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
  Select,
  Popover,
  Button,
  Menu,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Badge,
} from "@mui/material";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

const ScoreManagement = () => {
  const [students, setStudents] = useState([]);
  const [student, setStudent] = useState({});
  const [anchorEl, setAnchorEl] = useState(null);
  const [moreHorizAnchorEl, setMoreHorizAnchorEl] = useState(null);
  const [rowsPerPage, setRowsPerPage] = React.useState(8);
  const [page, setPage] = React.useState(0);
  const [searchTerm, setSearchTerm] = React.useState("");
  const [checked, setChecked] = useState({});
  const [selectedOption, setSelectedOption] = useState("fullName");
  const [deleteConfirmation, setDeleteConfirmation] = useState(null);

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
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const response = await axios.get(
        "https://65d33fc8522627d5010867f8.mockapi.io/student"
      );
      const studentData = Array.isArray(response.data) ? response.data : [];
      setStudents(studentData);
      if (studentData.length > 0) {
        setStudent(studentData[0]);
      }
    } catch (err) {
      setStudents([]);
    }
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const openDeleteConfirmation = (studentId) => {
    setDeleteConfirmation(studentId);
  };

  const closeDeleteConfirmation = () => {
    setDeleteConfirmation(null);
  };

  const handleDelete = async () => {
    try {
      await axios.delete(
        `https://6535e093c620ba9358ecba91.mockapi.io/student/${deleteConfirmation}`
      );
      closeDeleteConfirmation();
      fetchStudents();
    } catch (error) {
      console.error("Error deleting student:", error);
    }
  };

  const calculateModuleScoreQuiz = (quizAVG) => {
    const { quizHTML, quizCSS, quiz3, quiz4, quiz5, quiz6 } = quizAVG;
    const sum = quizHTML + quizCSS + quiz3 + quiz4 + quiz5 + quiz6;
    return sum / 6;
  };

  const calculateModuleScoreASM = (asmAVG) => {
    const { Practice1, Practice2, Practice3 } = asmAVG;
    const sum = Practice1 + Practice2 + Practice3;
    return sum / 3;
  };

  const calculateFirstGPA = (firstGPA) => {
    const { quizFinal, audit, PracticeFinal, Finalmodule1 } = firstGPA;
    const sum = quizFinal + audit + PracticeFinal + Finalmodule1;
    return sum / 4;
  };

  const calculateFirstGPAStatus = (firstGPA) => {
    const { quizFinal, audit, PracticeFinal, Finalmodule1 } = firstGPA;
    const sum = quizFinal + audit + PracticeFinal + Finalmodule1;
    const average = sum / 4;
    return average >= 5 ? "PASSED" : "FAILED";
  };

  const calculateFirstGPAtoGrade = (firstGPA) => {
    const { quizFinal, audit, PracticeFinal, Finalmodule1 } = firstGPA;
    const sum = quizFinal + audit + PracticeFinal + Finalmodule1;
    const average = sum / 4;
    if (average >= 9) {
      return "A";
    } else if (average >= 7) {
      return "B";
    } else if (average >= 5) {
      return "C";
    } else {
      return "D";
    }
  };

  const calculateSecondGPA = (secondGPA) => {
    const { MOCK, Finalmodule2 } = secondGPA;
    const sum = MOCK + Finalmodule2;
    return sum / 2;
  };

  const calculateSecondGPAStatus = (secondGPA) => {
    const { MOCK, Finalmodule2 } = secondGPA;
    const sum = MOCK + Finalmodule2;
    const average = sum / 2;
    return average >= 5 ? "PASSED" : "FAILED";
  };

  const calculateSecondGPAtoGrade = (secondGPA) => {
    const { MOCK, Finalmodule2 } = secondGPA;
    const sum = MOCK + Finalmodule2;
    const average = sum / 2;
    if (average >= 9) {
      return "A";
    } else if (average >= 7) {
      return "B";
    } else if (average >= 5) {
      return "C";
    } else {
      return "D";
    }
  };

  const filteredStudents = students.filter((student) => {
    if (
      searchTerm &&
      student[selectedOption] &&
      !student[selectedOption].toLowerCase().includes(searchTerm.toLowerCase())
    ) {
      return false;
    }
    return true;
  });

  const slicedStudents = filteredStudents.slice(
    page * rowsPerPage,
    (page + 1) * rowsPerPage
  );

  return (
    <div>
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <h2
          style={{
            fontSize: "30px",
            marginBottom: "20px",
            fontFamily: "Arial, sans-serif",
            fontWeight: "bold",
            backgroundColor: "#2d3748",
            color: "white",
            padding: "30px",
            marginTop: "1px",
            boxSizing: "border-box",
            display: "block",
          }}
        >
          {student.className}
        </h2>

        <Box sx={{ display: "flex", flexGrow: 1, overflowX: "auto" }}>
          <TableContainer component={Paper} className="dashboard-container">
            <div className="header-list">
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
                  <MenuItem value={"fullName"}>Full Name</MenuItem>
                  <MenuItem value={"account"}>Account</MenuItem>
                </Select>
              </Popover>
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
                      whiteSpace: "nowrap",
                      paddingLeft: "100px",
                    }}
                    align="center"
                    colSpan={1}
                  >
                    ID
                  </TableCell>
                  <TableCell
                    style={{
                      fontSize: "20px",
                      fontFamily: "Arial, sans-serif",
                      color: "white",
                      whiteSpace: "nowrap",
                    }}
                    align="center"
                    colSpan={1}
                  >
                    Full name
                  </TableCell>
                  <TableCell
                    style={{
                      fontSize: "20px",
                      fontFamily: "Arial, sans-serif",
                      color: "white",
                      whiteSpace: "nowrap",
                    }}
                    align="center"
                    colSpan={1}
                  >
                    Account
                  </TableCell>
                  <TableCell
                    style={{
                      fontSize: "20px",
                      fontFamily: "Arial, sans-serif",
                      color: "white",
                      whiteSpace: "nowrap",
                    }}
                    align="center"
                    colSpan={1}
                  >
                    Email
                  </TableCell>
                  <TableCell style={{ borderRight: "2px solid red" }}>
                    {" "}
                  </TableCell>
                  <TableCell
                    style={{
                      fontSize: "20px",
                      fontFamily: "Arial, sans-serif",
                      color: "white",
                      whiteSpace: "nowrap",
                    }}
                    align="center"
                    colSpan={7}
                  >
                    Quiz
                  </TableCell>
                  <TableCell style={{ borderRight: "2px solid red" }}>
                    {" "}
                  </TableCell>
                  <TableCell
                    style={{
                      fontSize: "20px",
                      fontFamily: "Arial, sans-serif",
                      color: "white",
                      whiteSpace: "nowrap",
                    }}
                    align="center"
                    colSpan={4}
                  >
                    ASM
                  </TableCell>
                  <TableCell style={{ borderRight: "2px solid red" }}>
                    {" "}
                  </TableCell>
                  <TableCell
                    style={{
                      fontSize: "20px",
                      fontFamily: "Arial, sans-serif",
                      color: "white",
                      whiteSpace: "nowrap",
                    }}
                    align="center"
                    colSpan={1}
                  >
                    Quiz Final
                  </TableCell>
                  <TableCell
                    style={{
                      fontSize: "20px",
                      fontFamily: "Arial, sans-serif",
                      color: "white",
                      whiteSpace: "nowrap",
                    }}
                    align="center"
                    colSpan={1}
                  >
                    Audit
                  </TableCell>
                  <TableCell
                    style={{
                      fontSize: "20px",
                      fontFamily: "Arial, sans-serif",
                      color: "white",
                      whiteSpace: "nowrap",
                    }}
                    align="center"
                    colSpan={1}
                  >
                    Practice Final
                  </TableCell>
                  <TableCell
                    style={{
                      fontSize: "20px",
                      fontFamily: "Arial, sans-serif",
                      color: "white",
                      whiteSpace: "nowrap",
                    }}
                    align="center"
                    colSpan={1}
                  >
                    Final Module
                  </TableCell>
                  <TableCell
                    style={{
                      fontSize: "20px",
                      fontFamily: "Arial, sans-serif",
                      color: "white",
                      whiteSpace: "nowrap",
                    }}
                    align="center"
                    colSpan={1}
                  >
                    GPA module
                  </TableCell>
                  <TableCell
                    style={{
                      fontSize: "20px",
                      fontFamily: "Arial, sans-serif",
                      color: "white",
                      whiteSpace: "nowrap",
                    }}
                    align="center"
                    colSpan={1}
                  >
                    Level module
                  </TableCell>
                  <TableCell
                    style={{
                      fontSize: "20px",
                      fontFamily: "Arial, sans-serif",
                      color: "white",
                      whiteSpace: "nowrap",
                    }}
                    align="center"
                    colSpan={1}
                  >
                    Status
                  </TableCell>
                  <TableCell style={{ borderRight: "2px solid red" }}>
                    {" "}
                  </TableCell>
                  <TableCell
                    style={{
                      fontSize: "20px",
                      fontFamily: "Arial, sans-serif",
                      color: "white",
                      whiteSpace: "nowrap",
                    }}
                    align="center"
                    colSpan={1}
                  >
                    MOCK
                  </TableCell>
                  <TableCell
                    style={{
                      fontSize: "20px",
                      fontFamily: "Arial, sans-serif",
                      color: "white",
                      whiteSpace: "nowrap",
                    }}
                    align="center"
                    colSpan={1}
                  >
                    Final module
                  </TableCell>
                  <TableCell
                    style={{
                      fontSize: "20px",
                      fontFamily: "Arial, sans-serif",
                      color: "white",
                      whiteSpace: "nowrap",
                    }}
                    align="center"
                    colSpan={1}
                  >
                    GPA module
                  </TableCell>
                  <TableCell
                    style={{
                      fontSize: "20px",
                      fontFamily: "Arial, sans-serif",
                      color: "white",
                      whiteSpace: "nowrap",
                    }}
                    align="center"
                    colSpan={1}
                  >
                    Level module
                  </TableCell>
                  <TableCell
                    style={{
                      fontSize: "20px",
                      fontFamily: "Arial, sans-serif",
                      color: "white",
                      whiteSpace: "nowrap",
                    }}
                    align="center"
                    colSpan={1}
                  >
                    Status
                  </TableCell>
                  <TableCell></TableCell>
                </TableRow>
                <TableRow style={{ backgroundColor: "#536878" }}>
                  <TableCell> </TableCell>
                  <TableCell> </TableCell>
                  <TableCell> </TableCell>
                  <TableCell> </TableCell>
                  <TableCell style={{ borderRight: "2px solid red" }}>
                    {" "}
                  </TableCell>
                  <TableCell style={{ whiteSpace: "nowrap", color: "white" }}>
                    HTML
                  </TableCell>
                  <TableCell style={{ whiteSpace: "nowrap", color: "white" }}>
                    CSS
                  </TableCell>
                  <TableCell style={{ whiteSpace: "nowrap", color: "white" }}>
                    Quiz 3
                  </TableCell>
                  <TableCell style={{ whiteSpace: "nowrap", color: "white" }}>
                    Quiz 4
                  </TableCell>
                  <TableCell style={{ whiteSpace: "nowrap", color: "white" }}>
                    Quiz 5
                  </TableCell>
                  <TableCell style={{ whiteSpace: "nowrap", color: "white" }}>
                    Quiz 6
                  </TableCell>
                  <TableCell style={{ whiteSpace: "nowrap", color: "white" }}>
                    AVG
                  </TableCell>
                  <TableCell
                    style={{ borderRight: "2px solid red", position: "" }}
                  >
                    {" "}
                  </TableCell>
                  <TableCell style={{ whiteSpace: "nowrap", color: "white" }}>
                    Practice 1
                  </TableCell>
                  <TableCell style={{ whiteSpace: "nowrap", color: "white" }}>
                    Practice 2
                  </TableCell>
                  <TableCell style={{ whiteSpace: "nowrap", color: "white" }}>
                    Practice 3
                  </TableCell>
                  <TableCell style={{ whiteSpace: "nowrap", color: "white" }}>
                    AVG
                  </TableCell>
                  <TableCell style={{ borderRight: "2px solid red" }}>
                    {" "}
                  </TableCell>
                  <TableCell> </TableCell>
                  <TableCell> </TableCell>
                  <TableCell> </TableCell>
                  <TableCell> </TableCell>
                  <TableCell> </TableCell>
                  <TableCell> </TableCell>
                  <TableCell> </TableCell>
                  <TableCell style={{ borderRight: "2px solid red" }}>
                    {" "}
                  </TableCell>
                  <TableCell> </TableCell>
                  <TableCell> </TableCell>
                  <TableCell> </TableCell>
                  <TableCell> </TableCell>
                  <TableCell> </TableCell>
                  <TableCell> </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {slicedStudents.map((student) => (
                  <TableRow key={student.id}>
                    <TableCell
                      style={{ fontSize: "13px", paddingLeft: "100px" }}
                      align="center"
                    >
                      {student.studentId}
                    </TableCell>
                    <TableCell style={{ fontSize: "13px" }} align="center">
                      {student.studentName}
                    </TableCell>
                    <TableCell style={{ fontSize: "13px" }} align="center">
                      {student.account}
                    </TableCell>
                    <TableCell style={{ fontSize: "13px" }} align="center">
                      {student.studentEmail}
                    </TableCell>
                    <TableCell
                      style={{ fontSize: "13px", borderRight: "2px solid red" }}
                    >
                      {" "}
                    </TableCell>
                    <TableCell style={{ fontSize: "13px" }} align="center">
                      {student.quizHTML}
                    </TableCell>
                    <TableCell style={{ fontSize: "13px" }} align="center">
                      {student.quizCSS}
                    </TableCell>
                    <TableCell style={{ fontSize: "13px" }} align="center">
                      {student.quiz3}
                    </TableCell>
                    <TableCell style={{ fontSize: "13px" }} align="center">
                      {student.quiz4}
                    </TableCell>
                    <TableCell style={{ fontSize: "13px" }} align="center">
                      {student.quiz5}
                    </TableCell>
                    <TableCell style={{ fontSize: "13px" }} align="center">
                      {student.quiz6}
                    </TableCell>
                    <TableCell style={{ fontSize: "13px" }} align="center">
                      {calculateModuleScoreQuiz(student).toFixed(2)}
                    </TableCell>
                    <TableCell style={{ borderRight: "2px solid red" }}>
                      {" "}
                    </TableCell>
                    <TableCell style={{ fontSize: "13px" }} align="center">
                      {student.Practice1}
                    </TableCell>
                    <TableCell style={{ fontSize: "13px" }} align="center">
                      {student.Practice2}
                    </TableCell>
                    <TableCell style={{ fontSize: "13px" }} align="center">
                      {student.Practice3}
                    </TableCell>
                    <TableCell style={{ fontSize: "13px" }} align="center">
                      {calculateModuleScoreASM(student).toFixed(2)}
                    </TableCell>
                    <TableCell style={{ borderRight: "2px solid red" }}>
                      {" "}
                    </TableCell>
                    <TableCell style={{ fontSize: "13px" }} align="center">
                      {student.quizFinal}
                    </TableCell>
                    <TableCell style={{ fontSize: "13px" }} align="center">
                      {student.audit}
                    </TableCell>
                    <TableCell style={{ fontSize: "13px" }} align="center">
                      {student.PracticeFinal}
                    </TableCell>
                    <TableCell style={{ fontSize: "13px" }} align="center">
                      {student.Finalmodule1}
                    </TableCell>
                    <TableCell style={{ fontSize: "13px" }} align="center">
                      {calculateFirstGPA(student).toFixed(2)}
                    </TableCell>
                    <TableCell style={{ fontSize: "13px" }} align="center">
                      {calculateFirstGPAtoGrade(student)}
                    </TableCell>
                    <TableCell>
                      <Badge
                        style={{ paddingLeft: "30px" }}
                        variant="filled"
                        color={
                          calculateFirstGPAStatus(student) === "PASSED"
                            ? "success"
                            : "error"
                        }
                        badgeContent={calculateFirstGPAStatus(student)}
                      />
                    </TableCell>
                    <TableCell style={{ borderRight: "2px solid red" }}>
                      {" "}
                    </TableCell>
                    <TableCell style={{ fontSize: "13px" }} align="center">
                      {student.MOCK}
                    </TableCell>
                    <TableCell style={{ fontSize: "13px" }} align="center">
                      {student.Finalmodule2}
                    </TableCell>
                    <TableCell style={{ fontSize: "13px" }} align="center">
                      {calculateSecondGPA(student).toFixed(2)}
                    </TableCell>
                    <TableCell style={{ fontSize: "13px" }} align="center">
                      {calculateSecondGPAtoGrade(student)}
                    </TableCell>
                    <TableCell>
                      <Badge
                        style={{ paddingLeft: "30px" }}
                        variant="filled"
                        color={
                          calculateSecondGPAStatus(student) === "PASSED"
                            ? "success"
                            : "error"
                        }
                        badgeContent={calculateSecondGPAStatus(student)}
                      />
                    </TableCell>

                    <TableCell align="center">
                      <MoreHorizIcon onClick={handleMenuClick} />
                      <Menu
                        anchorEl={moreHorizAnchorEl}
                        open={Boolean(moreHorizAnchorEl)}
                        onClose={handleMenuClose}
                      >
                        <MenuItem>
                          <DeleteForeverIcon style={{ marginRight: "8px" }} />
                          Delete Score
                        </MenuItem>
                        <MenuItem>Final Studying Result</MenuItem>
                      </Menu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            <TablePagination
              rowsPerPageOptions={[8, 15, 30]}
              component="div"
              count={students.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </TableContainer>
        </Box>
      </Box>
      <Dialog
        open={Boolean(deleteConfirmation)}
        onClose={closeDeleteConfirmation}
      >
        <DialogTitle>Delete Confirmation</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this student's score?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDeleteConfirmation}>Cancel</Button>
          <Button onClick={handleDelete} color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ScoreManagement;

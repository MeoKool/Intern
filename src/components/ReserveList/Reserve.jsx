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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Alert,
} from "@mui/material";

import "../ReserveList/reservelist.css";
import WarningIcon from "@mui/icons-material/Warning";
import SearchIcon from "@mui/icons-material/Search";
import FilterListIcon from "@mui/icons-material/FilterList";
import PublishIcon from "@mui/icons-material/Publish";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import StopCircleOutlinedIcon from "@mui/icons-material/StopCircleOutlined";
import PanToolOutlinedIcon from "@mui/icons-material/PanToolOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import ReservationAdd from "../ReservationAdd/ReservationAdd";
import SendReserveMail from "./SendReserveMail/email-send/SendReserveMail";
import { formatDate } from "../../utils/Date";
import { DropOutStudent } from "../../api/APIConfigure";
import { showErrorAlertModal, showSuccessModal } from "../../utils/Message";

const Reserve = () => {
  const [users, setUsers] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [moreHorizAnchorEl, setMoreHorizAnchorEl] = useState(null);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [page, setPage] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedOption, setSelectedOption] = useState("fullName");
  const [selectedUser, setSelectedUser] = useState(null);
  const [fetReveses, setFetReveses] = useState([]);
  const [confirmRemindOpen, setConfirmRemindOpen] = useState(false);
  const [confirmationOpen, setConfirmationOpen] = useState(false);
  setConfirmationOpen;
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const [sendReserveMailUser, setSendReserveMailUser] = useState(null);

  const handleSendReserveMailClose = () => {
    setMoreHorizAnchorEl(null);
    setSendReserveMailUser(null);
  };

  const handleMenuClick = (event, user) => {
    setMoreHorizAnchorEl(event.currentTarget);
    setSelectedUser(user);
    console.log(user, "usersdfssdfdf");
    handlefetReveses(user.id);
  };

  const handleMenuClose = async (action) => {
    setMoreHorizAnchorEl(null);

    console.log(selectedUser);

    if (selectedUser) {
      if (action == "remind") setConfirmRemindOpen(true);
      if (action == "drop")
        DropOutStudent(selectedUser.classCode, selectedUser.id)
          .then(() => showSuccessModal("Drop out successfully"))
          .catch(() => showErrorAlertModal());
    }
  };

  const handleConfirmationClose = async (confirmed) => {
    setConfirmationOpen(false);
    if (confirmed) {
      try {
        await axios.delete(
          `https://6535e093c620ba9358ecba91.mockapi.io/Resrver/${selectedUser.id}`
        );
        const updatedUsers = users.filter(
          (user) => user.id !== selectedUser.id
        );
        setUsers(updatedUsers);
      } catch (error) {
        console.error("Error removing reserve:", error);
      }
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);
  const fetchUsers = async () => {
    try {
      const response = await axios.get(
        "https://fams-net05-02.somee.com/api/reservation",
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      setUsers(response.data.items);
    } catch (error) {
      console.error("Error fetching data:", error);
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
  const handlefetReveses = (id) => {
    axios
      .get(`http://fams-net05-02.somee.com/api/reservation/${id}`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((response) => {
        setFetReveses(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  console.log(fetReveses, "fetReveses");
  const ReserveMenu = ({ user }) => {
    return (
      <>
        <Menu
          anchorEl={moreHorizAnchorEl}
          open={Boolean(moreHorizAnchorEl)}
          onClose={handleMenuClose}
        >
          <MenuItem>
            <PanToolOutlinedIcon style={{ marginRight: "8px" }} />
            Re-class
          </MenuItem>
          <MenuItem
            sx={{ width: "100%" }}
            onClick={() => {
              handleMenuClose("remind");
            }}
          >
            <EmailOutlinedIcon style={{ marginRight: "8px" }} />
            Remind
          </MenuItem>
          <MenuItem onClick={() => handleMenuClose("drop")}>
            <StopCircleOutlinedIcon style={{ marginRight: "8px" }} />
            Drop class
          </MenuItem>
          <MenuItem
            onClick={() => {
              setSendReserveMailUser(user);
              setMoreHorizAnchorEl(null);
            }}
          >
            <EmailOutlinedIcon style={{ marginRight: "8px" }} />
            Send reserve mail
          </MenuItem>
        </Menu>
      </>
    );
  };

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
                <ReservationAdd />
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
                        {user.fullName}
                      </TableCell>
                      <TableCell style={{ fontSize: "13px" }} align="center">
                        {user.reservation.studentId}
                      </TableCell>
                      <TableCell style={{ fontSize: "13px" }} align="center">
                        {user.gender}
                      </TableCell>
                      <TableCell style={{ fontSize: "13px" }} align="center">
                        {formatDate(new Date(user.dob))}
                      </TableCell>
                      <TableCell style={{ fontSize: "13px" }} align="center">
                        {user.address}
                      </TableCell>
                      <TableCell style={{ fontSize: "13px" }} align="center">
                        {user.classCode}
                      </TableCell>
                      <TableCell style={{ fontSize: "13px" }} align="center">
                        {user.reservation.reservedModule.moduleName}
                      </TableCell>
                      <TableCell style={{ fontSize: "13px" }} align="center">
                        {user.reservation.reason}
                      </TableCell>
                      <TableCell style={{ fontSize: "13px" }} align="center">
                        {formatDate(new Date(user.reservation.startDate))} -{" "}
                        {new Date(
                          user.reservation.endDate
                        ).toLocaleDateString()}
                      </TableCell>
                      <TableCell style={{ fontSize: "13px" }} align="center">
                        {user.status}
                      </TableCell>
                      <TableCell align="center">
                        <MoreHorizIcon
                          onClick={(event) => handleMenuClick(event, user)}
                        />
                        <ReserveMenu user={user} />
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
      <Dialog
        open={confirmationOpen}
        onClose={() => handleConfirmationClose(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle style={{ color: "blue" }}>
          <Alert icon={<WarningIcon />} severity="error">
            Caution
          </Alert>
        </DialogTitle>
        <DialogContent>
          <DialogContentText
            style={{ color: "black" }}
            id="alert-dialog-description"
          >
            Do you really want to do this action?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            style={{ color: "red", textDecorationLine: "underline" }}
            onClick={() => handleConfirmationClose(false)}
            color="primary"
          >
            Cancel
          </Button>
          <Button
            style={{ backgroundColor: "#2d3748", color: "white" }}
            onClick={() => handleConfirmationClose(true)}
            color="primary"
            autoFocus
          >
            OK
          </Button>
        </DialogActions>
      </Dialog>

      <SendReserveMail
        user={sendReserveMailUser}
        handleClose={handleSendReserveMailClose}
      />
      <Dialog
        open={confirmRemindOpen}
        onClose={() => setConfirmRemindOpen(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        PaperProps={{ style: { width: "90%", maxWidth: "900px" } }}
      >
        <Box
          style={{ backgroundColor: "#2d3748" }}
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <DialogTitle style={{ margin: "0 auto", color: "white" }}>
            Email preview
          </DialogTitle>
          <Button
            style={{ color: "white" }}
            variant="text"
            onClick={() => setConfirmRemindOpen(false)}
          >
            x
          </Button>
        </Box>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <div className="remind-form">
              <div className="remid-form-items">
                <strong>Teamplate Name</strong>{" "}
              </div>
              <div className="remind-form-items2">Nhắc nhở gửi điểm</div>
            </div>
            <div className="remind-form">
              <div className="remid-form-items">
                <strong>From</strong>{" "}
              </div>
              <div className="remind-form-items2">{fetReveses.email}</div>
            </div>
            <div className="remind-form">
              <div className="remid-form-items">
                <strong>To</strong>{" "}
              </div>
              <div className="remind-form-items2">
                {" "}
                {fetReveses.fullName} {fetReveses.email}{" "}
              </div>
            </div>
            <div className="remind-form">
              <div className="remid-form-items">
                <strong>CC</strong>{" "}
              </div>
              <div className="remind-form-items2"> {fetReveses.email}</div>
            </div>
            <div className="remind-form">
              <div className="remid-form-items">
                <strong>Subject</strong>{" "}
              </div>
              <div className="remind-form-items2"> lorem isum</div>
            </div>
            <div className="remind-form">
              <div className="remid-form-items">
                <strong>Body</strong>{" "}
              </div>
              <div className="remind-form-items2">
                Lorem lorem ipsum dolor sit amet consectetur, adipisicing elit.
                Maiores eos sapiente temporibus ipsa tempora Culpa harum
                voluptas ut?{" "}
              </div>
            </div>
            <div className="remind-form">
              <div className="remid-form-items"></div>
              <div className="remind-form-items2">---------------------</div>
            </div>
            <div className="remind-form">
              <div className="remid-form-items"></div>
              <div className="remind-form-items2">Farm Admin</div>
            </div>
          </DialogContentText>
        </DialogContent>
        <DialogActions className="dialog-action">
          <div style={{ paddingBottom: "1rem" }}>
            <Button
              style={{
                color: "#2d3748",
                border: "solid 1px #2d3748",
                padding: "3px 25px",
              }}
              onClick={() => setConfirmRemindOpen(false)}
              color="primary"
            >
              Back
            </Button>
            <Button
              style={{
                backgroundColor: "#2d3748",
                color: "white",
                padding: "3px 25px",
              }}
              onClick={() => setConfirmRemindOpen(false)}
              color="primary"
            >
              Send
            </Button>
          </div>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Reserve;

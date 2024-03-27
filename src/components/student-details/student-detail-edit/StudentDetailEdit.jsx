import React, { useEffect, useState } from "react";
import { BASE_URL, customAxios } from "../../../api/axios";
import "./StudentDetailEdit.scss";

import {
  Box,
  Button,
  Grid,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  FormHelperText,
} from "@mui/material";
import { useParams } from "react-router-dom";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import dayjs from "dayjs";
import LoadingProp from "../../common/LoadingProp";
import DateFormatter from "../../common/DateFormatter";
import ReservationAdd from "../../ReservationAdd/ReservationAdd";
import { showErrorAlertModal, showSuccessModal } from "../../../utils/Message";

export default function StudentDetailsEdit() {
  const [initialUser, setInitialUser] = useState(null);
  const [user, setUser] = useState(null);
  const [processing, setProcessing] = useState(false);

  const error = {
    phone: "Phone must be 10 digits",
    gpa: "GPA has to be less than 10",
  };

  let param = useParams();

  const fetchUser = async (id) => {
    try {
      const response = await customAxios.get(`${BASE_URL}api/students/${id}`);

      setInitialUser(response.data ? response.data : null);
      setUser(response.data ? response.data : null);
    } catch (err) {
      setUser(null);
    }
  };

  useEffect(() => {
    fetchUser(param.id);
  }, []);

  const formatDate = (currentDate) => {
    return (
      currentDate.getFullYear() +
      "-" +
      String(currentDate.getMonth() + 1).padStart(2, "0") +
      "-" +
      String(currentDate.getDate()).padStart(2, "0")
    );
  };

  //Changes
  const changeFullName = (e) => {
    if (user !== null) {
      user.fullName = e.target.value;
    }
    setUser({ ...user });
  };

  const changeGender = (e) => {
    if (user !== null) {
      user.gender = e.target.value;
    }
    setUser({ ...user });
  };

  const changeStatus = (e) => {
    if (user !== null) {
      user.status = e.target.value;
      setUser({ ...user });
    }
  };

  const changePhone = (e) => {
    if (user !== null) {
      user.phone = e.target.value;
    }
    setUser({ ...user });
  };

  const changeMajor = (e) => {
    if (user !== null) {
      user.major = e.target.value;
    }
    setUser({ ...user });
  };

  const changeDateBirth = (e) => {
    if (user !== null) {
      console.log(e.$D);
      user.dob = new Date(`${e.$y}/${e.$M + 1}/${e.$D + 1}`);
    }
    setUser({ ...user });
  };

  const changeGraduatedDate = (e) => {
    if (user !== null) {
      user.graduatedDate = e.target.value;
    }
    setUser({ ...user });
  };

  const changeGPA = (e) => {
    if (user !== null) {
      user.gpa = e.target.value;
    }
    setUser({ ...user });
  };

  const changeAddress = (e) => {
    if (user !== null) {
      user.address = e.target.value;
    }
    setUser({ ...user });
  };

  const changeReCer = (e) => {
    if (user !== null) {
      user.reCer = e.target.value;
    }
    setUser({ ...user });
  };

  const changeUniversity = (e) => {
    if (user !== null) {
      user.university = e.target.value;
    }
    setUser({ ...user });
  };

  const handleSave = () => {
    if (processing) return;
    if (user == null) return;

    setProcessing(true);
    customAxios
      .patch(`api/students/${user.id}`, {
        phone: user.phone,
        fullName: user.fullName,
        gender: user.gender,
        major: user.major,
        dob: user.dob,
        graduatedDate: user.graduatedDate,
        gpa: user.gpa,
        address: user.address,
        reCer: user.reCer,
        university: user.university,
      })
      .then((p) => {
        setInitialUser({ ...user });
        showSuccessModal();
      })
      .catch((e) => {
        showErrorAlertModal();
      })
      .finally((p) => {
        setProcessing(false);
      });
  };

  const handleCancel = () => {
    console.log("Revert");
    setUser({ ...initialUser });
  };

  const SaveButton = () => {
    return (
      <>
        {processing ? (
          <>
            <Button className={`btn-action-save-disabled`}>Saving...</Button>
          </>
        ) : (
          <Button className={`btn-action-save`} onClick={handleSave}>
            Save
          </Button>
        )}
      </>
    );
  };

  const ClassContainer = () => {
    return (
      <Box className={"class-container"}>
        <Button className="btn-blank" sx={{ marginRight: "25px" }}>
          <AddCircleOutlineIcon sx={{ fontSize: 35 }} />
        </Button>
        {user.studentClasses.map((c) => {
          return (
            <Box key={c.classId} className={"class-card"}>
              <div style={{ display: "flex", alignItems: "center" }}>
                <span style={{ fontSize: 25, fontWeight: 600 }}>
                  {c.class.program.programName}
                </span>
                <span
                  className="class-card-status"
                  style={{ backgroundColor: "#2d3748" }}
                >
                  {c.attendingStatus}
                </span>
              </div>
              <div>
                <p
                  style={{
                    color: "#2b3748",
                    fontWeight: 600,
                    paddingTop: "20px",
                  }}
                >
                  <span>{c.class.className} | </span>
                  <span>
                    <DateFormatter date={new Date(c.class.startDate)} />
                    <span> - </span>
                    {c.class.endDate == null ? (
                      <p>No end date</p>
                    ) : (
                      <DateFormatter date={new Date(c.class.endDate)} />
                    )}
                  </span>
                </p>
              </div>
              <div>
                <p
                  style={{
                    color: "#2b3748",
                    paddingTop: "20px",
                    fontSize: "14px",
                  }}
                >
                  Note about this
                </p>
              </div>
            </Box>
          );
        })}
      </Box>
    );
  };

  return (
    <Box className="student-detail-edit">
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
        Student Details
      </h2>
      {user == null ? (
        <LoadingProp />
      ) : (
        <>
          <Box>
            <Box className="label">General</Box>
            <Box className="box">
              <Grid container spacing={"5vw"}>
                <Grid item xs={12} sm={12} md={6}>
                  <div className="info-field" style={{ paddingBottom: "20px" }}>
                    <span className="info-label">ID:</span>
                    <p>{user.id}</p>
                  </div>
                  <div className="info-field">
                    <span className="info-label">Name</span>
                    <TextField
                      value={user.fullName}
                      onChange={changeFullName}
                    />
                  </div>
                  <div className="info-field">
                    <span className="info-label">Gender</span>
                    <FormControl fullWidth>
                      <Select
                        id="gender"
                        value={user.gender}
                        onChange={changeGender}
                      >
                        <MenuItem sx={{ width: "100%" }} value="Male">
                          Male
                        </MenuItem>
                        <MenuItem sx={{ width: "100%" }} value="Female">
                          Female
                        </MenuItem>
                        <MenuItem sx={{ width: "100%" }} value="Other">
                          Other
                        </MenuItem>
                      </Select>
                    </FormControl>
                  </div>
                  <div className="info-field">
                    <span className="info-label">Date of birth:</span>
                    <DatePicker
                      defaultValue={dayjs(formatDate(new Date(user.dob)))}
                      onChange={(newValue) => changeDateBirth(newValue)}
                    />
                  </div>
                  <div className="info-field">
                    <span className="info-label">Status:</span>
                    <FormControl fullWidth>
                      <Select
                        id="status"
                        value={user.status}
                        onChange={changeStatus}
                      >
                        <MenuItem sx={{ width: "100%" }} value="Active">
                          Active
                        </MenuItem>
                        <MenuItem sx={{ width: "100%" }} value="InActive">
                          Inactive
                        </MenuItem>
                      </Select>
                    </FormControl>
                  </div>
                </Grid>
                <Grid item xs={12} sm={12} md={6}>
                  <div className="info-field">
                    <span className="info-label">Phone:</span>
                    <FormControl>
                      <TextField value={user.phone} onChange={changePhone} />
                      {user.phone.length !== 10 && (
                        <FormHelperText sx={{ color: "red" }}>
                          {error.phone}
                        </FormHelperText>
                      )}
                    </FormControl>
                  </div>
                  <div className="info-field">
                    <span className="info-label">Email:</span>
                    <p className="info-value">{user.email}</p>
                  </div>
                  <div className="info-field">
                    <span className="info-label">Location:</span>
                    <TextField value={user.address} onChange={changeAddress} />
                  </div>
                </Grid>
              </Grid>
              <Box className="btn-action">
                <Button className="btn-action-cancel" onClick={handleCancel}>
                  Cancel
                </Button>
                <SaveButton />
              </Box>
            </Box>
          </Box>
          <Box>
            <Box className="label">Others</Box>
            <Box className="box">
              <Grid container spacing={"5vw"}>
                <Grid item xs={12} sm={12} md={6}>
                  <div className="info-field">
                    <span className="student-details--info-label">
                      University
                    </span>
                    <TextField
                      defaultValue={user.university}
                      onChange={changeUniversity}
                    />
                  </div>
                  <div className="info-field">
                    <span className="student-details--info-label">Major</span>
                    <TextField
                      defaultValue={user.major}
                      onChange={changeMajor}
                    />
                  </div>
                  <div className="info-field">
                    <span className="student-details--info-label">RECer</span>
                    <TextField value={user.reCer} onChange={changeReCer} />
                  </div>
                </Grid>
                <Grid item xs={12} sm={12} md={6}>
                  <div className="info-field">
                    <span className="student-details--info-label">GPA</span>
                    <FormControl>
                      <TextField defaultValue={user.gpa} onChange={changeGPA} />
                      {(Number(user.gpa) < 0 || Number(user.gpa) > 10) && (
                        <FormHelperText sx={{ color: "red" }}>
                          {error.gpa}
                        </FormHelperText>
                      )}
                    </FormControl>
                  </div>
                  <div className="info-field">
                    <span className="student-details--info-label">
                      Graduation time
                    </span>
                    <TextField
                      defaultValue={user.graduatedDate}
                      onChange={changeGraduatedDate}
                    />
                  </div>
                </Grid>
              </Grid>
              <Box className="btn-action">
                <Button className="btn-action-cancel" onClick={handleCancel}>
                  Cancel
                </Button>
                <SaveButton />
              </Box>
            </Box>
          </Box>
          <Box>
            <Box className="label">Class information</Box>
            <Box className="box">
              <ClassContainer />
              <Box className="btn-action">
                <Button className="btn-action-cancel" onClick={handleCancel}>
                  Cancel
                </Button>
                <SaveButton />
              </Box>
            </Box>
          </Box>
          <Box>
            <Box className="label">Reserving</Box>
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <ReservationAdd />
            </Box>
          </Box>
        </>
      )}
    </Box>
  );
}

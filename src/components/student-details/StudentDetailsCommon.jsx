import React, { useEffect, useState } from "react";
import { customAxios } from "../../api/axios";
import "./StudentDetailsCommon.scss";

import { Box, Grid, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import DateFormatter from "../common/DateFormatter";
import LoadingProp from "../common/LoadingProp";
import TabBar from "../common/TabBar";
import { BASE_URL } from "../../api/axios";

export default function StudentDetailsCommon() {
  const [user, setUser] = useState(null);
  let param = useParams();

  const fetchUser = async (id) => {
    try {
      const response = await customAxios.get(`${BASE_URL}api/students/${id}`);
      setUser(response.data ? response.data : {});
    } catch (err) {
      setUser({});
    }
  };

  useEffect(() => {
    fetchUser(param.id);
  }, []);

  const ClassContainer = () => {
    return (
      <Box className={"class-container"}>
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

  const ReservationContainer = () => {
    return <Box className="reservation"></Box>;
  };

  return (
    <Box className="student-detail-common">
      <TabBar title={"Student detail"} />
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
            <Box sx={{ margin: "30px 25px" }}>
              <Grid container spacing={"5vw"}>
                <Grid item xs={12} sm={12} md={6}>
                  <div className="info-field">
                    <span className="info-label">ID:</span>
                    <span>{user.id}</span>
                  </div>
                  <div className="info-field">
                    <span className="info-label">Name</span>
                    <span>{user.fullName}</span>
                  </div>
                  <div className="info-field">
                    <span className="info-label">Gender</span>
                    <span>{user.gender}</span>
                  </div>
                  <div className="info-field">
                    <span className="info-label">Date of birth</span>
                    <span>
                      <DateFormatter date={new Date(user.dob)} />
                    </span>
                  </div>
                  <div className="info-field">
                    <span className="info-label">Status</span>
                    <div
                      style={{
                        width: 100,
                        textAlign: "center",
                        fontWeight: 600,
                        borderRadius: 8,
                        color: "#FFF",
                        backgroundColor: "#2d3748",
                        padding: "5px 7px",
                      }}
                    >
                      {user.status}
                    </div>
                  </div>
                </Grid>
                <Grid item xs={12} sm={12} md={6}>
                  <div className="info-field">
                    <span className="info-label">Phone:</span>
                    <span>{user.phone}</span>
                  </div>
                  <div className="info-field">
                    <span className="info-label">Email</span>
                    <span className="info-value">{user.email}</span>
                  </div>
                  {/* <div className="info-field">
                                <span className="info-label">Permanent residence</span>
                                <span>AAA</span>
                            </div> */}
                  <div className="info-field">
                    <span className="info-label">Location</span>
                    <span>{user.address}</span>
                  </div>
                </Grid>
              </Grid>
            </Box>
          </Box>
          <Box>
            <Box className="label">Others</Box>
            <Box sx={{ margin: "30px 25px" }}>
              <Grid container spacing={"5vw"}>
                <Grid item xs={12} sm={12} md={6}>
                  <div className="info-field">
                    <span className="info-label">University</span>
                    <span>{user.university}</span>
                  </div>
                  <div className="info-field">
                    <span className="info-label">Major</span>
                    <span>{user.major}</span>
                  </div>
                </Grid>
                <Grid item xs={12} sm={12} md={6}>
                  <div className="info-field">
                    <span className="info-label">RECer</span>
                    <span className="info-value">{user.reCer}</span>
                  </div>
                  <div className="info-field">
                    <span className="info-label">GPA</span>
                    <span>{user.gpa}</span>
                  </div>
                  <div className="info-field">
                    <span className="info-label">Graduation time</span>
                    <span>{user.graduatedDate}</span>
                  </div>
                </Grid>
              </Grid>
            </Box>
          </Box>
          <Box>
            <Box className="label">Class information</Box>
            <Box>
              <ClassContainer />
            </Box>
          </Box>
          <Box>
            <Box className="label">Reserving</Box>
            <ReservationContainer />
          </Box>
        </>
      )}
    </Box>
  );
}

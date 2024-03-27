import React, { useEffect, useState } from "react";
import { customAxios } from "../../../api/axios";
import "./ClassStudentDetail.scss";
import EditIcon from "@mui/icons-material/Edit";
import CancelIcon from "@mui/icons-material/Cancel";
import SaveIcon from "@mui/icons-material/Save";

import { Box, Grid, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import StudentScore from "./StudentScore/StudentScore";
import DateFormatter from "../../common/DateFormatter";
import LoadingProp from "../../../components/common/LoadingProp";
import TabBar from "../../../components/common/TabBar";
import { BASE_URL } from "../../../api/axios";
import StudentListInClassHeader from "../../ClassList/StudentListInClassHeader";

export default function ClassStudentDetail() {
  const [data, setData] = useState(null);
  let param = useParams();

  const fetchUser = async () => {
    try {
      const response = await customAxios.get(
        `${BASE_URL}api/classes/${param.classId}/students/${param.id}`
      );
      setData(response.data ? response.data : null);
    } catch (err) {}
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <Box className="class-student-detail">
      <TabBar title={"Class student detail"} />
      <StudentListInClassHeader id={param.classId} />
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
        Student Detail
      </h2>
      {data == null ? (
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
                    <span>{data.id}</span>
                  </div>
                  <div className="info-field">
                    <span className="info-label">Name</span>
                    <span>{data.fullName}</span>
                  </div>
                  <div className="info-field">
                    <span className="info-label">Gender</span>
                    <span>{data.gender}</span>
                  </div>
                  <div className="info-field">
                    <span className="info-label">Date of birth</span>
                    <span>
                      <DateFormatter date={new Date(data.dob)} />
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
                      {data.status}
                    </div>
                  </div>
                </Grid>
                <Grid item xs={12} sm={12} md={6}>
                  <div className="info-field">
                    <span className="info-label">Phone:</span>
                    <span>{data.phone}</span>
                  </div>
                  <div className="info-field">
                    <span className="info-label">Email</span>
                    <span className="info-value">{data.email}</span>
                  </div>
                  {/* <div className="info-field">
                <span className="info-label">
                  Permanent residence
                </span>
                <span>AAA</span>
              </div> */}
                  <div className="info-field">
                    <span className="info-label">Location</span>
                    <span>{data.address}</span>
                  </div>
                  <div className="info-field">
                    <span className="info-label">Certification status</span>
                    <span>{data.studentClass.certificationStatus}</span>
                  </div>
                  <div className="info-field">
                    <span className="info-label">Certification date</span>
                    <span>
                      {data.studentClass.certificationDate == null ||
                      data.studentClass.certificationDate == undefined ? (
                        <p>None</p>
                      ) : (
                        <DateFormatter
                          date={new Date(data.studentClass.certificationDate)}
                        />
                      )}
                    </span>
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
                    <span>{data.university}</span>
                  </div>
                  <div className="info-field">
                    <span className="info-label">Major</span>
                    <span className="info-value">{data.major}</span>
                  </div>
                </Grid>
                <Grid item xs={12} sm={12} md={6}>
                  <div className="info-field">
                    <span className="info-label">RECer</span>
                    <span className="info-value">{data.reCer}</span>
                  </div>
                  <div className="info-field">
                    <span className="info-label">GPA</span>
                    <span className="info-value">{data.gpa}</span>
                  </div>
                  <div className="info-field">
                    <span className="info-label">Graduation time</span>
                    <span className="info-value">{data.graduatedDate}</span>
                  </div>
                </Grid>
              </Grid>
            </Box>
          </Box>
          <Box>
            <Box className="label">Scores</Box>
            <Box>
              <StudentScore
                data={data}
                classId={param.classId}
                studentId={param.id}
              />
            </Box>
          </Box>
        </>
      )}
    </Box>
  );
}

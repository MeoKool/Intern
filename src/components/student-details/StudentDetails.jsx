import React, { useEffect, useState } from "react";
import axios from "axios";
import "./StudentDetails.css";

import { Box, Grid, Typography } from "@mui/material";
import { useParams } from "react-router-dom";

export default function StudentDetails() {
  const [user, setUser] = useState({});
  let param = useParams();

  const scoreStatus = {
    passed: {
      label: "Passed",
      color: "#2f903f",
    },
    failed: {
      label: "Failed",
      color: "#e74a3b",
    },
  };

  function calculateAverage(numbers, decimalPlaces) {
    if (numbers.length === 0) {
      return 0; // Avoid division by zero
    }

    const sum = numbers.reduce((acc, num) => acc + num, 0);
    const average = sum / numbers.length;

    return parseFloat(average.toFixed(1));
  }

  const scores = [
    {
      id: 1,
      name: "HCM22_FR_DevOps_01",
      subjects: [
        {
          id: 1,
          name: "FEE",
          status: "passed",
          elements: [
            {
              id: 1,
              name: "Quiz",
              parts: [
                {
                  id: 1,
                  name: "HTML",
                  score: 9,
                },
                {
                  id: 1,
                  name: "CSS",
                  score: 9,
                },
                {
                  id: 1,
                  name: "Quiz 3",
                  score: 9,
                },
                {
                  id: 1,
                  name: "Quiz 4",
                  score: 9,
                },
                {
                  id: 1,
                  name: "Quiz 5",
                  score: 9,
                },
                {
                  id: 1,
                  name: "Quiz 6",
                  score: 9,
                },
              ],
            },
            {
              id: 1,
              name: "Quiz",
              parts: [
                {
                  id: 1,
                  name: "HTML",
                  score: 9,
                },
                {
                  id: 1,
                  name: "CSS",
                  score: 9,
                },
                {
                  id: 1,
                  name: "Quiz 3",
                  score: 8,
                },
                {
                  id: 1,
                  name: "Quiz 4",
                  score: 9,
                },
                {
                  id: 1,
                  name: "Quiz 5",
                  score: 9,
                },
                {
                  id: 1,
                  name: "Quiz 6",
                  score: 9,
                },
              ],
            },
          ],
        },
      ],
    },
  ];

  const fetchUser = async (id) => {
    try {
      const response = await axios.get(
        `https://6535e093c620ba9358ecba91.mockapi.io/student/${id}`
      );
      setUser(response.data ? response.data : {});
    } catch (err) {
      setUser({});
    }
  };

  useEffect(() => {
    fetchUser(param.id);
  }, []);

  const ScoreCard = ({ subject }) => {
    return (
      <>
        <Box sx={{ pt: 5, pb: 2 }}>
          <span>{subject.name}</span>
          <span
            className="student-details--score-status"
            style={{ backgroundColor: scoreStatus[subject.status].color }}
          >
            {scoreStatus[subject.status].label}
          </span>
        </Box>
        <Box sx={{ display: "flex" }}>
          {subject.elements.map((ele, i) => (
            <Box
              key={i}
              sx={{ boxShadow: "0 0 5px rgba(0, 0, 0, 0.5)" }}
              className={"student-details--score-card"}
            >
              <Box
                sx={{
                  backgroundColor: "#2d3748",
                  color: "#FFF",
                  textAlign: "center",
                  padding: "5px 0",
                }}
              >
                <p>{ele.name}</p>
              </Box>
              <Box sx={{ display: "flex" }}>
                {ele.parts.map((part, i) => (
                  <div key={i} className={`student-details--score-card-tile`}>
                    <p>{part.name}</p>
                    <p className="student-details--score-card-tile-score">
                      {part.score}
                    </p>
                  </div>
                ))}
                <div
                  className={`student-details--score-card-tile`}
                  style={{ backgroundColor: "#dddcdc" }}
                >
                  <p>Avg.</p>
                  <p className="student-details--score-card-tile-score">
                    {calculateAverage(ele.parts.map((s) => s.score))}
                  </p>
                </div>
              </Box>
            </Box>
          ))}
        </Box>
      </>
    );
  };

  const ScoreContainer = () => {
    return (
      <Box sx={{ fontFamily: "Arial, sans-serif", padding: "20px 2vw" }}>
        <Typography
          variant={"h4"}
          component={"h6"}
          style={{
            fontFamily: "Inter, sans-serif",
          }}
        >
          FRESHER DEVELOP OPERATION
        </Typography>
        {scores.map((score, i) => (
          <Box
            key={i}
            sx={{ padding: "35px 0", color: "#2d3748", fontWeight: 600 }}
          >
            <p>{score.name}</p>
            <hr />
            {score.subjects.map((subject, i) => (
              <ScoreCard key={i} subject={subject} />
            ))}
          </Box>
        ))}
      </Box>
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
        Student Details
      </h2>
      <Box>
        <Box className="student-details--label">General</Box>
        <Box sx={{ margin: "30px 25px" }}>
          <Grid container>
            <Grid item md={6}>
              <div className="student-details--info-field">
                <span className="student-details--info-label">ID:</span>
                <span>{user.id}</span>
              </div>
              <div className="student-details--info-field">
                <span className="student-details--info-label">Name</span>
                <span>{user.fullName}</span>
              </div>
              <div className="student-details--info-field">
                <span className="student-details--info-label">Gender</span>
                <span>{user.gender}</span>
              </div>
              <div className="student-details--info-field">
                <span className="student-details--info-label">
                  Date of birth
                </span>
                <span>{user.dateOfBirth}</span>
              </div>
              <div className="student-details--info-field">
                <span className="student-details--info-label">Status</span>
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
            <Grid item md={6}>
              <div className="student-details--info-field">
                <span className="student-details--info-label">Phone:</span>
                <span>{user.Phone}</span>
              </div>
              <div className="student-details--info-field">
                <span className="student-details--info-label">Email</span>
                <span>{user.Email}</span>
              </div>
              <div className="student-details--info-field">
                <span className="student-details--info-label">
                  Permanent residence
                </span>
                <span>AAA</span>
              </div>
              <div className="student-details--info-field">
                <span className="student-details--info-label">Location</span>
                <span>{user.address}</span>
              </div>
              <div className="student-details--info-field">
                <span className="student-details--info-label">
                  Certification status
                </span>
                <span>Done</span>
              </div>
              <div className="student-details--info-field">
                <span className="student-details--info-label">
                  Certification date
                </span>
                <span>21/11/1111</span>
              </div>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Box>
        <Box className="student-details--label">Others</Box>
        <Box sx={{ margin: "30px 25px" }}>
          <Grid container>
            <Grid item md={6}>
              <div className="student-details--info-field">
                <span className="student-details--info-label">University</span>
                <span>{user.university}</span>
              </div>
              <div className="student-details--info-field">
                <span className="student-details--info-label">Major</span>
                <span>{user.major}</span>
              </div>
            </Grid>
            <Grid item md={6}>
              <div className="student-details--info-field">
                <span className="student-details--info-label">RECer</span>
                <span>{user.reCer}</span>
              </div>
              <div className="student-details--info-field">
                <span className="student-details--info-label">GPA</span>
                <span>{user.gpa}</span>
              </div>
              <div className="student-details--info-field">
                <span className="student-details--info-label">
                  Graduation time
                </span>
                <span>{user.graduatedDate}</span>
              </div>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Box>
        <Box className="student-details--label">Scores</Box>
        <Box>
          <ScoreContainer />
        </Box>
      </Box>
    </>
  );
}

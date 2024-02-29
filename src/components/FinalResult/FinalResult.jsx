import React, { useEffect, useState } from "react";
import axios from "axios";
import "./StudentDetails.css";
import { Box, Grid, Typography } from "@mui/material";
import { useParams } from "react-router-dom";

const FinalResult = () => {
  const [user, setUser] = useState({});
  const { id } = useParams();

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
    fetchUser(id);
  }, [id]);

  const renderInfoField = (label, value) => (
    <div className="student-details--info-field">
      <span className="student-details--info-label">{label}:</span>
      <span>{value}</span>
    </div>
  );

  const ScoreCard = ({ subject }) => {
    if (!subject) {
      // Handle the case when subject is not provided
      return null;
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
                    { id: 1, name: "HTML", score: 9 },
                    { id: 2, name: "CSS", score: 9 },
                    { id: 3, name: "Quiz 3", score: 9 },
                    { id: 4, name: "Quiz 4", score: 9 },
                    { id: 5, name: "Quiz 5", score: 9 },
                    { id: 6, name: "Quiz 6", score: 9 },
                  ],
                },
                {
                  id: 2,
                  name: "Quiz",
                  parts: [
                    { id: 1, name: "HTML", score: 9 },
                    { id: 2, name: "CSS", score: 9 },
                    { id: 3, name: "Quiz 3", score: 8 },
                    { id: 4, name: "Quiz 4", score: 9 },
                    { id: 5, name: "Quiz 5", score: 9 },
                    { id: 6, name: "Quiz 6", score: 9 },
                  ],
                },
              ],
            },
          ],
        },
      ];
  
    return (
        
      <div className="score-card">
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
          {subject.elements.map((ele) => (
            <div key={ele.id} className="score-card-element">
              <Box sx={{ boxShadow: "0 0 5px rgba(0, 0, 0, 0.5)" }}>
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
                  {ele.parts.map((part) => (
                    <div key={part.id} className={`score-card-part`}>
                      <p>{part.name}</p>
                      <p className="score-card-part-score">{part.score}</p>
                    </div>
                  ))}
                  <div
                    className={`score-card-part`}
                    style={{ backgroundColor: "#dddcdc" }}
                  >
                    <p>Avg.</p>
                    <p className="score-card-part-score">
                      {calculateAverage(ele.parts.map((s) => s.score))}
                    </p>
                  </div>
                </Box>
              </Box>
            </div>
          ))}
        </Box>
      </div>
    );
  };

  const ScoreContainer = () => {
    return (
      <Box sx={{ fontFamily: "Arial, sans-serif", padding: "20px 2vw" }}>
        <Typography
          variant="h4"
          component="h6"
          style={{ fontFamily: "Inter, sans-serif" }}
        >
          FRESHER DEVELOP OPERATION
        </Typography>
        {scores.map((score) => (
          <ScoreSection key={score.id} score={score} />
        ))}
      </Box>
    );
  };

  const ScoreSection = ({ score }) => {
    return (
      <Box sx={{ padding: "35px 0", color: "#2d3748", fontWeight: 600 }}>
        <p>{score.name}</p>
        <hr />
        {score.subjects.map((subject) => (
          <ScoreCard key={subject.id} subject={subject} />
        ))}
      </Box>
    );
  };

  const calculateAverage = (numbers) => {
    if (numbers.length === 0) {
      return 0; // Avoid division by zero
    }

    const sum = numbers.reduce((acc, num) => acc + num, 0);
    const average = sum / numbers.length;

    return parseFloat(average.toFixed(1));
  };

  return (
    <>
      <h2 className="student-details--header">Student Details</h2>

      {/* General Info */}
      <Box>
        <Box className="student-details--label">General</Box>
        <Box sx={{ margin: "30px 25px" }}>
          <Grid container>
            <Grid item md={6}>
              {renderInfoField("ID", user.id)}
              {renderInfoField("Name", user.fullName)}
              {renderInfoField("Gender", user.gender)}
              {renderInfoField("Date of birth", user.dateOfBirth)}
              {renderInfoField(
                "Status",
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
              )}
            </Grid>
            <Grid item md={6}>
              {renderInfoField("Phone", user.Phone)}
              {renderInfoField("Email", user.Email)}
              {renderInfoField("Permanent residence", "AAA")}
              {renderInfoField("Location", user.address)}
              {renderInfoField("Certification status", "Done")}
              {renderInfoField("Certification date", "21/11/1111")}
            </Grid>
          </Grid>
        </Box>
      </Box>

      {/* Others Info */}
      <Box>
        <Box className="student-details--label">Others</Box>
        <Box sx={{ margin: "30px 25px" }}>
          <Grid container>
            <Grid item md={6}>
              {renderInfoField("University", user.university)}
              {renderInfoField("Major", user.major)}
            </Grid>
            <Grid item md={6}>
              {renderInfoField("RECer", user.reCer)}
              {renderInfoField("GPA", user.gpa)}
              {renderInfoField("Graduation time", user.graduatedDate)}
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
};

export default FinalResult;

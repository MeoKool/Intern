import { useState, useEffect } from "react";
import axios from "axios";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import Table from "@mui/material/Table";
import { useParams } from "react-router-dom";
import { BASE_URL } from "../../api/axios";
import ImportButton from "../ImportButton/ImportButton";
import { GetClassScore, ImportStudentScore } from "../../api/APIConfigure";

function ScoreManagement() {
  const [modules, setModules] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    async function fetchModules() {
      try {
        const response = await GetClassScore(id);
        setModules(
          response.data.map((module) => ({
            ...module,
            studentScores: module.studentScores.map((student) => ({
              ...student,
              moduleScore:
                student.moduleScore !== null ? student.moduleScore : "UnScore",
              scores: student.scores.map((score) =>
                score !== null ? score : "UnScore"
              ),
            })),
          }))
        );
      } catch (error) {
        console.error("Error fetching modules:", error);
      }
    }
    fetchModules();
  }, []);

  return (
    <div>
      {modules.map((module) => (
        <div key={module.moduleId}>
          <div style={{ position: "relative" }}>
            <h2
              style={{
                backgroundColor: "#2D3748",
                padding: "20px",
                color: "white",
                marginTop: "1px",
                marginBottom: "1px",
              }}
            >
              {module.moduleName}
            </h2>
            <div style={{ position: "absolute", top: "0", right: "0" }}>
              <ImportButton
                postFile={ImportStudentScore}
                file={`${BASE_URL}api/file/${id}/student-score-template/${module.moduleId}`}
                idObj={{ classId: id, moduleId: module.moduleId }}
              />
            </div>
          </div>
          <div
            style={{ marginBottom: "20px", width: "100%", overflowX: "auto" }}
          >
            <Table style={{ border: "1px solid black", tableLayout: "fixed" }}>
              <TableHead>
                <TableRow>
                  <TableCell
                    style={{
                      width: "10%",
                      textAlign: "center",
                      border: "1px solid black",
                      fontSize: "larger",
                      color: "white",
                      backgroundColor: "#2D3748",
                    }}
                  >
                    Student ID
                  </TableCell>
                  <TableCell
                    style={{
                      width: "20%",
                      textAlign: "center",
                      border: "1px solid black",
                      fontSize: "larger",
                      color: "white",
                      backgroundColor: "#2D3748",
                    }}
                  >
                    Student Name
                  </TableCell>
                  <TableCell
                    style={{
                      width: "40%",
                      textAlign: "center",
                      border: "1px solid black",
                      fontSize: "larger",
                      color: "white",
                      backgroundColor: "#2D3748",
                    }}
                  >
                    Student Email
                  </TableCell>

                  {module.assignments &&
                    module.assignments.map((assignment, index) => (
                      <TableCell
                        key={index}
                        style={{
                          width: "20%",
                          textAlign: "center",
                          border: "1px solid black",
                          fontSize: "larger",
                          color: "white",
                          backgroundColor: "#2D3748",
                        }}
                      >
                        {assignment.assignmentName}
                      </TableCell>
                    ))}

                  <TableCell
                    style={{
                      width: "20%",
                      textAlign: "center",
                      border: "1px solid black",
                      fontSize: "larger",
                      color: "white",
                      backgroundColor: "#2D3748",
                    }}
                  >
                    Module Score
                  </TableCell>

                  <TableCell
                    style={{
                      width: "20%",
                      textAlign: "center",
                      border: "1px solid black",
                      fontSize: "larger",
                      color: "white",
                      backgroundColor: "#2D3748",
                    }}
                  >
                    Module Level
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {module.studentScores &&
                  module.studentScores.map((student) => (
                    <TableRow key={`${module.moduleId}-${student.studentId}`}>
                      <TableCell
                        style={{
                          textAlign: "center",
                          border: "1px solid black",
                          fontWeight: "bold",
                        }}
                      >
                        {student.studentId}
                      </TableCell>
                      <TableCell
                        style={{
                          textAlign: "center",
                          border: "1px solid black",
                          fontWeight: "bold",
                        }}
                      >
                        {student.studentName}
                      </TableCell>
                      <TableCell
                        style={{
                          textAlign: "center",
                          border: "1px solid black",
                          fontWeight: "bold",
                        }}
                      >
                        {student.studentEmail}
                      </TableCell>
                      {module.assignments &&
                        module.assignments.map((assignment, index) => (
                          <TableCell
                            key={index}
                            style={{
                              width: "20%",
                              textAlign: "center",
                              border: "1px solid black",
                            }}
                          >
                            {student.scores[index]}
                          </TableCell>
                        ))}
                      <TableCell
                        style={{
                          textAlign: "center",
                          border: "1px solid black",
                          fontWeight: "bold",
                        }}
                      >
                        {typeof student.moduleScore == "number"
                          ? student.moduleScore.toFixed(1)
                          : student.moduleScore}
                      </TableCell>
                      <TableCell
                        style={{
                          textAlign: "center",
                          border: "1px solid black",
                          fontWeight: "bold",
                        }}
                      >
                        {student.moduleLevel}
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ScoreManagement;

import { useEffect, useState } from "react";
import "./StudentScore.css";
import { useParams } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import CancelIcon from "@mui/icons-material/Cancel";
import SaveIcon from "@mui/icons-material/Save";
import { Button } from "@mui/material";

export default function StudentScore() {
  const { id, classId } = useParams();
  const [updatedScore, setUpdatedScore] = useState({});
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [isEdit, setIsEdit] = useState(false);

  async function fetchScore() {
    const res = await fetch(
      "https://65de9b24dccfcd562f57151b.mockapi.io/api/score"
    );
    const tmpData = await res.json();
    setData(tmpData[0]);
    setIsLoading(false);
  }

  function handleScoreChange(id, e) {
    setUpdatedScore({ ...updatedScore, [id]: e.target.value });
  }

  useEffect(() => {
    fetchScore();
  }, []);

  if (isLoading) return <></>;

  return (
    <div className="score-container">
      <h2 className="program-name">{data.currentClass.program.programName}</h2>

      <h3 className="class-name">{data.currentClass.className}</h3>

      {data.studentClassModules.map((module) => (
        <div key={module.id} className="module-container">
          {/* Title */}
          <div style={{ display: "flex", alignItems: "center" }}>
            <p className="module-name">{module.module.moduleName}</p>

            <p
              className={`module__status-badge ${
                module.moduleScore < 5
                  ? "module__status-badge--fail"
                  : "module__status-badge--success"
              }`}
            >
              {module.moduleScore < 5 ? "Failed" : "Passed"}
            </p>

            <Button
              sx={{ cursor: "pointer", marginRight: "1rem", color: "black" }}
              onClick={() => setIsEdit(true)}
            >
              <EditIcon sx={{ marginRight: "4px" }} />
              Edit
            </Button>

            {isEdit ? (
              <Button
                sx={{ cursor: "pointer", marginRight: "1rem", color: "red" }}
                onClick={() => setIsEdit(false)}
              >
                <CancelIcon sx={{ marginRight: "4px" }} />
                Cancel
              </Button>
            ) : null}

            {isEdit ? (
              <Button
                sx={{ cursor: "pointer", marginRight: "1rem" }}
                onClick={() => setIsEdit(false)}
              >
                <SaveIcon sx={{ marginRight: "4px" }} />
                Save
              </Button>
            ) : null}
          </div>

          {/* Score */}
          <div className="assignment-container">
            <p className="assignment-title">Score</p>
            <div className="score-card">
              {module.module.assignments.map((as, i) => (
                <>
                  <div className="score-item" key={as.id}>
                    <p className="assignment-name">{as.assignmentName}</p>
                    {isEdit ? (
                      <input
                        className="score-input"
                        type="number"
                        min="0"
                        max="10"
                        step="0.1"
                        onChange={(e) => handleScoreChange(as.id, e)}
                        placeholder={as.scoreValue}
                      />
                    ) : (
                      <p className="assignment-value">{as.scoreValue}</p>
                    )}
                  </div>
                  {i % 2 == 1 ? null : <div className="divider"></div>}
                </>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

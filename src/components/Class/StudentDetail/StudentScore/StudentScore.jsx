import { useState } from "react";
import "./StudentScore.scss";
import EditIcon from "@mui/icons-material/Edit";
import CancelIcon from "@mui/icons-material/Cancel";
import SaveIcon from "@mui/icons-material/Save";
import { Button } from "@mui/material";
import { validateScoresValue } from "../../../../utils/ValidationRule";
import {
  showErrorAlertModal,
  showSuccessModal,
} from "../../../../utils/Message";
import { UpdateStudentScore } from "../../../../api/APIConfigure";

export default function StudentScore({ data, studentId, classId }) {
  const ScoreModule = ({ module }) => {
    const [isEdit, setIsEdit] = useState(false);
    const assignementNames = module.module.assignments.map(
      (item) => item.assignmentName
    );
    const [prevScores, setPrevScores] = useState([]);
    const [scores, setScores] = useState(
      module.module.assignments.map((as) => {
        return {
          assignmentId: +as.id,
          scoreValue: as.scoreValue,
        };
      })
    );
    let avg = (
      scores.reduce((acc, cur) => acc + cur.scoreValue, 0) / scores.length
    ).toFixed(1);

    function checkPassStatus() {
      if (avg < 5) {
        return false;
      }

      for (let i = 0; i < scores.length; i++) {
        if (scores[i].scoreValue < 4) return false;
      }

      return true;
    }

    function handleScoreChange(id, e) {
      console.log(scores, id, e.target.value);

      setScores(
        scores.map((score) =>
          score.assignmentId == id
            ? {
                ...score,
                assignmentId: +id,
                scoreValue: +e.target.value,
              }
            : score
        )
      );
    }

    function handleScoreSave() {
      if (!validateScoresValue(scores)) {
        showErrorAlertModal("Your score value is incorrect");
        return;
      }

      UpdateStudentScore(classId, studentId, scores)
        .then(() => {
          showSuccessModal("Update score successfully");
        })
        .catch((err) => console.log(err));

      setIsEdit(false);
    }

    function handleCancel() {
      setScores([...prevScores]);

      setIsEdit(false);
    }

    return (
      <div key={module.id} className="node-container">
        {/* Title */}
        <div className="title">
          <p className="title-name">{module.module.moduleName}</p>
          <p
            className={`status-badge ${
              !checkPassStatus()
                ? "status-badge--fail"
                : "status-badge--success"
            }`}
          >
            {!checkPassStatus() ? "Failed" : "Passed"}
          </p>

          {!isEdit && (
            <Button
              sx={{ cursor: "pointer", marginRight: "1rem", color: "black" }}
              onClick={() => {
                setPrevScores([...scores]);
                setIsEdit(true);
              }}
            >
              <EditIcon sx={{ marginRight: "4px" }} />
              Edit
            </Button>
          )}

          {isEdit ? (
            <Button
              sx={{ cursor: "pointer", marginRight: "1rem", color: "red" }}
              onClick={handleCancel}
            >
              <CancelIcon sx={{ marginRight: "4px" }} />
              Cancel
            </Button>
          ) : null}

          {isEdit ? (
            <Button
              sx={{ cursor: "pointer", marginRight: "1rem" }}
              onClick={handleScoreSave}
            >
              <SaveIcon sx={{ marginRight: "4px" }} />
              Save
            </Button>
          ) : null}
        </div>

        {/* Score */}
        <div className="assignment-container">
          <p className="assignment-title">Score</p>
          <div className="assignment-score-card">
            {scores.map((as, i) => (
              <>
                <div className="score-item" key={as.assignmentId}>
                  <p className="name">{assignementNames[i]}</p>
                  {isEdit ? (
                    <input
                      className="score-input"
                      type="number"
                      min="0"
                      max="10"
                      step="0.1"
                      onChange={(e) => handleScoreChange(as.assignmentId, e)}
                      value={as.scoreValue}
                    />
                  ) : (
                    <p className="assignment-value">{as.scoreValue}</p>
                  )}
                </div>
              </>
            ))}
            <div className="score-item">
              <p className="name">Avg.</p>
              <p className="assignment-value">{avg}</p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="student-detail-score">
      <h2 className="program-name">
        {data.studentClass.class.program.programName}
      </h2>
      <h3 className="class-name">{data.studentClass.class.className}</h3>

      {data.studentClassModules.map((module, i) => (
        <ScoreModule key={i} module={module} />
      ))}
    </div>
  );
}

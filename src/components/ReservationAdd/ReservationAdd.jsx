import { useEffect, useState } from "react";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControlLabel,
  Switch,
  CircularProgress,
} from "@mui/material";
import "./ReservationAdd.css";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import {
  AddReservation,
  GetModulesByClassId,
  GetStudentById,
} from "../../api/APIConfigure";
import { showErrorAlertModal, showSuccessModal } from "../../utils/Message";
import { validateAddReservation } from "../../utils/ValidationRule";
import { useParams } from "react-router-dom";

export default function ReservationAdd() {
  const { id } = useParams();

  useEffect(() => {
    if (id) findStudent(+id);
  }, []);

  const [selectedStudent, setSelectedStudent] = useState({
    isAvailable: false,
  });
  const [modules, setModules] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const conditions = [
    "Complete tuition payment",
    "Ensure the course has not progressed beyond 50%",
    "Determine retention fee payment",
    "Perform one-time retention check",
    "Identify the concluding module",
  ];

  async function findStudent(id) {
    if (!Number.isInteger(id)) return;

    setIsLoading(true);

    try {
      const studentRes = await GetStudentById(id);
      const data = studentRes.data;
      setSelectedStudent({
        ...selectedStudent,
        isAvailable: true,
        className: data.currentClass.program.programName,
        classCode: data.currentClass.className,
        fullName: data.fullName,
        phone: data.phone,
      });

      const modulesRes = await GetModulesByClassId(data.currentClass.id);
      setModules(modulesRes.data);
    } catch (e) {
      setIsLoading(false);
      showErrorAlertModal("Cannot find student");
    }

    setIsLoading(false);
  }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    if (!id) setSelectedStudent({ isAvailable: false });
    if (!id) setModules([]);
  };

  return (
    <>
      <Button
        onClick={handleClickOpen}
        variant="contained"
        style={{
          float: "right",
          backgroundColor: "#2d3748",
          padding: "10px",
          marginTop: "10px",
        }}
      >
        <AddCircleOutlineIcon style={{ marginRight: "10px" }} />
        Add new
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle
          style={{
            textAlign: "center",
            background: "#2D3748",
            color: "#fff",
            paddingTop: "0.5rem",
            paddingBottom: "0.5rem",
          }}
        >
          Add reserving
        </DialogTitle>

        <div style={{ padding: "0.5rem" }}>
          <DialogContent>
            <p className="box-title">Select student</p>
            {selectedStudent.isAvailable ? (
              <p className="input-value">
                {selectedStudent.fullName}
                {" - "}
                {selectedStudent.phone}
              </p>
            ) : (
              <>
                <input
                  disabled={selectedStudent.isAvailable}
                  className="input-value"
                  type="number"
                  step={1}
                  value={selectedStudent?.id}
                  onChange={(e) =>
                    setSelectedStudent({
                      ...selectedStudent,
                      id: +e.target.value,
                    })
                  }
                />

                <div style={{ display: "flex" }}>
                  {isLoading ? (
                    <CircularProgress />
                  ) : id ? null : (
                    <button
                      onClick={() => findStudent(selectedStudent.id)}
                      className="find-student"
                      style={{ marginLeft: "auto" }}
                    >
                      Find student
                    </button>
                  )}
                </div>
              </>
            )}

            <p className="box-title">Class name</p>
            <p className="input-value">{selectedStudent?.className}</p>
            <p className="box-title">Class code</p>
            <p className="input-value">{selectedStudent?.classCode}</p>

            <form
              onSubmit={async (e) => {
                e.preventDefault();

                if (!selectedStudent.isAvailable) {
                  showErrorAlertModal("Non selected student");
                  return;
                }

                const formData = new FormData(e.target);

                const reqObj = {
                  studentId: selectedStudent?.id,
                  moduleId: +formData.get("module"),
                  reason: formData.get("reason") ?? "",
                  startDate: formData.get("from") ?? "",
                  endDate: formData.get("to") ?? "",
                  note: "No note",
                };

                if (!validateAddReservation(reqObj)) {
                  showErrorAlertModal("Your input values have problems");
                  return;
                }

                AddReservation(reqObj)
                  .then(() => {
                    showSuccessModal("Add reservation successfully");
                    handleClose();
                  })
                  .catch(() => {
                    showErrorAlertModal();
                  });
              }}
            >
              <label htmlFor="module">
                <p className="box-title">Select module</p>
                <select
                  disabled={modules.length == 0}
                  className="input-value"
                  name="module"
                >
                  {modules.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.moduleName}
                    </option>
                  ))}
                </select>
              </label>

              <label htmlFor="reason">
                <p className="box-title">Reserving reason</p>
                <input
                  className="input-value input-user"
                  type="text"
                  id="reason"
                  name="reason"
                  placeholder="Input reason"
                />
              </label>

              <label>
                <p className="box-title">Period</p>
                <input
                  className="input-value input-user input-date"
                  type="date"
                  id="from"
                  name="from"
                />{" "}
                -{" "}
                <input
                  className="input-value input-user input-date"
                  type="date"
                  id="to"
                  name="to"
                />
              </label>

              <span className="divider"></span>

              <p className="box-title">Reserving conditions</p>
              {conditions.map((c, i) => (
                <label key={i} className="checkbox-container">
                  <input type="checkbox" name="condition" value={c} />{" "}
                  <span className="checkbox-title">{c}</span>
                </label>
              ))}

              <FormControlLabel
                name="activate"
                sx={{ marginTop: "8px" }}
                control={<Switch defaultChecked />}
                label="Activate reserving"
              />

              <DialogActions>
                <Button
                  style={{ color: "#E74A3B", textDecoration: "underline" }}
                  onClick={handleClose}
                  color="secondary"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  style={{
                    background: "#2D3748",
                    color: "#fff",
                    padding: "4px 1rem",
                  }}
                  color="primary"
                >
                  Create
                </Button>
              </DialogActions>
            </form>
          </DialogContent>
        </div>
      </Dialog>
    </>
  );
}
